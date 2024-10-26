import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../Roles/roles'

function Home2() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated)
    const role = useSelector((state) => state.authReducer.role)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*')
        }
        else if (role !== ROLES.USER) {
            navigate('/')
        }
        return navigate('/user/home2')
    }, [isAuthenticated, role])

    return (
        <div>
            Home 2
        </div>
    )
}

export default Home2
