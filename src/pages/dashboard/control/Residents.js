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
import Register from '../../../sections/control/Residents/Register';
import Category from '../../../sections/control/Residents/Category';
import Search from '../../../sections/control/Residents/Search';
// sections


// ----------------------------------------------------------------------

export default function Residents() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Residents Classified">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Residents Classified"
                    links={[
                        { name: 'Control' },
                        { name: 'Residents Classfied' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Category" mx={1} value={1} />
                    <Tab label="To search for" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Category />
                    }
                    {selectedTab === 2 &&
                         <Search />
                    }
                </Box>
            </Container>
        </Page>
    );
}
