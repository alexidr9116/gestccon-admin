import * as Yup from 'yup';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, TableContainer, Table, TableBody, TableRow, TableCell, MenuItem, IconButton, Avatar, InputAdornment, Skeleton, CardContent } from '@mui/material';
// routes
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';
import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../components/table';
import { HOST_API } from '../../../config';
// routes

import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// components
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar } from '../../../components/hook-form';
import EnvironmentTableRow from './list/EnvironmentTableRow';

// ----------------------------------------------------------------------


const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'cost', label: 'Cost', align: 'left' },
    { id: 'capacity', label: 'Capacity', align: 'left' },
    { id: 'pr', label: 'Reversation', align: 'left' },
    { id: 'state', label: 'State', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function Register() {
    const navigate = useNavigate();
    const [selectedEnvironment, setSelectedEnvironment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [environments, setEnvironments] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [mode, setMode] = useState('view');
    const [filter, setFilter] = useState('');
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        cost: Yup.number().required('Cost field is required'),
        capacity: Yup.number().required('Capacity field is required'),
    });

    const defaultValues = useMemo(() => ({
        name: selectedEnvironment?.name || "",
        cost: selectedEnvironment?.cost || 0,

        image: `${HOST_API}${selectedEnvironment?.image || ''}`,
        perRevervation: selectedEnvironment?.perRevervation || "0",
        showAll: selectedEnvironment?.showAll || '0',
        state: selectedEnvironment?.state || 'confirmed',
        status: `${selectedEnvironment?.status}` || '1',
        capacity: selectedEnvironment?.capacity || 10,
    }), [selectedEnvironment]);

    const methods = useForm({
        resolver: yupResolver(RegisterForm),
        defaultValues,
    });
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
    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();
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
    const onSubmit = async (data) => {
        try {
            const iData = new FormData();

            if (typeof data.image === 'string') {
                axios.post('/api/admin/environment/set-environment-without-image', { ...data, id: (selectedEnvironment === null ? (0) : selectedEnvironment?.id) }).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar(res.data?.message);
                        reset(defaultValues)
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => enqueueSnackbar(err?.message || "Internal server error", { variant: 'error' }))
            }
            if (typeof data.image === 'object') {
                iData.append("name", data.name);
                iData.append("cost", data.cost);

                iData.append("image", data.image);
                iData.append("perRevervation", data.perRevervation);
                iData.append("showAll", data.showAll);
                iData.append("capacity", data.capacity);
                iData.append("state", data.state);
                iData.append("status", data.status);

                iData.append("id", (selectedEnvironment === null ? (0) : selectedEnvironment?.id));
                axios.post('/api/admin/environment/set-environment-with-image', iData).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar(res.data?.message);

                        reset(defaultValues)
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => { enqueueSnackbar(err?.message || "Internal server error", { variant: 'error' }); })
            }

        } catch (error) {
            console.error(error);
        }
    };

    const onSelectRow = (environment) => {
        setSelectedEnvironment(environment)
        setMode('edit')
    }
    const onDeleteRow = (row) => {

    };
    useEffect(() => {
        if (selectedEnvironment)
            reset(defaultValues)
    }, [selectedEnvironment, defaultValues, reset])
    useEffect(() => {
        if (mode === 'view') {
            setLoading(true)
            axios.get('/api/admin/environment/get-all').then(res => {
                if (res.status === 200) {
                    setEnvironments(res.data?.data?.environments)
                }

            }).catch(err => {

            }).finally(() => {
                setLoading(false)
            })
        }

    }, [mode])
    return (
        <>
            {mode === 'view' &&
                <>
                    <Stack marginBottom={2} paddingX={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} spacing={1} gap={1}>
                        <TextField label="Keywords" onChange={(e) => setFilter(e.target.value)} value={filter} />
                        <Button variant='outlined' onClick={() => { setSelectedEnvironment(null); setMode('new'); reset(defaultValues); }}>New Environment</Button>
                    </Stack>
                    <Card>
                        <CardContent>
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
                                        <Table size="small">
                                            <TableHeadCustom
                                                order={order}
                                                orderBy={orderBy}
                                                headLabel={TABLE_HEAD}
                                                rowCount={environments?.length}
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
                                                {environments.filter((environment) => (environment.name.includes(filter))).map((environment, index) => (
                                                    <EnvironmentTableRow
                                                        index={index}
                                                        key={index}
                                                        row={environment}
                                                        onEditRow={() => onSelectRow(environment)}
                                                        onDeleteRow={() => onDeleteRow(environment)}

                                                    />

                                                ))}
                                                <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, environments.length)} />
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </Scrollbar>
                        </CardContent>
                    </Card>

                </>
            }
            {mode !== 'view' &&
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} paddingTop={1}>
                        <Card>
                            <CardContent>
                                <Stack direction={'row'} gap={1} justifyContent="space-between" >

                                    <Typography variant='subtitle1'>Environment information</Typography>
                                    <IconButton onClick={() => setMode('view')}>
                                        <Iconify icon="eva:arrow-back-outline" />
                                    </IconButton>
                                </Stack>
                                <Typography sx={{ mb: 2 }} variant='subtitle2'>Here you will define the information about the environment</Typography>
                                <Stack gap={1} paddingBottom={1}>
                                    <RHFTextField name="name" label="Name" />
                                    <RHFUploadSingleFile name="image" onDrop={handleDrop} />
                                    <Stack direction={{ xs: 'column', sm: 'row' }} marginTop={1} gap={1}>
                                        <RHFTextField name="cost" label="Booking cost" type="number" InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                                        <RHFTextField name="capacity" label="Capacity of client" type="number" InputProps={{ startAdornment: <InputAdornment position="start">P</InputAdornment> }} />
                                    </Stack>

                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack gap={1}>
                                    <Typography variant='subtitle1' sx={{mb:2}}>Environment setting</Typography>
                                    <Stack direction='row' flexWrap={'wrap'} gap={2}>
                                        <Stack>
                                            <Typography variant='subtitle2'>Duration of servations</Typography>
                                            <RHFToggleGroup
                                                name="perRevervation"
                                                options={[
                                                    { value: '0', label: 'Per hour' },
                                                    { value: '1', label: 'Per Day' },
                                                ]}
                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Will it appear for everyone?</Typography>
                                            <RHFToggleGroup
                                                name="showAll"
                                                options={[
                                                    { value: '0', label: 'Yes' },
                                                    { value: '1', label: 'No' },
                                                    { value: '2', label: 'Admins only' },
                                                ]}
                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Environment status</Typography>
                                            <RHFToggleGroup
                                                name="status"
                                                options={[
                                                    { value: '1', label: 'Active' },
                                                    { value: '0', label: 'Inactive' },
                                                ]}
                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Status pattern</Typography>
                                            <RHFToggleGroup
                                                name="state"
                                                options={[
                                                    // { value: '1st on hold', label: '1st on hold' },
                                                    { value: 'confirmed', label: 'Confirmed' },
                                                    // { value: 'expired', label: 'Expired' },
                                                    { value: 'already charged', label: 'Already Charged' },
                                                    { value: 'prebooking', label: 'Prebooking' },
                                                ]}
                                            />
                                        </Stack>
                                    </Stack>



                                </Stack>

                            </CardContent>
                        </Card>

                        <Box>
                            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => {
                                setSelectedEnvironment(null);
                                reset(defaultValues);
                            }}>
                                Reset
                            </Button>
                            <LoadingButton loading={isSubmitting} variant="contained" type='submit' >
                                {selectedEnvironment !== null ? 'Update' : 'Register'}
                            </LoadingButton>

                        </Box>
                    </Stack>
                </FormProvider>
            }
        </>

    );
}
