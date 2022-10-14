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
import Report from '../../../sections/control/MailQueue/Report';
import Summary from '../../../sections/control/MailQueue/Summary';
// sections


// ----------------------------------------------------------------------

export default function MailQueue() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Mail Queue">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Mail Queue"
                    links={[
                        { name: 'Control' },
                        { name: 'Mail Queue' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Report" mx={1} value={0} />
                    <Tab label="Summary" mx={1} value={1} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Report />
                    }
                    {selectedTab === 1 &&
                         <Summary />
                    }
                </Box>
            </Container>
        </Page>
    );
}
