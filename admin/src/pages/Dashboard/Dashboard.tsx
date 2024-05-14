import { Outlet } from 'react-router-dom';
import React from 'react';

function Dashboard() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default Dashboard