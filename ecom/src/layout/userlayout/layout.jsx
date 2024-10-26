import React from 'react'
import UserlayoutHeader from './UserlayoutHeader'
import UserlayoutFooter from './UserlayoutFooter'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <>
            <div className='min-h-screen flex flex-col bg-gray-400'>
                <UserlayoutHeader />
                <div className='flex-grow'>
                    <Outlet />
                </div>
                <UserlayoutFooter />
            </div>
        </>
    )
}

export default UserLayout
