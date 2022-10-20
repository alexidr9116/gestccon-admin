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
import axios from '../../../../utils/axios';
import { TableEmptyRows, TableHeadCustom,} from '../../../../components/table';
// routes
import useTable, {  emptyRows } from '../../../../hooks/useTable';
import CategoryTableRow from "../list/CategoryTableRow";
import EmailTableRow from "../list/EmailTableRow";
import DocumentTableRow from "../list/DocumentTableRow";


DocumentDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    user: PropType.number
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'RG', label: 'Document ID', align: 'left' },
    { id: 'CPF', label: 'CPF', align: 'left' },
    { id: '' },
];

export default function DocumentDialog({ open, onClose, user }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const RegisterForm = Yup.object().shape({
        RG: Yup.string().required('Document ID is required'),
        CPF: Yup.string().required('CPF field is required'),
    });

    const defaultValues = useMemo(() => ({
        RG: current?.RG || '',
        CPF: current?.CPF || '',
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
        axios.post('/api/admin/user/set-document', { ...data, user, id: (current?.id || 0) }).then(res => {
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
        axios.delete(`/api/admin/user/delete-document/${(row?.id || 0)}`,).then(res => {
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
        axios.get(`/api/admin/user/get-documents/${user}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setData(res.data.data.documents);
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
                    <CardHeader title={'Registered Documents'} />
                    <CardContent>
                        
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
                                                <DocumentTableRow
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
                        <Typography variant="h6" sx={{ my: 2 }}>
                            Optional Documents
                        </Typography>
                        <Stack marginBottom={2}   paddingX={1} justifyContent={'space-between'} spacing={1} gap={1}>
                            <RHFTextField name={'RG'} label="Document ID" />
                            <RHFTextField name={'CPF'} label="CPF" />
                        </Stack>
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