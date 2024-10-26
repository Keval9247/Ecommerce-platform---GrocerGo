import React from 'react'
import AdminlayoutHeader from './AdminlayoutHeader'
import AdminlayoutFooter from './AdminlayoutFooter'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <>
            <div className='min-h-screen flex flex-col bg-gray-400'>
                <AdminlayoutHeader />
                <div className='flex-grow'>
                    <Outlet />
                </div>
                <AdminlayoutFooter />
            </div>
        </>
    )
}

export default AdminLayout
