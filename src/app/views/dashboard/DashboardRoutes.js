import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
import AppEchart from '../cards/echarts/AppEchart'
import Chat from './shared/Chat'
import VideoChat from './shared/VideoChat'
import Profile from '../sessions/profile/Profile'
import AppointmentForm from './shared/AppointmentForm'
import Video from './shared/Video'

const Analytics = Loadable(lazy(() => import('./Analytics')))
const Users = Loadable(lazy(() => import('./shared/Users')))
const Apointments = Loadable(lazy(() => import('./shared/Apointments')))
const ListeReclamations = Loadable(
    lazy(() => import('./shared/ListeReclamations'))
)
const ListeReclamationsPatient = Loadable(
    lazy(() => import('./shared/PatientReclamations'))
)

const AddReclamation = Loadable(lazy(() => import('./shared/AddReclamation')))
const Symptoms = Loadable(lazy(() => import('./shared/Symptoms')))

const MedicalRecordForm = Loadable(
    lazy(() => import('./shared/MedicalRecordForm'))
)
const PatientsHistoryRecord = Loadable(
    lazy(() => import('./shared/PatientsHistoryRecord'))
)
const MedicalRecordDetail = Loadable(
    lazy(() => import('./shared/MedicalRecordDetail'))
)

const dashboardRoutes = [
    {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.allUser,
    },
    {
        path: '/chat',
        element: <Chat />,
        auth: authRoles.patient_doctor,
    },
    {
        path: '/video-chat/:partnerId/:myId',
        element: <VideoChat />,
        auth: authRoles.patient_doctor,
    },
    {
        path: '/accept-video/:partnerId/:myId',
        element: <Video />,
        auth: authRoles.patient_doctor,
    },
    {
        path: '/symptoms',
        element: <Symptoms />,
        auth: authRoles.patient_doctor,
    },
    {
        path: '/users',
        element: <Users />,
        auth: authRoles.admin,
    },
    {
        path: '/ListeReclamations',
        element: <ListeReclamations />,
        auth: authRoles.admin,
    },
    {
        path: '/ListeReclamationsPatient',
        element: <ListeReclamationsPatient />,
        auth: authRoles.patient,
    },
    {
        path: '/AddReclamation',
        element: <AddReclamation />,
        auth: authRoles.patient,
    },
    {
        path: '/stat',
        element: <AppEchart />,
    },
    {
        path: '/apointments',
        element: <Apointments />,
    },
    {
        path: '/apointments/add',
        element: <AppointmentForm />,
    },
    {
        path: '/medicalrecord/:idpatient',
        element: <MedicalRecordForm />,
    },
    {
        path: '/patientsHistoryRecord',
        element: <PatientsHistoryRecord />,
    },
    {
        path: '/medicalRecordDetails/:idrecord',
        element: <MedicalRecordDetail />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
]
export default dashboardRoutes
