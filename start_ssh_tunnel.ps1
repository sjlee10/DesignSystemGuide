$wd = "\\wsl.localhost\Ubuntu\home\sjlee10\DesignSystemGuide"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k wsl -d Ubuntu ssh -R 80:localhost:5174 -o StrictHostKeyChecking=no localhost.run" -WorkingDirectory "$wd" -WindowStyle Normal
