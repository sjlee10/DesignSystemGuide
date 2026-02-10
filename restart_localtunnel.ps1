$processes = Get-WmiObject -Query "SELECT * FROM Win32_Process WHERE Name='node.exe' AND CommandLine LIKE '%localtunnel%'"
if ($processes) {
    foreach ($proc in $processes) {
        Stop-Process -Id $proc.ProcessId -Force -ErrorAction SilentlyContinue
    }
}

$wd = "\\wsl.localhost\Ubuntu\home\sjlee10\DesignSystemGuide"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pushd ""$wd"" && npx -y localtunnel --port 5174 --subdomain sjlee-design" -WindowStyle Normal
