import { Box, Button, Card, CardContent, CardHeader, Dialog, Menu, Skeleton, Stack, Table, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import PropType from 'prop-types';

import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Scrollbar from '../../../../components/Scrollbar';
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar, RHFUploadImage, RHFUploadDocFile } from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import axios from '../../../../utils/axios';
import { TableEmptyRows, TableHeadCustom, TableMoreMenu, TableNoData, TableSelectedActions } from '../../../../components/table';
import { HOST_API } from '../../../../config';
// routes
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';

import BicycleTableRow from "../list/BicycleTableRow";
import MedicalCertRow from "../list/MedicalCertRow";


MedicalCertDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'endDate', label: 'Final Date', align: 'left' },
    { id: 'type', label: 'Type', align: 'left' },
    { id: 'file', label: 'Attached', align: 'left' },
    { id: '' },
];

export default function MedicalCertDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [categories,setCategories] = useState([]);
    const RegisterForm = Yup.object().shape({
        endDate: Yup.string().required('Final Date field is required'),
        type: Yup.string().required('Type field is required'),

    });

    const defaultValues = useMemo(() => ({
        endDate: current?.name || new Date(),
        type: current?.location || '',
        file: current?.file || '',
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
        control,
        setValue,
        watch,
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;
    const color = watch('color');
    const onSubmit = async (data) => {
        if (typeof data.image === 'string')
            axios.post('/api/admin/user/set-medical-cert-without-image', { ...data, user, id: (current?.id || 0) }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar(res?.data?.message);
                    setCurrent(null)
                    load();
                }
            }).catch(err => {

            })
        else if (typeof data.image === 'object') {
            const iData = new FormData();
            iData.append('endDate', data.endDate);
            iData.append('type', data.type);
            iData.append('file', data.file);
            iData.append('user', user);
            iData.append('id', (current?.id || 0))
            axios.post('/api/admin/user/set-medical-cert-with-image', iData).then(res => {
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
        axios.delete(`/api/admin/user/delete-medical-cert/${(row?.id || 0)}`,).then(res => {
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
                    'file',
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
        const res = await axios.post('/api/admin/condominium/get-categories',{category:'medical'});
        if(res.status === 200 && res.data.data?.categories){
            setCategories(res.data.data?.categories);
        }
        axios.get(`/api/admin/user/get-medical-certs/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setData(res.data.data.certs);
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
                    <CardHeader title={' Optional Medical Certifications'} />
                    <CardContent>
                        <Stack marginBottom={2} paddingX={1} justifyContent={'space-between'} spacing={1} gap={1} flexDirection={{ xs: 'column', sm: 'row' }}>
                            <Stack>
                                <RHFUploadDocFile icon={'emojione-v1:document'} sx={{ width: 180, height: 140 }} name="file" onDrop={handleDrop}
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
                                            Choose document.
                                        </Typography>
                                    } />
                            </Stack>
                            <Stack gap={2} sx={{ flexGrow: 1 }}>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field }) => (
                                        <MobileDatePicker
                                            {...field}
                                            label="Final Date"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}
                                />
                                <RHFSelect name={'type'} label="Category" >
                                    <optgroup label ="System">
                                        {
                                            categories.filter((ct)=>ct.type==='System').map((ct, index)=>(
                                                <option key = {index} value = {ct.name}>{ct.name}</option>
                                            ))
                                        }
                                    </optgroup>
                                    <optgroup label ="Customize">
                                        {
                                            categories.filter((ct)=>ct.type==='Customize').map((ct, index)=>(
                                                <option key = {index} value = {ct.name}>{ct.name}</option>
                                            ))
                                        }
                                    </optgroup>
                                </RHFSelect>
                            </Stack>
                        </Stack>

                        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                            Registered Certs
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
                                                <MedicalCertRow
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
                            <Button onClick={onClose} variant="outlined" >Close</Button>
                            <LoadingButton variant="contained" type="submit" >Save</LoadingButton>
                        </Stack>
                    </CardContent>
                </Card>
            </FormProvider>
        </Dialog>
    )
}