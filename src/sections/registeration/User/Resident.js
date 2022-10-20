import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, TableContainer, Table, TableBody, TableRow, TableCell, MenuItem, IconButton, Avatar, Skeleton, CardContent, CardHeader } from '@mui/material';
// routes
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';
import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../components/table';
import { HOST_API } from '../../../config';
// routes

import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// components
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar, RHFEditor } from '../../../components/hook-form';
import ResidentTableRow from './list/ResidentTableRow';
import CategoryDialog from './dialog/CategoryDialog';
import EmailDialog from './dialog/EmailDialog';
import TelephoneDialog from './dialog/TelephoneDialog';
import AddressDialog from './dialog/AddressDialog';
import VehicleDialog from './dialog/VehicleDialog';
import BicycleDialog from './dialog/BicycleDialog';

// ----------------------------------------------------------------------



const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'apart', label: 'Apartment', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];
// ----------------------------------------------------------------------

export default function Resident() {
    const [mode, setMode] = useState('view');
    const [filter, setFilter] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [openTelephoneDialog, setOpenTelephoneDialog] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [openVehicleDialog, setOpenVehicleDialog] = useState(false);
    const [openBicycleDialog, setOpenBicycleDialog] = useState(false);
    const [openDocumentDialog, setOpenDocumentDialog] = useState(false);

    const [residents, setResidents] = useState([]);
    const [aparts, setAparts] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [filterBlocks, setFilterBlocks] = useState([]);
    const [userCategories, setUserCategories] = useState([]);
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
        cell: Yup.string().required('Cell field is required'),
        block: Yup.string().required('Block field is required'),
        apart: Yup.string().required('Apartment field is required'),
        category: Yup.string().required('Category field is required'),
    });

    const defaultValues = useMemo(() => ({
        name: selectedUser?.name || '',
        email: selectedUser?.email || '',
        password: '',
        image: `${HOST_API}${selectedUser?.avatar || 'uploads/images/avatar.png'}`,
        cell: selectedUser?.cell || '',
        block: selectedUser?.apartment?.blockId || 0,
        apart: selectedUser?.apartment?.id || 0,
        category: selectedUser?.category || '',
        mayReceiveMessage: `${selectedUser?.mayReceiveMessage}` || 'true',
        mayReservation: `${selectedUser?.mayReservation}` || 'true',
        observation:selectedUser?.observation || '',
        status: `${selectedUser?.status}` || '1',
    }), [selectedUser]);

    const methods = useForm({
        resolver: yupResolver(RegisterForm),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const block = watch('block');

    const onSubmit = async (data) => {
        try {
            const iData = new FormData();

            if (typeof data.image === 'string') {
                axios.post('/api/admin/user/set-resident-without-image', { ...data, id: (mode === 'edit' ? (selectedUser?.id || 0) : 0) }).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar(res.data?.message);
                        setSelectedUser(null)
                        setMode('view')
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => enqueueSnackbar("Internal server error", { variant: 'error' }))
            }
            if (typeof data.image === 'object') {
                iData.append("name", data.name);
                iData.append("email", data.email);
                iData.append("image", data.image);
                iData.append("password", data.password);
                iData.append("cell", data.cell);
                iData.append("category", data.category);
                iData.append("block", data.block);
                iData.append("apart", data.apart);
                iData.append("mayReceiveMessage", data.mayReceiveMessage);
                iData.append("mayReservation", data.mayReservation);
                // iData.append("observation", data.observation);
                iData.append("status", data.status);
                iData.append("id", (mode === 'edit' ? (selectedUser?.id || 0) : 0));
                axios.post('/api/admin/user/set-resident-with-image', iData).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar(res.data?.message);
                        setSelectedUser(null)
                        setMode('view')
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => { enqueueSnackbar("Internal server error", { variant: 'error' }); })
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'image',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );
    const onDeleteRow = (user) => {

    }
    const onSelectRow = (user) => {
        setSelectedUser(user);
        setMode('edit')
    }
    useEffect(() => {

        reset(defaultValues)
    }, [selectedUser, defaultValues, reset])

    const onCloseCategoryDialog = (categories) => {
        setOpenCategoryDialog(false);
        setUserCategories(categories);
    }
    const {
        page,
        order,
        orderBy,
        rowsPerPage,
        //
        selected,
        //
        onSort,

    } = useTable();

    useEffect(() => {
        const loadBlocks = async () => {
            axios.get('/api/resident/condominium/get-blocks').then(res => {
                if (res.status === 200) {
                    setBlocks(res.data.data.blocks);
                }
            }).catch(err => {

            })
        }
        const loadAparts = async () => {
            axios.get('/api/resident/condominium/get-aparts').then(res => {
                if (res.status === 200) {
                    setAparts(res.data.data.aparts);
                }
            }).catch(err => {

            })
        }
        const loadResidents = async () => {
            const response = await axios.get('/api/admin/user/get-residents', {});

            if (response.status === 200 && response.data.data && response.data.data.residents) {
                setResidents(response.data.data.residents);
            }
            setLoading(false)
        }
        const loadCategories = async () => {
            const response = await axios.get('/api/admin/user/get-category');
            if (response.status === 200 && response.data.data) {
                setUserCategories(response.data.data.categories);
            }

        }
        if (mode === 'view') {
            setLoading(true)
            loadCategories();
            loadResidents();
            loadBlocks();
            loadAparts();

        }

    }, [mode])
    useEffect(() => {
        setFilterBlocks(aparts.filter((apart) => `${apart.blockId}` === `${block}`))
    }, [block, aparts]);

    const onCategory = () => {
        setOpenCategoryDialog(true)
    }
    return (
        <>

            {mode === 'view' &&
                <Card>
                    <CardContent>
                        <Stack marginBottom={2} paddingX={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} spacing={1} gap={1}>
                            <TextField label="Keywords" onChange={(e) => setFilter(e.target.value)} value={filter} />
                            <Button variant='outlined' onClick={() => { setSelectedUser(null); setMode('new'); }}>New Resident</Button>
                        </Stack>
                        <Scrollbar>
                            {loading &&
                                <>
                                    {
                                        [1, 2, 3, 4, 5].map((index) => (
                                            <Skeleton animation="wave" height={40} key={index} />
                                        ))
                                    }

                                </>

                            }
                            {!loading &&

                                <TableContainer sx={{ width: '100%', minWidth: '400px', position: 'relative' }}>
                                    <Table >
                                        <TableHeadCustom
                                            order={order}
                                            orderBy={orderBy}
                                            headLabel={TABLE_HEAD}
                                            rowCount={residents?.length}
                                            numSelected={selected.length}
                                            onSort={onSort}
                                        // onSelectAllRows={(checked) =>
                                        //     onSelectAllRows(
                                        //         checked,
                                        //         roles.map((row) => row.id)
                                        //     )
                                        // }
                                        />

                                        <TableBody>
                                            {(residents.filter((user) => (user.name.includes(filter) || user.email.includes(filter) || user.category?.name?.includes(filter)))).map((user, index) => (
                                                <ResidentTableRow
                                                    index={index}
                                                    key={index}
                                                    row={user}
                                                    onEditRow={() => onSelectRow(user)}
                                                    onDeleteRow={() => onDeleteRow(user)}
                                                />
                                            ))}
                                            <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, residents.length)} />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Scrollbar>
                    </CardContent>
                </Card>
            }
            {mode !== 'view' &&
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} paddingTop={1}>
                        <Card>
                            <CardContent>
                                <Stack direction={'row'} gap={1} justifyContent="space-between" >

                                    <Typography variant='subtitle1'>Resident information</Typography>
                                    <IconButton onClick={() => setMode('view')}>
                                        <Iconify icon="eva:arrow-back-outline" />
                                    </IconButton>
                                </Stack>
                                <Typography variant='subtitle2'>Here you will define information about the user.</Typography>
                                <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>

                                    <RHFUploadAvatar name="image" onDrop={handleDrop}
                                        helperText={
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    mt: 2,
                                                    mx: 'auto',
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                            </Typography>
                                        } />
                                    <Stack sx={{ flexShrink: 1, justifyContent: 'space-between', py: 2 }}>
                                        <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                            <RHFTextField name="name" label="Name" />
                                            <RHFTextField name="email" label="Email" />
                                        </Stack>
                                        <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                            <RHFTextField name="password" label="Password" />
                                            <RHFTextField name="cell" label="Cell" />
                                        </Stack>
                                    </Stack>

                                </Stack>

                                <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                                    <RHFSelect name="block" label="Block" sx={{ mb: 2 }}>
                                        <option value={0}>Select Block</option>
                                        {blocks.map((block, index) => (
                                            <option key={block.id} value={block.id}>
                                                {block.name}
                                            </option>

                                        ))}
                                    </RHFSelect>
                                    <RHFSelect name="apart" label="Apartment" sx={{ mb: 2 }}>
                                        {filterBlocks.map((apart, index) => (
                                            <option key={index} value={apart.id}>
                                                {apart.name}
                                            </option>

                                        ))}
                                    </RHFSelect>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack gap={2}>
                                    <Typography variant='subtitle1'>User settings and permissions</Typography>
                                    <Stack direction="row" gap={2}>
                                        <RHFSelect name="category" label="Category">
                                            <optgroup label="System">
                                                {userCategories?.filter((c) => c.type === 'System').map((c, index) => (
                                                    <option value={c.name} key={index}>{c.name}</option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="Customize">
                                                {userCategories?.filter((c) => c.type === 'Customize').map((c, index) => (
                                                    <option value={c.name} key={index}>{c.name}</option>
                                                ))}
                                            </optgroup>
                                        </RHFSelect>

                                        <Button onClick={onCategory} variant={'outlined'}>Manage</Button>
                                    </Stack>

                                    {/* <RHFSelect name="roleId" label="Category" sx={{ mb: 2 }}>
                                {["ROLES"].map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>

                                ))}
                            </RHFSelect> */}
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant='subtitle1'>Will you receive messages?</Typography>
                                            <RHFToggleGroup
                                                name='mayReceiveMessage'
                                                options={[
                                                    { value: 'true', label: 'Yes' },
                                                    { value: 'false', label: 'No' },

                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant='subtitle1'>Can you make reservations?</Typography>
                                            <RHFToggleGroup
                                                name='mayReservation'
                                                options={[
                                                    { value: 'true', label: 'Yes' },
                                                    { value: 'false', label: 'No' },
                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant='subtitle1'>Status</Typography>
                                            <RHFToggleGroup
                                                name='status'
                                                options={[
                                                    { value: '1', label: 'Active' },
                                                    { value: '0', label: 'InActive' },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>

                                </Stack>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader title="Optional registration (possible to edit mode)" subheader="Select the additional data you want to assign to the resident." />
                            <CardContent>
                                <Typography variant='subtitle1'>Observation</Typography>
                                <RHFEditor name={'observation'} simple />
                                <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                                    <Button disabled={selectedUser === null} variant="outlined" onClick={() => setOpenEmailDialog(true)}>Email</Button>
                                    <Button disabled={selectedUser === null} variant="outlined" onClick={() => setOpenTelephoneDialog(true)}>Telephone</Button>
                                    <Button onClick={() => setOpenAddressDialog(true)} disabled={selectedUser === null} variant="outlined">Address</Button>
                                    <Button onClick={() => setOpenVehicleDialog(true)} disabled={selectedUser === null} variant="outlined">Vehicle</Button >
                                    <Button onClick={() => setOpenBicycleDialog(true)} variant="outlined" disabled={selectedUser === null} >Bicycle</Button>
                                    <Button disabled={selectedUser === null} variant="outlined">Document</Button>
                                    <Button disabled={selectedUser === null} variant="outlined">Medical Certificate</Button>
                                    <Button disabled={selectedUser === null} variant="outlined">Observation</Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Box>
                            <LoadingButton variant="contained" type={'submit'} loading={isSubmitting} size="large">
                                {selectedUser !== null ? 'Update' : 'Register'}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </FormProvider >
            }

            <CategoryDialog onClose={onCloseCategoryDialog} open={openCategoryDialog} />
            <EmailDialog onClose={() => { setOpenEmailDialog(false) }} open={openEmailDialog} user={selectedUser?.id} />
            <TelephoneDialog onClose={() => { setOpenTelephoneDialog(false) }} open={openTelephoneDialog} user={selectedUser?.id} />
            <AddressDialog onClose={() => { setOpenAddressDialog(false) }} open={openAddressDialog} user={selectedUser?.id} />
            <VehicleDialog onClose={() => { setOpenVehicleDialog(false) }} open={openVehicleDialog} user={selectedUser?.id} />
            <BicycleDialog onClose={() => { setOpenBicycleDialog(false) }} open={openBicycleDialog} user={selectedUser?.id} />
        </>

    );
}
