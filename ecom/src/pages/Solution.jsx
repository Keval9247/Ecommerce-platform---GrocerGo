import React, { useEffect } from 'react'
import { ButtonC } from '../components'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';

function Solution() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*')
            return
        }
        else if (role !== ROLES.ADMIN) {
            navigate('/')
        }
        return navigate('/admin/solution')
    }, [isAuthenticated, role])

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/admin/')
    }

    return (
        <div>
            This is the solution page
            <h1>Welcome to Solution page</h1>
            <ButtonC
                variant='contained'
                color='primary'
                onClick={handleBack}
            >
                Back to Home
            </ButtonC>
        </div>
    )
}

export default Solution
