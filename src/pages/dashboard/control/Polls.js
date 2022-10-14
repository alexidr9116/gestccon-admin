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
import Register from '../../../sections/control/Polls/Register';
import Search from '../../../sections/control/Polls/Search';
import Status from '../../../sections/control/Polls/Status';
// sections


// ----------------------------------------------------------------------

export default function Polls() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Polls and Surveys">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Polls and Surveys"
                    links={[
                        { name: 'Control' },
                        { name: 'Polls and Serveys' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />                    
                    <Tab label="To search for" mx={1} value={1} />
                    <Tab label="Status" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                    {selectedTab === 2 &&
                         <Status />
                    }
                </Box>
            </Container>
        </Page>
    );
}
