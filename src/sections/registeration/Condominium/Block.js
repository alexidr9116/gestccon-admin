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

import Scrollbar from '../../../components/Scrollbar';
import axios from '../../../utils/axios';

import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../components/table';
import Iconify from '../../../components/Iconify';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'blockName', label: 'Block Name', align: 'left' },
    { id: 'apartName', label: 'Apart Name', align: 'left' },
    { id: '' },
];

export default function Block() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [openMenu, setOpenMenuActions] = useState(null);
    const [selectedApart, setSelectedApart] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [aparts, setAparts] = useState([]);
    const [isApart, setIsApart] = useState(true);
    const [loading, setLoading] = useState(true);
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
        blockName: Yup.string().required('Name field is required'),

    });

    const defaultValues = useMemo(() => ({
        blockName: selectedApart?.block?.name || '',
        apartName: selectedApart?.name || '',

    }), [selectedApart]);

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
            if (isApart && data.apartName === '')
                return;
            const response = await axios.put('/api/admin/condominium/set-block-or-apart', { ...data, id: selectedApart?.id || '0', blockId, isApart });
            if (response.status === 200 && response.data.data && response.data.data.role) {
                enqueueSnackbar(response.data?.message);
            }
            load();
            reset();
        } catch (error) {
            console.error(error);
        }
    };
    const onEditRow = (apart) => {
        setSelectedApart(apart);

    }
    useEffect(() => {
        reset(defaultValues);
    }, [selectedApart, reset, defaultValues])
    const [blockId, setBlockId] = useState(null);

    useEffect(() => {

        const b = blocks.filter((block) => block.name === values.blockName);
        if (b.length > 0) {
            setBlockId(b[0].id);
        }
        else
            setBlockId(null)
    }, [values.blockName, blocks]);
    const onDeleteRow = async (apart) => {
        try {
            const response = await axios.delete(`/api/admin/condominium/delete-apart/${apart.id}`, {});
            if (response.status === 200) {
                enqueueSnackbar(response.data?.message);

            }
            load();
            reset();
        } catch (error) {
            console.error(error);
        }
    }
    const load = () => {
        setLoading(true)
        axios.get('/api/resident/condominium/get-blocks').then(res => {
            if (res.status === 200) {
                setBlocks(res.data.data.blocks);
            }
        }).catch(err => {

        })
        axios.get('/api/resident/condominium/get-aparts').then(res => {
            if (res.status === 200) {
                setAparts(res.data.data.aparts);
            }
        }).catch(err => {

        }).finally(() => setLoading(false))
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
                        <Stack direction={'row'} gap={1}>
                            <RHFTextField name="blockName" label="Block name" />
                            <Button variant='contained' type='submit' onClick={() => setIsApart(false)}>Save</Button>
                            <Button variant='outlined' onClick={() => setIsApart(false)} disabled={blockId === null}>Delete</Button>
                        </Stack>

                        <RHFTextField name="apartName" label="Apartment name" disabled={blockId === null} />
                    </Stack>
                    <Box >
                        <Button variant='outlined' size="large" onClick={() => { setSelectedApart(null); }} sx={{ mr: 1 }}>
                            Reset
                        </Button>
                        <LoadingButton variant="contained" disabled={blockId === null} size="large" loading={isSubmitting} type="submit" onClick={() => setIsApart(true)}>
                            {(selectedApart === null ? 'Register' : 'Update')}
                        </LoadingButton>
                    </Box>
                </Stack>
                <Stack spacing={3}>
                    <Typography variant='subtitle1'>Registered Block & Apartments</Typography>
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
                                        {(aparts).map((apart, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {apart?.block?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {apart?.name}
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
                                                                        onDeleteRow(apart);
                                                                        handleCloseMenu();
                                                                    }}
                                                                    sx={{ color: 'error.main' }}
                                                                >
                                                                    <Iconify icon={'eva:trash-2-outline'} />
                                                                    Delete
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        onEditRow(apart);
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
