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
import Administrator from '../../../sections/registeration/User/Administrator';
import Resident from '../../../sections/registeration/User/Resident';
import Search from '../../../sections/registeration/User/Search';

// sections


// ----------------------------------------------------------------------

export default function User() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Registeration | User">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="User"
                    links={[
                        { name: 'Registeration' },
                        { name: 'User' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Administrator" mx={1} value={0} />
                    <Tab label="Resident" mx={1} value={1} />
                    <Tab label="To Search for" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Administrator />
                    }
                    {selectedTab === 1 &&
                        <Resident />
                    }
                    {selectedTab === 2 &&
                        <Search />
                    }
                </Box>
            </Container>
        </Page>
    );
}
