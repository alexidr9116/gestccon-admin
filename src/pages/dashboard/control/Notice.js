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
import Register from '../../../sections/control/Notice/Register';
import Search from '../../../sections/control/Notice/Search';
// sections


// ----------------------------------------------------------------------

export default function Notice() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Home Portal Notice">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Home Portal Notice"
                    links={[
                        { name: 'Control' },
                        { name: 'Home Portal Notice' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Search" mx={1} value={1} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                </Box>
            </Container>
        </Page>
    );
}
