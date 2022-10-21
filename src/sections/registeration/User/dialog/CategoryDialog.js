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




CategoryDialog.propTypes = {
    open: PropType.bool,
    onClose: PropType.func,
    category: PropType.string
}
const TABLE_HEAD = [
    { id: 'no', label: 'No', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'type', label: 'type', align: 'left' },
    { id: '' },
];

export default function CategoryDialog({ open, onClose, category }) {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        type: Yup.string().required('Type field is required'),

    });

    const defaultValues = useMemo(() => ({
        category: selectedCategory?.category || category,
        name: selectedCategory?.name || '',
        type: selectedCategory?.type || 'Customize',
    }), [selectedCategory]);

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
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;
    const categoryType = watch('category');

    const onSubmit = async (data) => {
        axios.post('/api/admin/condominium/set-category', { ...data, id: (selectedCategory?.id || 0) }).then(res => {
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message);
                setSelectedCategory(null)
                load();
            }
            else {
                enqueueSnackbar(res?.data?.message, { variant: 'error' });
                setSelectedCategory(null)
            }
        }).catch(err => {

        })
    }
    const onEditRow = async (category) => {
        setSelectedCategory(category);

    }
    const onDeleteRow = async (category) => {
        axios.delete(`/api/admin/condominium/delete-category/${category.id}`).then(res => {
            if (res.status === 200 && res.data?.message) {
                enqueueSnackbar(res.data?.message, { variant: 'success' })
                setSelectedCategory(null)
                load();
            }
            else {
                enqueueSnackbar(res.data?.message, { variant: 'error' })
            }
        }).catch(err => {
            enqueueSnackbar("Server error", { variant: 'error' })
        })
    }
    const load = async () => {
        setLoading(true)
        axios.get(`/api/admin/condominium/get-categories/${!categoryType ? category : categoryType}`).then(res => {
            if (res.status === 200 && res.data.data) {
                setCategories(res.data.data.categories);
            }
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        reset(defaultValues);

    }, [selectedCategory, defaultValues, reset])
    useEffect(() => {
        if (open)
            load();
    }, [open, categoryType]);

    const onCloseHandle = () => {
        axios.get(`/api/admin/condominium/get-categories/${category}`).then(res => {
            if (res.status === 200 && res.data.data) {
                onClose(res.data.data.categories);
            }
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <Dialog open={open} onClose={onCloseHandle} fullWidth maxWidth="sm">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader title={'Category of condominiums'} />
                    <CardContent>
                        <Stack marginBottom={2} paddingX={1} justifyContent={'space-between'} spacing={1} gap={1}>
                            <RHFSelect name={'category'} label="Category Type">
                                <option value="medical">Medical Cert</option>
                                <option value="residentType">Resident Type</option>
                            </RHFSelect>
                            <RHFTextField name={'name'} label="Category Name" />
                            <RHFSelect name={'type'} label="Category Type">
                                <option value='System'>System</option>
                                <option value='Customize'>Customize</option>
                            </RHFSelect>
                        </Stack>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Registered Categories
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
                                            rowCount={categories?.length}
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
                                            {(categories.map((ct, index) => (
                                                <CategoryTableRow
                                                    index={index}
                                                    key={index}
                                                    row={ct}
                                                    onEditRow={() => onEditRow(ct)}
                                                    onDeleteRow={() => onDeleteRow(ct)}
                                                />
                                            )))}
                                            <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, categories.length)} />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Scrollbar>
                        <Stack sx={{ mt: 2, justifyContent: 'end' }} direction="row" gap={2} >
                            <Button onClick={onCloseHandle} variant="outlined" >Close</Button>
                            <LoadingButton variant="contained" type="submit" >Save</LoadingButton>
                        </Stack>
                    </CardContent>

                </Card>
            </FormProvider>
        </Dialog>
    )
}