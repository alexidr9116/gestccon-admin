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

export default function Register() {
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
        title: Yup.string().required('IP Address is required'),
        date: Yup.string().required('IP Address is required'),
        environment: Yup.string().required('IP Address is required'),
        start: Yup.string().required('IP Address is required'),
        end: Yup.string().required('IP Address is required'),
        block: Yup.string().required('IP Address is required'),
        apartment: Yup.string().required('IP Address is required'),
        resident: Yup.string().required('IP Address is required'),
        safety: Yup.string().required('IP Address is required'),
        status: Yup.string().required('IP Address is required'),
        free: Yup.string().required('IP Address is required'),
        observation: Yup.string().required('IP Address is required'),
        invite: Yup.string().required('IP Address is required'),
        name: Yup.string().required('IP Address is required'),
        document: Yup.string().required('IP Address is required'),
        amount: Yup.string().required('IP Address is required'),
    });

    const defaultValues = {
        title: '',
        date: new Date(),
        environment: '',
        start: '',
        end: '',
        block: '',
        apartment: '',
        resident: '',
        safety: '',
        status: true,
        free: true,
        observation: '',
        invite: '',
        name: '',
        document: '',
        amount: '',

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
                    <Typography variant='subtitle1'>Registeration Information</Typography>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="title" label="Title" />
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />

                        <RHFSelect name="environment" label="Environment">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <Controller
                            name="start"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Start Time"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />
                        <Controller
                            name="end"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="End Time"
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
                        <RHFTextField name="safety" label="Safety" />
                        <RHFSwitch name="status" label="Confirmed/Already Charged" />
                        <RHFSwitch name="Free" label="Yes/No" />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="observation" label="Observation" />
                    </Stack>
                    
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        
                        <RHFSwitch name="invite" label="File/Digitable" />
                        
                    </Stack>
                    
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="name" label="Name" />
                        <RHFTextField name="document" label="Document" />
                    </Stack>
                    
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="amount" label="The amount" />
                    </Stack>
                    <Box>
                        <Button variant="contained" size="large" onClick={handleOpenPreview}>
                            Register
                        </Button>
                    </Box>
                </Stack>
            </FormProvider>

        </>
    );
}
