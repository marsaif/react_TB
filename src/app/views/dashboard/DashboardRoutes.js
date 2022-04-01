import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AppEchart from '../cards/echarts/AppEchart'
import Profile from '../sessions/profile/Profile'


const Analytics = Loadable(lazy(() => import('./Analytics')))
const Users = Loadable(lazy(() => import('./shared/Users')))
const Apointments = Loadable(lazy(() => import('./shared/Apointments')))
const MedicalRecordForm = Loadable(lazy(() => import('./shared/MedicalRecordForm')))
const PatientsHistoryRecord = Loadable(lazy(() => import('./shared/PatientsHistoryRecord')))
const MedicalRecordDetail = Loadable(lazy(() => import('./shared/MedicalRecordDetail')))

const dashboardRoutes = [
    {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.doctor,
    },
    {
        path: '/users',
        element: <Users />,
        auth: authRoles.admin,

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
    ,
    {
        path: '/patientsHistoryRecord',
        element: <PatientsHistoryRecord />,
    },
    {
        path: '/medicalRecordDetails/:idrecord',
        element: <MedicalRecordDetail />,
    }
    ,
    {
        path: '/profile',
        element: <Profile />,
    }
 
]
export default dashboardRoutes
