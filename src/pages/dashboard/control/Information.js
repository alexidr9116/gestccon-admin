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
import Register from '../../../sections/control/Information/Register';
import Search from '../../../sections/control/Information/Search';
import Setting from '../../../sections/control/Information/Setting';
import Type from '../../../sections/control/Information/Type';
// sections


// ----------------------------------------------------------------------

export default function Information() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Condomium information">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Condomium information"
                    links={[
                        { name: 'Control' },
                        { name: 'Condomium information' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="To search for" mx={1} value={1} />
                    <Tab label="Setting" mx={1} value={2} />
                    <Tab label="Type" mx={1} value={3} />
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
                         <Type />
                    }
                </Box>
            </Container>
        </Page>
    );
}
