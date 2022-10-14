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
import RegisterIPBlock from '../../../sections/block/Register';
import SearchBlockFor from '../../../sections/block/SearchBlockFor';
import Authorization from '../../../sections/control/VisitorAuth/Authorization';

// sections


// ----------------------------------------------------------------------

export default function VisitorAuth() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Visitor Authorization">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Visitor Authorization"
                    links={[
                        { name: 'Control' },
                        { name: 'Visitor Authorization' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Authorization" mx={1} value={0} />
                    <Tab label="Registerations" mx={1} value={1} />
                    

                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Authorization />
                    }
                    {selectedTab === 1 &&
                         <Authorization />
                    }
                </Box>
            </Container>
        </Page>
    );
}
