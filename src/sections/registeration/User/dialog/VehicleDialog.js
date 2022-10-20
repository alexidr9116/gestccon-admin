import { Box, Button, Card, CardContent, CardHeader, Dialog, Menu, Skeleton, Stack, Table, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import PropType from 'prop-types';

import { useEffect, useMemo, useState } from "react";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import { SketchPicker } from 'react-color';

import Scrollbar from '../../../../components/Scrollbar';
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar } from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import axios from '../../../../utils/axios';
import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../../components/table';
import { HOST_API } from '../../../../config';
// routes
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
import CategoryTableRow from "../list/CategoryTableRow";
import EmailTableRow from "../list/EmailTableRow";
import TelephoneTableRow from "../list/TelephoneTableRow";
import VehicleTableRow from "../list/VehicleTableRow";




VehicleDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'board', label: 'Board', align: 'left' },
    { id: 'model', label: 'Model', align: 'left' },
    { id: 'color', label: 'Color', align: 'left' },
    { id: '' },
];

export default function VehicleDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [colorPicker, setColorPicker] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPicker = Boolean(anchorEl);

    const RegisterForm = Yup.object().shape({
        board: Yup.string().required('Board field is required'),
        model: Yup.string().required('Model field is required'),
        color: Yup.string().required('Color field is required'),

    });

    const defaultValues = useMemo(() => ({
        board: current?.board || '',
        model: current?.model || '',
        color: current?.color || '',
    }), [current]);

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
        setValue,
        watch,
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;
    const color = watch('color');
    const onSubmit = async (data) => {
        axios.post('/api/admin/user/set-vehicle', { ...data, user, id: (current?.id || 0) }).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                setCurrent(null)
                load();
            }
        }).catch(err => {

        })
    }
    const onEditRow = async (row) => {
        setCurrent(row);

    }
    const onDeleteRow = async (row) => {
        axios.delete(`/api/admin/user/delete-vehicle/${(row?.id || 0)}`,).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                setCurrent(null)
                load();
            }
        }).catch(err => {

        })
    }
    const load = async () => {
        setLoading(true)
        axios.get(`/api/admin/user/get-vehicle/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setData(res.data.data.vehicles);
            }
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        reset(defaultValues);

    }, [data, defaultValues, reset])
    useEffect(() => {
        if (open)
            load();
    }, [open]);
    const handleColorPicker = (color) => {
        setValue('color', color.hex);
    }
    const handleClosePicker = (color) => {
        setAnchorEl(null)

    }
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader title={' Optional Vehicle'} />
                    <CardContent>
                        <Stack marginBottom={2} paddingX={1} justifyContent={'space-between'} spacing={1} gap={1}>
                            <RHFTextField name={'board'} label="Board" />
                            <RHFTextField name={'model'} label="Model" />
                            <Stack direction='row' gap={1}>
                                <RHFTextField name={'color'} label="Color" disabled />
                                <Button variant="outlined" onClick={(e) => { setAnchorEl(e.target); setColorPicker(true) }}>Choose</Button>
                            </Stack>
                            <Menu anchorEl={anchorEl} open={openPicker} onClose={handleClosePicker}>
                                <Box sx={{ p: 2 }}>
                                    <SketchPicker color={color} onChange={handleColorPicker} />
                                </Box>

                            </Menu>

                        </Stack>

                        <Typography variant="h6" sx={{ mt: 4, mb:2 }}>
                            Registered Vehicles
                        </Typography>
                        <Scrollbar>
                            {loading &&
                                <>
                                    {
                                        [1, 2, 3].map((index) => (
                                            <Skeleton animation="wave" height={40} key={index} />
                                        ))
                                    }

                                </>

                            }
                            {!loading &&

                                <TableContainer sx={{ width: '100%', minWidth: '400px', position: 'relative' }}>
                                    <Table size= "small">
                                        <TableHeadCustom
                                            order={order}
                                            orderBy={orderBy}
                                            headLabel={TABLE_HEAD}
                                            rowCount={data?.length}
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
                                            {(data.map((ct, index) => (
                                                <VehicleTableRow
                                                    index={index}
                                                    key={index}
                                                    row={ct}
                                                    onEditRow={() => onEditRow(ct)}
                                                    onDeleteRow={() => onDeleteRow(ct)}
                                                />
                                            )))}
                                            <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, data.length)} />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Scrollbar>
                        <Stack sx={{ mt: 2, justifyContent: 'end' }} direction="row" gap={2} >
                            <Button onClick={onClose} variant="outlined" size="large">Close</Button>
                            <LoadingButton variant="contained" type="submit" size="large">Save</LoadingButton>
                        </Stack>
                    </CardContent>

                </Card>
            </FormProvider>
        </Dialog>
    )
}