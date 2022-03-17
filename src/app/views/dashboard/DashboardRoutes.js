import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AppEchart from '../cards/echarts/AppEchart'
import Chat from './shared/Chat'


const Analytics = Loadable(lazy(() => import('./Analytics')))
const Users = Loadable(lazy(() => import('./shared/Users')))
const Apointments = Loadable(lazy(() => import('./shared/Apointments')))

const dashboardRoutes = [
    {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin,
    },
    {
        path: '/chat',
        element: <Chat />,
        auth: authRoles.admin,
    },
    {
        path: '/users',
        element: <Users />,
    },
    {
        path: '/stat',
        element: <AppEchart />,
    },
    {
        path: '/apointments',
        element: <Apointments />,
    }
]

export default dashboardRoutes
