import React from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import Logout from '../../pages/Logout';
import { ROLES } from '../../Roles/roles';

function AdminlayoutHeader() {
    // const authStatus = useSelector((state) => state.authReducer.isAuthenticated);
    const role = useSelector((state) => state.authReducer.role);
    const location = useLocation();

    const navItems = [
        {
            name: 'Home',
            slug: '/admin/',
        },
        {
            name: 'Products',
            slug: '/admin/products',
        },
        {
            name: 'Solutions',
            slug: '/admin/solution',
        },
    ];

    const drawerItems = navItems.filter(item => item.name);

    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: 'rgba(28, 36, 46, 0.9)' }}>

                <Toolbar>
                    <Button onClick={toggleDrawer} sx={{ color: 'white' }}>
                        <ListSharpIcon />
                    </Button>
                    <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                        Authentication
                    </Typography>

                    {navItems.map((item) =>
                        item.name && (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.slug}
                                sx={{
                                    textDecoration: 'none',
                                    margin: '0 1rem',
                                    color: item.slug === location.pathname ? '#ffffff' : 'black',
                                    backgroundColor: 'rgb(146, 169, 187)',
                                    '&:hover': {
                                        color: '#ffffff',
                                        backgroundColor: 'rgb(140, 169, 187)',
                                    },
                                }}
                            >
                                {item.name}
                            </Button>
                        )
                    )}
                    {/* {authStatus && ( */}
                    <Logout />
                    {/* // )} */}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
                <List>
                    {drawerItems.map((item) => (
                        <ListItem
                            button
                            key={item.name}
                            component={Link}
                            to={item.slug}
                            onClick={toggleDrawer}
                            sx={{
                                padding: '1rem',
                                margin: '1rem 4rem',
                                width: '100%',
                                color: item.slug === location.pathname ? '#ffffff' : 'black',
                                textDecoration: 'none',
                                backgroundColor: item.slug === location.pathname ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                            }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default AdminlayoutHeader;
