import React from 'react'
import LineChart from './LineChart'
import AreaChart from './AreaChart'
import { useTheme, Box, styled } from '@mui/system'
import DoughnutChart from './Doughnut'
import ComparisonChart from './ComparisonChart'
import SimpleCard from 'app/components/cards/SimpleCard'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AppEchart = () => {
    const theme = useTheme()
    return (
        <Container>

            <SimpleCard title="Roles Chart">
                <DoughnutChart
                    height="350px"
                    color={[
                        theme.palette.error.main,                        
                        theme.palette.info.dark,
                        theme.palette.success.main
                    ]}
                />
            </SimpleCard>
            <Box sx={{ py: '12px' }} />
            <SimpleCard title="Apointment Chart">
                <LineChart
                    height="350px"
                    color={[
                        theme.palette.primary.main,
                        theme.palette.error.main    
                    ]}
                />
            </SimpleCard>
            <Box sx={{ py: '12px' }} />
            <SimpleCard title="Premium Users Chart">
                <ComparisonChart
                    height="350px"
                    color={[
                        theme.palette.primary.dark,
                        // theme.palette.primary.main,
                        theme.palette.primary.light,
                    ]}
                />
            </SimpleCard>

        </Container>
    )
}

export default AppEchart
