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
import Edit from '../../../sections/registration/Condominium/Edit';

// sections


// ----------------------------------------------------------------------

export default function Condominium() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Registeration | Condominium">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Condominium"
                    links={[
                        { name: 'Registeration' },
                        { name: 'Condominium' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="To Edit" mx={1} value={0} />

                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Edit />
                    }
                </Box>
            </Container>
        </Page>
    );
}
