import { Button, Card, CardContent, CardHeader, Dialog, Skeleton, Stack, Table, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import PropType from 'prop-types';
import { useEffect, useMemo, useState } from "react";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
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




AddressDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'email', label: 'Email Address', align: 'left' },
    { id: '' },
];

export default function AddressDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const RegisterForm = Yup.object().shape({
        publicPlace: Yup.string().required('Public place field is required'),
        zip: Yup.string().required('Zip code field is required'),
        addressNumber: Yup.string().required('Number field is required'),
        neighbohood: Yup.string().required('Neighbohood field is required'),
        streetType: Yup.string().required('Street type field is required'),
        city: Yup.string().required('City field is required'),
        state: Yup.string().required('State field is required'),
    });

    const defaultValues = useMemo(() => ({
        publicPlace: address?.publicPlace || '',
        addressNumber: address?.addressNumber || '',
        neighbohood: address?.neighbohood || '',
        streetType: address?.streetType || '',
        city: address?.city || '',
        zip: address?.zip || '',
        state: address?.state || '',
    }), [address]);

    const methods = useForm({
        resolver: yupResolver(RegisterForm),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = async (data) => {
        axios.post('/api/admin/user/set-address', { ...data, user }).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                // load();
            }
        }).catch(err => {

        })
    }

    const onDeleteRow = async (row) => {
        axios.delete(`/api/admin/user/delete-address/${user}`,).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                // load();
            }
        }).catch(err => {

        })
    }
    const load = async () => {
        setLoading(true)
        axios.get(`/api/admin/user/get-address/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setAddress(res.data.data.address);
            }
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        reset(defaultValues);

    }, [defaultValues, reset, address])
    useEffect(() => {
        if (open)
            load();
    }, [open]);


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader title={'Optional Address'} />
                    <CardContent>
                        <Stack gap={2}>
                            <Stack gap={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                <RHFTextField name="zip" label="Zip code" />
                                <RHFTextField name="publicPlace" label="Public place" />
                                <RHFTextField name="addressNumber" label="Number" />
                            </Stack>
                            <Stack gap={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                <RHFTextField name="city" label="City" />
                                <RHFTextField name="state" label="State" />

                            </Stack>
                            <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                <RHFTextField name="neighbohood" label="Neighborhood" />
                                <RHFTextField name="streetType" label="Type of street" />
                            </Stack>
                        </Stack>
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