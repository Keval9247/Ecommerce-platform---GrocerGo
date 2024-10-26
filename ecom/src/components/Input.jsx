import { TextField } from '@mui/material'
import React, { forwardRef } from 'react'

const Input = forwardRef(({
    label,
    type,
    value,
    variant = 'standard',
    ...props
}, ref) => {
    return <TextField
        label={label}
        type={type}
        value={value}
        variant={variant}
        {...props}
        inputRef={ref}
    />
})
export default Input