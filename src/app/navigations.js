export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        name: 'Users',
        path: '/users',
        icon: 'person',
    },
    {
        name: 'Chat',
        path: '/chat',
        icon: 'chat',
    },
    {
        name: 'Static',
        path: '/stat',
        icon: 'trending_up',
    },
    {
        name: 'Apointments',
        path: '/apointments',
        icon: 'person',
    },
    {
        name: 'Medical Record',
        path: '/medicalrecord/:idpatient',
        icon: 'person',
    },
    {
        label: 'Auth',
        type: 'label',
    },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    }
]
