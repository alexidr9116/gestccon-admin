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
import Register from '../../../sections/control/Token/Register';
import Record from '../../../sections/control/Token/Record';
import Type from '../../../sections/control/Token/Type';
// sections


// ----------------------------------------------------------------------

export default function Token() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Token">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Token"
                    links={[
                        { name: 'Control' },
                        { name: 'Token' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Record" mx={1} value={1} />
                    <Tab label="Type" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Record />
                    }
                    {selectedTab === 2 &&
                         <Type />
                    }
                </Box>
            </Container>
        </Page>
    );
}
