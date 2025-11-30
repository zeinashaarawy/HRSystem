# PowerShell Path Guide - Handling Paths with Spaces

## ❌ The Problem

When your path contains **spaces**, PowerShell treats each word as a separate argument:

```powershell
# ❌ WRONG - This will FAIL
cd E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend

# Error: A positional parameter cannot be found that accepts argument '2025\Software'
```

**Why?** PowerShell sees:
- `E:\College\COURSES\Winter` (first argument)
- `2025\Software` (second argument - ERROR!)
- `Project` (third argument)
- etc.

---

## ✅ The Solution

### Option 1: Use Quotes (Recommended)
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

### Option 2: Use Relative Path (If already in parent directory)
```powershell
# If you're in: E:\College\COURSES\Winter 2025\Software Project I\swp1
cd HRSystem\backend
```

### Option 3: Use Tab Completion
```powershell
# Type: cd HRSystem\ and press TAB
# PowerShell will auto-complete and handle spaces correctly
cd HRSystem\
```

---

## Quick Reference

### From Root Directory (`swp1`)
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

### From Anywhere (Using Full Path)
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

### From Parent Directory
```powershell
# If in: E:\College\COURSES\Winter 2025\Software Project I\swp1
cd HRSystem\backend
```

---

## Common Mistakes

### ❌ Wrong
```powershell
cd E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend
```

### ✅ Correct
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

---

## Pro Tips

1. **Always quote paths with spaces** - It's the safest approach
2. **Use relative paths when possible** - Shorter and less error-prone
3. **Use Tab completion** - PowerShell handles spaces automatically
4. **Check your current directory** - Use `Get-Location` or `pwd`

---

## Verify You're in the Right Place

After navigating, always verify:
```powershell
# Check current directory
Get-Location
# or
pwd

# Check if package.json exists
Test-Path package.json
# Should return: True
```

---

## Summary

**Rule of Thumb**: If your path has spaces, **put it in quotes!**

```powershell
cd "path with spaces"
```

**Current correct path:**
```powershell
cd "E:\College\COURSES\Winter 2025\Software Project I\swp1\HRSystem\backend"
```

Then you can run:
```powershell
npm start
```

