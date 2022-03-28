import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import CheckMail from 'app/views/sessions/CheckMail'
import VerifyUser from 'app/views/sessions/VerifyUser'
import ChangePassword from 'app/views/sessions/ChangePassword'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '/verify/:token',
            element: <VerifyUser />,
        },
        {
            path: '/check-email',
            element: <CheckMail />,
        }, 
        {
            path: '/reset-password/:resetpassword',
            element: <ChangePassword />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
