import { Box, Button, Card, CardContent, CardHeader, Dialog, Menu, Skeleton, Stack, Table, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import PropType from 'prop-types';

import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";

import Scrollbar from '../../../../components/Scrollbar';
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar, RHFUploadImage } from '../../../../components/hook-form';
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
import BicycleTableRow from "../list/BicycleTableRow";




BicycleDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'location', label: 'Location', align: 'left' },
    { id: 'image', label: 'Image', align: 'left' },
    { id: '' },
];

export default function BicycleDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        location: Yup.string().required('Location field is required'),

    });

    const defaultValues = useMemo(() => ({
        name: current?.name || '',
        location: current?.location || '',
        image: current?.image || '',
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
        if (typeof data.image === 'string')
            axios.post('/api/admin/user/set-bicycle-without-image', { ...data, user, id: (current?.id || 0) }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar(res?.data?.message);
                    setCurrent(null)
                    load();
                }
            }).catch(err => {

            })
        else if(typeof data.image === 'object'){
            const iData = new FormData();
            iData.append('name',data.name);
            iData.append('location',data.location);
            iData.append('image',data.image);
            iData.append('user',user);
            iData.append('id', (current?.id || 0))
            axios.post('/api/admin/user/set-bicycle-with-image', iData).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar(res?.data?.message);
                    setCurrent(null)
                    load();
                }
            }).catch(err => {

            })
        }
    }
    const onEditRow = async (row) => {
        setCurrent(row);

    }
    const onDeleteRow = async (row) => {
        axios.delete(`/api/admin/user/delete-bicycle/${(row?.id || 0)}`,).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                setCurrent(null)
                load();
            }
        }).catch(err => {
        })
    }
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
    const load = async () => {
        setLoading(true)
        axios.get(`/api/admin/user/get-bicycles/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setData(res.data.data.bicycles);
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

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader title={' Optional Bicycles'} />
                    <CardContent>
                        <Stack marginBottom={2} paddingX={1} justifyContent={'space-between'} spacing={1} gap={1} flexDirection={{ xs: 'column', sm: 'row' }}>
                            <Stack>
                                <RHFUploadImage sx={{ width: 180, height: 140 }} name="image" onDrop={handleDrop}
                                    helperText={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                my: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            Choose image.
                                        </Typography>
                                    } />
                            </Stack>
                            <Stack gap={2} sx={{ flexGrow: 1 }}>
                                <RHFTextField name={'name'} label="Name" />
                                <RHFTextField name={'location'} label="Location" />
                            </Stack>
                        </Stack>

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                            Registered Bicycles
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
                                    <Table size="small">
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
                                                <BicycleTableRow
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