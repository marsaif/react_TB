import React, { Fragment } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { navigations } from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import useSettings from 'app/hooks/useSettings'
import { styled } from '@mui/system'
import axios from 'axios'
import {navAdmin} from 'app/navAdmin'
import {navDoctor} from 'app/navDoctor'
import {navPatient} from 'app/navPatient'


const StyledScrollBar = styled(Scrollbar)(() => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative',
}))

const SideNavMobile = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

const Sidenav = ({ children }) => {
    const { settings, updateSettings } = useSettings()
    const [user, setUser] = React.useState()


    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }
    React.useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get("http://localhost:3001/users/getUser");
        setUser(response.data.user)


    }

    return (
        <Fragment>
            <StyledScrollBar options={{ suppressScrollX: true }}>
                {children}
                
                {(user?.role === "ADMIN") ?
                    <MatxVerticalNav items={navAdmin} /> :
                    (user?.role === "DOCTOR") ?
                        <MatxVerticalNav items={navDoctor} /> :
                        (user?.role === "PATIENT") ?
                            <MatxVerticalNav items={navPatient} /> :
                            <MatxVerticalNav items={navigations} />}

            </StyledScrollBar>

            <SideNavMobile
                onClick={() => updateSidebarMode({ mode: 'close' })}
            />
        </Fragment>
    )
}

export default Sidenav
