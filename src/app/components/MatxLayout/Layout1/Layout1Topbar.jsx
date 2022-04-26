import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from '../../../components/Typography'
import { MatxMenu, MatxSearchBox } from 'app/components'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
} from '@mui/material'
import ReactHowler from 'react-howler'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { topBarHeight } from 'app/utils/constant'
import axios from 'axios'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}))

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))

const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'none !important',
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const { logout } = useAuth()
    const [user, setUser] = React.useState()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const socket = React.useRef()
    const [receivingCall, setReceivingCall] = React.useState(false)
    const [caller, setCaller] = React.useState('')
    const [partnerId, setpartnerId] = React.useState('')
    const [playing, setPlaying] = React.useState(false)
    const navigate = useNavigate()

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode
        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }
        updateSidebarMode({ mode })
    }

    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        const response = await axios.get('http://localhost:3001/users/getUser')
        response.data.user.image = `http://localhost:3001/${response.data.user.image}`
        setUser(response.data.user)
    }

    const playSound = () => {
        setPlaying(true)
    }

    const acceptCall = () => {
        setReceivingCall(false)
        navigate(`/accept-video/${partnerId}/${user._id}`)
    }
    React.useEffect(() => {
        getUser()
        socket.current = io.connect('http://localhost:3001')

        socket.current.on('hey', (data) => {
            if (user?._id === data.to) {
                playSound()
                setReceivingCall(true)
                setpartnerId(data.from)
                setCaller(data.name)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id])

    return (
        <TopbarRoot>
            {receivingCall ? (
                <div>
                    <ReactHowler
                        autoPlay
                        playing={playing}
                        src="https://assets.mixkit.co/sfx/download/mixkit-marimba-waiting-ringtone-1360.wav"
                    />
                    <h1>{caller} is calling you</h1>
                    <button onClick={acceptCall}>Accept</button>
                </div>
            ) : (
                ''
            )}
            <TopbarContainer>
                <Box display="flex">
                    <StyledIconButton onClick={handleSidebarToggle}>
                        <Icon>menu</Icon>
                    </StyledIconButton>

                    <IconBox>
                        <StyledIconButton>
                            <Icon>mail_outline</Icon>
                        </StyledIconButton>

                        <StyledIconButton>
                            <Icon>web_asset</Icon>
                        </StyledIconButton>
                    </IconBox>
                </Box>
                <Box display="flex" alignItems="center">
                    <MatxSearchBox />
                    <NotificationProvider>
                        <NotificationBar />
                    </NotificationProvider>

                    <ShoppingCart />

                    <MatxMenu
                        menuButton={
                            <UserMenu>
                                <Hidden xsDown>
                                    <Span>
                                        <strong>{user?.firstName}</strong>
                                    </Span>
                                </Hidden>
                                <Avatar
                                    src={user?.image}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </UserMenu>
                        }
                    >
                        <StyledItem>
                            <Link to="/">
                                <Icon> home </Icon>
                                <Span> Home </Span>
                            </Link>
                        </StyledItem>
                        <StyledItem>
                            <Link to="/profile">
                                <Icon> person </Icon>
                                <Span> Profile </Span>
                            </Link>
                        </StyledItem>
                        <StyledItem onClick={logout}>
                            <Icon> power_settings_new </Icon>
                            <Span> Logout </Span>
                        </StyledItem>
                    </MatxMenu>
                </Box>
            </TopbarContainer>
        </TopbarRoot>
    )
}

export default React.memo(Layout1Topbar)
