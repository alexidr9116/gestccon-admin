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
import Prohibited from '../../../sections/control/Warehouse/Prohibited';
import Search from '../../../sections/control/Warehouse/Search';
import Exit from '../../../sections/control/Warehouse/Exit';
import Inventory from '../../../sections/control/Warehouse/Inventory';
import Product from '../../../sections/control/Warehouse/Product';
// sections


// ----------------------------------------------------------------------

export default function Warehouse() {
    const { themeStretch } = useSettings();
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (evt, value) => {
        console.log(selectedTab)
        setSelectedTab(value)
    }
    return (
        <Page title="Controls | Warehouse">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Warehouse"
                    links={[
                        { name: 'Control' },
                        { name: 'Warehouse' },

                    ]}
                />
                <Tabs onChange={handleChange} value={selectedTab} allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"   sx={{ px: 2, bgcolor: 'background.neutral' }}>
                    <Tab label="Prohibited" mx={1} value={0} />
                    <Tab label="Exit" mx={1} value={1} />
                    <Tab label="Inventory" mx={1} value={2} />
                    <Tab label="Product" mx={1} value={3} />
                    <Tab label="To search for" mx={1} value={4} />
                </Tabs>

                <Box padding={2}>
                    {selectedTab === 0 &&
                        <Prohibited />
                    }
                    {selectedTab === 1 &&
                         <Exit />
                    }
                    {selectedTab === 2 &&
                         <Inventory />
                    }
                    {selectedTab === 3 &&
                         <Product />
                    }
                    {selectedTab === 4 &&
                         <Search />
                    }
                </Box>
            </Container>
        </Page>
    );
}
