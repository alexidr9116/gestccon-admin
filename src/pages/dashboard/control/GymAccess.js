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
import Register from '../../../sections/control/GymAccess/Register';
import Search from '../../../sections/control/GymAccess/Search';
import Setting from '../../../sections/control/GymAccess/Setting';

// sections


// ----------------------------------------------------------------------

export default function GymAccess() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Gym Access">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Gym Access"
                    links={[
                        { name: 'Control' },
                        { name: 'Gym Access' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="To search for" mx={1} value={1} />
                    <Tab label="Settings" mx={1} value={2} />

                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                    {selectedTab === 2 &&
                         <Setting />
                    }
                </Box>
            </Container>
        </Page>
    );
}
