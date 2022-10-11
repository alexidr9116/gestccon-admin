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
import Register from '../../../sections/control/Medical/Register';
import Search from '../../../sections/control/Medical/Search';
import Type from '../../../sections/control/Medical/Type';
// sections


// ----------------------------------------------------------------------

export default function Medical() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Medical">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Medial Certificate"
                    links={[
                        { name: 'Control' },
                        { name: 'Medical Certificate' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Type" mx={1} value={1} />
                    <Tab label="To search for" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Type />
                    }
                    {selectedTab === 2 &&
                         <Search />
                    }
                </Box>
            </Container>
        </Page>
    );
}
