import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Logout from '../../pages/Logout';
import homeIcon from '../../../icons/HomeIcon.jpeg';
import serviceIcon from '../../../icons/ServiceIcon.jpeg';
import authorityIcon from '../../../icons/AuthorityIcon.jpeg';

function UserlayoutHeader() {
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [open, setOpen] = useState(true)

    const navItems = [
        {
            name: 'Home',
            slug: '/user/',
        },
        {
            name: 'Products',
            slug: '/user/products-list',
        },
        {
            name: 'Services',
            slug: '/user/services',
        },
        {
            name: 'Authority',
            slug: '/user/authority',
        },
        {
            name: 'Cart',
            slug: '/user/cart',
            // component: <Logout />,
        }
    ];
    const sliderItems = [
        {
            name: 'Main',
            slug: '/user/',
            icon: homeIcon ? homeIcon : null,
            menu: [
                { name: 'Home 1', slug: '/user/home1' },
                { name: 'Home 2', slug: '/user/home2' },
                { name: 'Home 3', slug: '/user/home3' }
            ],
        },
        {
            name: 'About',
            slug: '/user/about',
            icon: authorityIcon,
        },
        {
            name: 'Contact',
            slug: '/user/contact',
            icon: serviceIcon,
        }
    ]


    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleMenuClick = (index) => {
        setActiveMenu(activeMenu === index ? null : index);
        setOpen(!open);
    };

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: 'rgba(87, 62, 62, 1)' }}>
                <Toolbar>
                    <Button onClick={toggleDrawer} sx={{ color: 'white' }}>
                        <ListSharpIcon />
                    </Button>
                    <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                        Authentication
                    </Typography>
                    {
                        navItems.map((item, index) => (
                            <div key={item.name}>
                                <Button
                                    // button
                                    to={item.slug}
                                    component={Link}
                                    sx={{
                                        textDecoration: 'none',
                                        margin: '1rem',
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
                            </div>
                        ))}
                    <Logout />
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
                <List>
                    {sliderItems.map((item, index) => (
                        <div key={item.name}>
                            <ListItem
                                button={true}
                                component={Link}
                                to={item.slug}
                                onClick={() => handleMenuClick(index)}
                                sx={{
                                    padding: '1rem',
                                    margin: '1rem 1rem',
                                    width: '100%',
                                    // color: item.slug === location.pathname ? '#ffffff' : 'black',
                                    // textDecoration: 'none',
                                    // backgroundColor: item.slug === location.pathname ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                                    width: '100%',
                                    color: item.slug === location.pathname ? '#ffffff' : 'black',
                                    textDecoration: 'none',
                                    backgroundColor: item.slug === location.pathname ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                                }}
                            >
                                <ListItemIcon>
                                    <img src={item.icon} alt={item.name} style={{ width: '3rem', height: '3rem', color: 'rgb(146, 169, 187)' }} />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                {item.menu && (
                                    activeMenu === index ? <ExpandLess /> : <ExpandMore />
                                )}
                            </ListItem>

                            {item.menu && activeMenu === index && (
                                <List sx={{
                                    margin: '0rem 0rem 0rem 2rem',
                                    gap: '1rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    {item.menu.map((submenuItem) => (
                                        < Button
                                            // button
                                            key={submenuItem.name}
                                            component={Link}
                                            to={submenuItem.slug}
                                            sx={{
                                                padding: '0.8rem',
                                                marginRight: '20px',
                                                width: '90%',
                                                color: submenuItem.slug === location.pathname ? '#ffffff' : 'black',
                                                textDecoration: 'none',
                                                backgroundColor: 'rgb(146, 169, 187)',
                                                borderRadius: '0.5rem',

                                                '&:hover': {
                                                    color: '#ffffff',
                                                    backgroundColor: 'rgb(140, 169, 187,0.8)',
                                                },
                                                // backgroundColor: submenuItem.slug === location.pathname ? 'rgba(0, 0, 0, 0.5)' : 'transparent',

                                            }}
                                        >
                                            <ListItemText primary={submenuItem.name} />
                                        </Button>
                                    ))}
                                </List>
                            )}
                        </div>
                    ))}
                </List>
            </Drawer >
        </>
    );
}

export default UserlayoutHeader;
