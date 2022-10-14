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
import Attachment from '../../../sections/control/Guest/Attachment';
import Search from '../../../sections/control/Guest/Search';
// sections


// ----------------------------------------------------------------------

export default function Guest() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Guest List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Guest List"
                    links={[
                        { name: 'Control' },
                        { name: 'Guest List' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Search" mx={1} value={0} />
                    <Tab label="Attachment" mx={1} value={1} />                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Search />
                    }
                    {selectedTab === 1 &&
                         <Attachment />
                    }
                </Box>
            </Container>
        </Page>
    );
}
