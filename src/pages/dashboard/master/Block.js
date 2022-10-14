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

// sections


// ----------------------------------------------------------------------

export default function BlockSetting() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Block Setting | Master Panel">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Block setting"
                    links={[
                        { name: 'Master Panel' },
                        { name: 'Block' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="register" mx={1} value={0} />
                    <Tab label="To serach for" mx={1} value={1} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <RegisterIPBlock />
                    }
                    {selectedTab === 1 &&
                        <SearchBlockFor />
                    }
                </Box>
            </Container>
        </Page>
    );
}
