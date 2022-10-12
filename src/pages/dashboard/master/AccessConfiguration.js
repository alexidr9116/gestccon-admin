import { useState } from 'react';
// @mui
import { Container, Tabs, Tab, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Register from '../../../sections/master/AccessConfiguration/Register';
import AccessProfile from '../../../sections/master/AccessConfiguration/AccessProfile';
import PortalAccess from '../../../sections/master/AccessConfiguration/PortalAccess';

// sections


// ----------------------------------------------------------------------

export default function AccessConfiguration() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Master | Access Configuration">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Access Configuration"
                    links={[
                        { name: 'Master' },
                        { name: 'Access Configuration' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Access Profile" mx={1} value={1} />
                    <Tab label="Portal Access" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                        <AccessProfile />
                    }
                    {selectedTab === 2 &&
                        <PortalAccess />
                    }
                </Box>
            </Container>
        </Page>
    );
}
