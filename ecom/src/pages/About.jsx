import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/index'
import { useSelector } from 'react-redux';
import { ROLES } from '../Roles/roles';

function About() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('*')
        } else if (role !== ROLES.ADMIN) {
            navigate('/')
        }
        return navigate('/user/about')
    }, [isAuthenticated, role])

    return (
        <>
            It is for about component
            <Link to={'/user'}>
                <Button>Home page</Button>
            </Link>
            <Input
                label="Name"
                type="text"
                // value="John Doe"
                variant="filled"
                fullWidth
            />
        </>
    )
}

export default About
