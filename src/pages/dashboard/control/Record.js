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
import Register from '../../../sections/control/Record/Register';
import Search from '../../../sections/control/Record/Search';
import Setting from '../../../sections/control/Record/Setting';
import Service from '../../../sections/control/Record/Service';
// sections


// ----------------------------------------------------------------------

export default function Record() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Occurrence Record">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Occurrence Record"
                    links={[
                        { name: 'Control' },
                        { name: 'Occurrence Record' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Search" mx={1} value={1} />
                    <Tab label="Setting" mx={1} value={2} />
                    <Tab label="Service" mx={1} value={3} />
                    
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
                    {selectedTab === 3 &&
                         <Service />
                    }
                </Box>
            </Container>
        </Page>
    );
}
