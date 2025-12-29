"use client";

import { useState, useEffect } from "react";

export function useHRMode() {
    const [isHRManager, setIsHRManager] = useState(false);

    useEffect(() => {
        // Check for real authentication role from localStorage
        const role = localStorage.getItem("role");

        // Check against the SystemRole value 'HR Manager' seen in backend enum
        // Also include 'HR_MANAGER' just in case the backend sends the key instead
        if (role === 'HR Manager' || role === 'HR_MANAGER') {
            setIsHRManager(true);
        } else {
            setIsHRManager(false);
        }
    }, []);

    return { isHRManager };
}
