import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../Roles/roles'

function Home1() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && role !== ROLES.USER) {
            navigate('/')
        }
        else if (!isAuthenticated) {
            navigate('*')
        }
        if (location.pathname !== '/user/home1') {
            return navigate('/user/home1')
        }
    }, [isAuthenticated, role])

    return (
        <div>
            Home 1
        </div>
    )
}

export default Home1
