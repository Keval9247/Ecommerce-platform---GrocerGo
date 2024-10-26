import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../Roles/roles'
import { Typography } from '@mui/material'
import { ButtonC } from '../components'

function Contact() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*')
        } else if (role !== ROLES.USER) {
            navigate('/')
        }
        return navigate('/user/contact')
    }, [isAuthenticated, role])


    const handleBack = () => {
        navigate('/user/')
    }
    return (
        <div>
            <h1>Welcome to Contact page</h1>
            <Typography variant='h4'>
                This is the Contact page
            </Typography>
            <ButtonC
                onClick={handleBack}
                style={{
                    width: '13rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05rem',
                    textTransform: 'uppercase',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    backgroundColor: '#a1aba3'
                }}
            >
                Back to Home
            </ButtonC>
        </div>
    )
}

export default Contact
