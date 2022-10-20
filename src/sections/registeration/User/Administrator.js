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
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, TableContainer, Table, TableBody, TableRow, TableCell, MenuItem, IconButton, Avatar, Skeleton, CardHeader, CardContent } from '@mui/material';
// routes
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../components/table';
// components
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar } from '../../../components/hook-form';
import { HOST_API } from '../../../config';
import AdminTableRow from './list/AdminTableRow';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];
// ----------------------------------------------------------------------

export default function Administrator() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('view');
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [selectedUser, setSelectedUser] = useState(null);
    const [administrators, setAdministrators] = useState([]);
    const [openMenu, setOpenMenuActions] = useState(null);
    const [roles, setRoles] = useState([]);
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
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
        cell: Yup.string().required('Cell field is required'),
        roleId: Yup.string().required('Profile field is required'),
    });

    const defaultValues = useMemo(() => ({
        name: selectedUser?.name || '',
        email: selectedUser?.email || '',
        password: selectedUser?.password || '',
        cell: selectedUser?.cell || '',
        image: `${HOST_API}${selectedUser?.avatar || 'uploads/images/avatar.png'}`,
        roleId: selectedUser?.roleId,
        mayAccessSite: `${selectedUser?.mayAccessSite}` || 'true',
        releasePermission: `${selectedUser?.releasePermission}` || 'true',
        status: `${selectedUser?.status}` || '1'
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

    const values = watch();

    const onSubmit = async (data) => {

        try {
            const iData = new FormData();

            if (typeof data.image === 'string') {
                axios.post('/api/admin/user/set-admin-without-image', { ...data, id: (mode === 'edit' ? (selectedUser?.id || 0) : 0) }).then(res => {
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
                iData.append("roleId", data.roleId);
                iData.append("mayAccessSite", data.mayAccessSite);
                iData.append("releasePermission", data.releasePermission);
                iData.append("status", data.status);
                iData.append("id", (mode === 'edit' ? (selectedUser?.id || 0) : 0));
                axios.post('/api/admin/user/set-admin-with-image', iData).then(res => {
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
    useEffect(() => {
        const loadRole = async () => {
            const response = await axios.get('/api/admin/role/get-roles', {});

            if (response.status === 200 && response.data.data && response.data.data.roles) {
                setRoles(response.data.data.roles);
            }
        }
        const loadAdmins = async () => {
            const response = await axios.get('/api/admin/user/get-admins', {});

            if (response.status === 200 && response.data.data && response.data.data.administrators) {
                setAdministrators(response.data.data.administrators);
            }
            setLoading(false)
        }
        if (mode === 'view') {
            setLoading(true)
            loadRole();
            loadAdmins();
        }

    }, [mode])
    const onDeleteRow = (user) => {

    }
    const onEditRow = (user) => {
        setSelectedUser(user);
        setMode('edit')
    }
    useEffect(() => {
        if (selectedUser)
            reset(defaultValues)
    }, [selectedUser, defaultValues, reset])
    return (
        <>
            {mode === 'view' &&
                <>
                    <Card>
                        <CardContent>
                            <Stack marginBottom={2} paddingX={1} direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} spacing={1} gap={1}>
                                <TextField label="Keywords" onChange={(e) => setFilter(e.target.value)} value={filter} />
                                <Button variant='outlined' onClick={() => { setSelectedUser(null); setMode('new'); reset(defaultValues); }}>New Account</Button>
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
                                                rowCount={administrators?.length}
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
                                                {(administrators.filter((user) => (user.name.includes(filter) || user.email.includes(filter) || user.role?.name?.includes(filter)))).map((row, index) => (
                                                    <AdminTableRow key={index}
                                                        index={index}
                                                        row={row}
                                                        onDeleteRow={() => onDeleteRow(row)}
                                                        onEditRow={() => onEditRow(row)}
                                                    />
                                                ))}
                                                <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, administrators.length)} />
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

                                    <Typography variant='subtitle1'>Administrator information</Typography>
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

                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Stack gap={1}>
                                    <Typography variant='subtitle1'>User settings and permissions</Typography>
                                    <RHFSelect name="roleId" label="Profile" sx={{ mb: 2 }}>

                                        {roles.map((role, index) => (
                                            <option key={role?.id} value={role.id}>
                                                {role.name}
                                            </option>

                                        ))}
                                    </RHFSelect>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant='subtitle1'>May access web?</Typography>
                                            <RHFToggleGroup
                                                name='mayAccessSite'
                                                options={[
                                                    { value: 'true', label: 'Yes' },
                                                    { value: 'false', label: 'No' },

                                                ]}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant='subtitle1'>Release Permission</Typography>
                                            <RHFToggleGroup
                                                name='releasePermission'
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
                                                    { value: '0', label: 'Inactive' },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>

                                </Stack>
                            </CardContent>
                        </Card>


                        <Box>
                            <LoadingButton variant="contained" type={'submit'} loading={isSubmitting} >
                                {selectedUser !== null ? 'Update' : 'Register'}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </FormProvider >
            }
        </>

    );
}
