import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { ButtonC } from '../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROLES } from '../Roles/roles'

function Authority() {
    const navigate = useNavigate()
    // console.log(454);
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)

    useEffect(() => {
        // console.log('Authority component mounted')
        if (!isAuthenticated) {
            navigate('*')
        } else if (role !== ROLES.USER) {
            navigate('/')
        }
        return navigate('/user/authority')
    }, [isAuthenticated, role])

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/user/')
    }
    return (
        <div>
            <h1>Welcome to Authority page</h1>
            <Typography variant='h3'>
                This is the Authority page
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

export default Authority
