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
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, TableContainer, Table, TableBody, TableRow, TableCell, MenuItem, Skeleton } from '@mui/material';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';

import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../components/table';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'title', label: 'Description', align: 'left' },
    { id: '' },
];

export default function Register() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [openMenu, setOpenMenuActions] = useState(null);
    const [loading,setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };
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

    const { enqueueSnackbar } = useSnackbar();

    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        title: Yup.string().required('Description field is required'),

    });

    const defaultValues = useMemo(() => ({
        name: selectedRole?.name || '',
        title: selectedRole?.title || '',
    }), [selectedRole]);

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
            const response = await axios.put('/api/admin/role/set-role', {...data, id:selectedRole?.id||'0'});
            if (response.status === 200 && response.data.data && response.data.data.role) {
                enqueueSnackbar(response.data?.message);
            }
            load();
            reset();

        } catch (error) {
            console.error(error);
        }
    };
    const onEditRow = (role) => {
        setSelectedRole(role);

    }
    useEffect(() => {

        reset(defaultValues);

    }, [selectedRole, reset, defaultValues])
    const onDeleteRow = async (role) => {
        try {
            const response = await axios.delete(`/api/admin/role/delete-role/${role.id}`, {});
            if (response.status === 200 && response.data.data) {
                enqueueSnackbar(response.data?.message);
            }
            load();
            reset();
        } catch (error) {
            console.error(error);
        }
    }
    const load = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/admin/role/get-roles', {});

            if (response.status === 200 && response.data.data && response.data.data.roles) {
                setRoles(response.data.data.roles);
            }
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        load();
    }, [])
    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} paddingTop={1} marginBottom={4}>
                    <Typography variant='subtitle1'>Registeration Information</Typography>
                    <Typography variant='subtitle2'>Here you will define the information about the registration.</Typography>
                    <Stack gap={2}>
                        <RHFTextField name="name" label="Name" />
                        <RHFTextField name="title" label="Description" />
                    </Stack>
                    <Box >
                        <Button variant='outlined'  onClick={() => setSelectedRole(null)} sx={{ mr: 1 }}>
                            Reset
                        </Button>
                        <LoadingButton variant="contained"  loading={isSubmitting} type="submit">
                            {(selectedRole === null ? 'Register' : 'Update')}
                        </LoadingButton>
                    </Box>
                </Stack>
                <Stack spacing={3}>
                    <Typography variant='subtitle1'>Registered Roles</Typography>
                    <Scrollbar>
                    {loading &&
                            <>
                                {
                                    [1, 2, 3, 4, 5].map((index) => (
                                        <Skeleton animation="wave" height={40} key ={index}/>
                                    ))
                                }

                            </>

                        }
                        {!loading &&

                        <TableContainer sx={{ maxWidth: 800, position: 'relative' }}>
                            <Table >
                                <TableHeadCustom

                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={roles?.length}
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
                                    {(roles).map((role, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {role.name}
                                            </TableCell>
                                            <TableCell>
                                                {role.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                <TableMoreMenu
                                                    open={openMenu}
                                                    onOpen={handleOpenMenu}
                                                    onClose={handleCloseMenu}
                                                    actions={
                                                        <>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    onDeleteRow(role);
                                                                    handleCloseMenu();
                                                                }}
                                                                sx={{ color: 'error.main' }}
                                                            >
                                                                <Iconify icon={'eva:trash-2-outline'} />
                                                                Delete
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    onEditRow(role);
                                                                    handleCloseMenu();
                                                                }}
                                                            >
                                                                <Iconify icon={'eva:edit-fill'} />
                                                                Edit
                                                            </MenuItem>
                                                        </>
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>

                                    ))}

                                    <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, roles.length)} />

                                </TableBody>
                            </Table>
                        </TableContainer>
}
                    </Scrollbar>

                </Stack>
            </FormProvider>

        </>
    );
}
