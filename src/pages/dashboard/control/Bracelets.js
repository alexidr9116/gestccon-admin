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
import Register from '../../../sections/control/Bracelets/Register';
import Search from '../../../sections/control/Bracelets/Search';
import Type from '../../../sections/control/Bracelets/Type';
// sections


// ----------------------------------------------------------------------

export default function Bracelets() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Bracelets">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Bracelets"
                    links={[
                        { name: 'Control' },
                        { name: 'Bracelets' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Search" mx={1} value={1} />
                    <Tab label="Type" mx={1} value={2} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                    {selectedTab === 2 &&
                         <Type />
                    }
                </Box>
            </Container>
        </Page>
    );
}
