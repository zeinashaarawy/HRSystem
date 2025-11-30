# Payroll Execution Server - Development Mode Startup Script
# This script ensures you're in the correct directory and starts the server in dev mode

Write-Host "=== Payroll Execution Server (Development Mode) ===" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "HRSystem\backend"

# Check if we're already in the backend directory
$currentDir = Get-Location
if ($currentDir.Path -like "*HRSystem\backend*" -or $currentDir.Path -like "*HRSystem/backend*") {
    Write-Host "✅ Already in backend directory: $currentDir" -ForegroundColor Green
    $targetDir = $currentDir.Path
} else {
    # Navigate to backend directory
    if (Test-Path $backendDir) {
        Set-Location $backendDir
        Write-Host "✅ Navigated to: $backendDir" -ForegroundColor Green
        $targetDir = $backendDir
    } else {
        Write-Host "❌ ERROR: Backend directory not found at: $backendDir" -ForegroundColor Red
        Write-Host "Current directory: $currentDir" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: package.json not found in current directory!" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green
Write-Host ""

# Check if server is already running
$portCheck = netstat -ano | findstr ":3000"
if ($portCheck) {
    Write-Host "⚠️  WARNING: Server appears to be already running on port 3000" -ForegroundColor Yellow
    Write-Host "Do you want to start anyway? (This may cause port conflict)" -ForegroundColor Yellow
    $response = Read-Host "Continue? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "=== Starting Server (Development Mode) ===" -ForegroundColor Cyan
Write-Host "Server will start on: http://localhost:3000" -ForegroundColor White
Write-Host "Hot reload enabled - changes will auto-restart server" -ForegroundColor Gray
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the server in development mode
npm run start:dev

