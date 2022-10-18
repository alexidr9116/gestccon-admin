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
import TelephoneTableRow from "../list/TelephoneTableRow";




TelephoneDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
    { id: 'cell', label: 'Cell', align: 'left' },
    { id: '' },
];

export default function TelephoneDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const RegisterForm = Yup.object().shape({
        phoneNumber: Yup.string().required('Phonenumber field is required'),
        cell: Yup.string().required('Cell field is required'),
    });

    const defaultValues = useMemo(() => ({
        phoneNumber: current?.phoneNumber || '',
        cell: current?.cell || '',
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
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = async (data) => {
        axios.post('/api/admin/user/set-telephone', { ...data, user, id: (current?.id || 0) }).then(res => {
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
        axios.delete(`/api/admin/user/delete-telephone/${(row?.id || 0)}`,).then(res => {
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
        axios.get(`/api/admin/user/get-telephone/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setData(res.data.data.telephones);
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
                    <CardHeader title={'Registered Numbers'} />
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
                                    <Table >
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
                                                <TelephoneTableRow
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
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Optional Telephones
                        </Typography>
                        <Stack marginBottom={2}   paddingX={1} justifyContent={'space-between'} spacing={1} gap={1}>
                            <RHFTextField name={'phoneNumber'} label="Telephone" />
                            <RHFTextField name={'cell'} label="Cell" />
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