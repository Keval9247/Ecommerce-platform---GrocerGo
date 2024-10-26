import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

function UserlayoutFooter() {
    return (
        <>
            <AppBar position="fixed" style={{
                top: 'auto', bottom: '10px',
                backgroundColor: 'rgba(87, 62, 62,0.9)',
                // color: 'whitesmoke',
            }}>
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                        © 2024 OlixLab.com
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: 20 }}>
                        All rights reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default UserlayoutFooter
