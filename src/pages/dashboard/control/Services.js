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
import Session from '../../../sections/control/Services/Session';
import Search from '../../../sections/control/Services/Search';
import Setting from '../../../sections/control/Services/Setting';
import RegisterService from '../../../sections/control/Services/RegisterService';
import SearchService from '../../../sections/control/Services/SearchService';
import Type from '../../../sections/control/Services/Type';
import Reader from '../../../sections/control/Services/Reader';
// sections


// ----------------------------------------------------------------------

export default function Services() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Other Services">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Services"
                    links={[
                        { name: 'Control' },
                        { name: 'Other Services' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Sessions" mx={1} value={0} />
                    <Tab label="Search" mx={1} value={1} />
                    <Tab label="Settings" mx={1} value={2} />
                    <Tab label="Register Services" mx={1} value={3} />
                    <Tab label="Search Services" mx={1} value={4} />
                    <Tab label="Type" mx={1} value={5} />
                    <Tab label="Reader" mx={1} value={6} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Session />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                    {selectedTab === 2 &&
                         <Setting />
                    }
                    {selectedTab === 3 &&
                         <RegisterService/>
                    }
                    {selectedTab === 4 &&
                         <SearchService />
                    }
                    {selectedTab === 5 &&
                         <Type />
                    }
                    {selectedTab === 6 &&
                         <Reader />
                    }
                </Box>
            </Container>
        </Page>
    );
}
