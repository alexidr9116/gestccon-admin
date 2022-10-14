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
import Register from '../../../sections/control/Change/Register';
import Search from '../../../sections/control/Change/Search';
import Time from '../../../sections/control/Change/Time';
import Block from '../../../sections/control/Change/Block';
import Setting from '../../../sections/control/Change/Setting';
// sections


// ----------------------------------------------------------------------

export default function Change() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
   
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Change">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Change"
                    links={[
                        { name: 'Control' },
                        { name: 'Change' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Register" mx={1} value={0} />
                    <Tab label="Search" mx={1} value={1} />
                    <Tab label="Time" mx={1} value={2} />
                    <Tab label="Block" mx={1} value={3} />
                    <Tab label="Settings" mx={1} value={4} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Register />
                    }
                    {selectedTab === 1 &&
                         <Search />
                    }
                    {selectedTab === 2 &&
                         <Time />
                    }
                    {selectedTab === 3 &&
                         <Block />
                    }
                    {selectedTab === 4 &&
                         <Setting />
                    }
                </Box>
            </Container>
        </Page>
    );
}
