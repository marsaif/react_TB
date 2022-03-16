import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AppEchart from '../cards/echarts/AppEchart'


const Analytics = Loadable(lazy(() => import('./Analytics')))
const Users = Loadable(lazy(() => import('./shared/Users')))
const Apointments = Loadable(lazy(() => import('./shared/Apointments')))
const MedicalRecordForm = Loadable(lazy(() => import('./shared/MedicalRecordForm')))


const dashboardRoutes = [
    {
        path: '/dashboard/default',
        element: <Analytics />,
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
    ,
    {
        path: '/medicalrecord/:idpatient',
        element: <MedicalRecordForm />,
    }
]

export default dashboardRoutes
