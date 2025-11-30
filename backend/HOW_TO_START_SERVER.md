# How to Start the Payroll Execution Server

## ❌ Common Error

If you see this error:
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

**This means you're in the wrong directory!**

---

## ✅ Correct Way to Start the Server

### Option 1: Using PowerShell Scripts (Recommended)

#### For Production Mode:
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1"
.\HRSystem\backend\START_SERVER.ps1
```

#### For Development Mode (with hot reload):
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1"
.\HRSystem\backend\START_SERVER_DEV.ps1
```

### Option 2: Manual Navigation

#### Step 1: Navigate to the backend directory
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

#### Step 2: Verify you're in the right place
```powershell
# Check if package.json exists
Test-Path package.json
# Should return: True
```

#### Step 3: Start the server

**For Production:**
```powershell
npm start
```

**For Development (with hot reload):**
```powershell
npm run start:dev
```

---

## Directory Structure

```
swp1/
├── HRSystem/
│   └── backend/          ← YOU MUST BE HERE!
│       ├── package.json  ← This file must exist
│       ├── src/
│       ├── dist/
│       └── node_modules/
```

---

## Quick Reference

### Current Directory Check
```powershell
# Check current directory
Get-Location

# Should show something like:
# E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend
```

### Verify package.json Exists
```powershell
# From backend directory
Test-Path package.json
# Should return: True
```

### Check if Server is Running
```powershell
netstat -ano | findstr :3000
```

### Stop Running Server
```powershell
# Find the process ID
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

---

## Troubleshooting

### Error: "package.json not found"
**Solution**: Navigate to `HRSystem\backend` directory first

### Error: "Port 3000 already in use"
**Solution**: 
1. Stop the existing server
2. Or change the port in `src/main.ts`

### Error: "dist/main.js not found"
**Solution**: Run `npm run build` first, then `npm start`

### Error: "Module not found"
**Solution**: Run `npm install` to install dependencies

---

## Server URLs

Once started, the server will be available at:
- **Base URL**: `http://localhost:3000`
- **Payroll Execution API**: `http://localhost:3000/payroll-execution`
- **Root Endpoint**: `http://localhost:3000` (returns "Hello World!")

---

## Testing the Server

### Test Root Endpoint
```powershell
curl http://localhost:3000
```

### Test Payroll Execution Endpoint
```powershell
curl http://localhost:3000/payroll-execution/signing-bonuses/processed
```

---

## Summary

✅ **Always navigate to `HRSystem\backend` directory first**  
✅ **Use `npm start` for production mode**  
✅ **Use `npm run start:dev` for development mode**  
✅ **Verify `package.json` exists before running npm commands**

**Remember: The error occurs because you're running npm from the wrong directory!**

