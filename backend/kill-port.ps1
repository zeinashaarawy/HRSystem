# PowerShell script to kill process using a specific port
param(
    [Parameter(Mandatory=$false)]
    [int]$Port = 3000
)

Write-Host "Checking for processes using port $Port..." -ForegroundColor Yellow

$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connections) {
    $processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    Write-Host "Found $($processIds.Count) process(es) using port $Port" -ForegroundColor Red
    
    foreach ($pid in $processIds) {
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "Killing process: $($process.ProcessName) (PID: $pid)" -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
    
    Start-Sleep -Seconds 2
    
    # Verify port is free
    $stillInUse = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($stillInUse) {
        Write-Host "⚠️  Port $Port is still in use!" -ForegroundColor Red
    } else {
        Write-Host "✅ Port $Port is now free!" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port $Port is already free!" -ForegroundColor Green
}

