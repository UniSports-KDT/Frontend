import React, { InputHTMLAttributes, forwardRef } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, ...props }, ref) => {
        return (
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    ref={ref}
                    {...props}
                    className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            </label>
        )
    }
)

Checkbox.displayName = 'Checkbox'