import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box } from '@mui/material';
// routes

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function Search() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleOpenPreview = () => {
        setOpen(true);
    };

    const handleClosePreview = () => {
        setOpen(false);
    };

    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('IP Address is required'),
        value: Yup.string().required('IP Address is required'),
        initialDue: Yup.string().required('IP Address is required'),
        finalDue: Yup.string().required('IP Address is required'),
        initialReg: Yup.string().required('IP Address is required'),
        finalReg: Yup.string().required('IP Address is required'),
        block: Yup.string().required('IP Address is required'),
        apartment: Yup.string().required('IP Address is required'),
        resident: Yup.string().required('IP Address is required'),
        comapny: Yup.string().required('IP Address is required'),
        type: Yup.string().required('IP Address is required'),
        order: Yup.string().required('IP Address is required'),

    });

    const defaultValues = {
        name: '',
        value: '',
        initialDue: new Date(),
        finalDue: new Date(),
        initialReg: new Date(),
        finalReg: new Date(),
        block: '',
        apartment: '',
        resident: '',
        company: '',
        type: '',
        order: '',
    };

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

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            handleClosePreview();
            enqueueSnackbar('Post success!');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} paddingTop={1}>
                    <Typography variant='subtitle1'>Search</Typography>
                    
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="name" label="Name" />
                        
                        <RHFTextField name="value" label="Value"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <Controller
                            name="initialDue"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Initial Due Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        /><Controller
                            name="finalDue"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Final Due Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <Controller
                            name="initialReg"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Initial Registration Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        /><Controller
                            name="finalReg"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Final Registration Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFSelect name="block" label="Block">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                        <RHFSelect name="apartment" label="Apartment">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                        <RHFSelect name="resident" label="Resident">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFSelect name="company" label="Company">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                        <RHFSelect name="type" label="Type">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                        <RHFSelect name="order" label="Order">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>
                    <Box>
                        <Button variant="contained" size="large" onClick={handleOpenPreview}>
                            To Search for
                        </Button>
                    </Box>
                </Stack>
            </FormProvider>

        </>
    );
}
