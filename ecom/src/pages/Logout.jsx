import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { logout as logoutaction } from '../store/slice/AuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'



function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutaction())
        toast.success('Logged out successfully!')
        navigate('/login')
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <Button sx={{
                backgroundColor: 'rgba(235, 64, 52)',
                color: 'whitesmoke',
                '&:hover': {
                    backgroundColor: 'rgba(235, 64, 52,0.8)',
                    color: 'white'
                }
            }}
                onClick={handleLogout}
            >Logout </Button>
        </>
    )
}

export default Logout
