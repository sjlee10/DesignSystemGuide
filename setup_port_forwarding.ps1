# Check for Administrator privileges
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "관리자 권한이 필요합니다. 관리자 권한으로 다시 실행해 주세요." -ForegroundColor Red
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Get WSL IP
$wsl_ip = (wsl -d Ubuntu hostname -I).Trim().Split(" ")[0]
Write-Host "WSL IP Address: $wsl_ip" -ForegroundColor Green

if (-not $wsl_ip) {
    Write-Host "WSL IP를 찾을 수 없습니다. WSL이 실행 중인지 확인하세요." -ForegroundColor Red
    exit
}

# Port to forward
$port = 5174

# Add PortProxy
Write-Host "포트 $port 포워딩 설정 중..."
netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wsl_ip

# Add Firewall Rule
Write-Host "방화벽 규칙 추가 중..."
Remove-NetFirewallRule -DisplayName "WSL 5174 Port" -ErrorAction SilentlyContinue
New-NetFirewallRule -DisplayName "WSL 5174 Port" -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow

Write-Host "설정 완료! 이제 아래 주소로 접속 가능합니다:" -ForegroundColor Green
$my_ip = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Ethernet*).IPAddress
Write-Host "http://$($my_ip):$port" -ForegroundColor Cyan
Pause
