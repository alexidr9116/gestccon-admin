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

export default function Record() {
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
        block: Yup.string().required('IP Address is required'),
        apartment: Yup.string().required('IP Address is required'),
        resident: Yup.string().required('IP Address is required'),
        date: Yup.string().required('IP Address is required'),
        value: Yup.string().required('IP Address is required'),
        type: Yup.string().required('IP Address is required'),
        image: Yup.string().required('IP Address is required'),
        provider: Yup.string().required('IP Address is required'),
        observation: Yup.string().required('IP Address is required'),
    });

    const defaultValues = {

        block: '',
        apartment: '',
        resident: '',
        date: new Date(),
        value: '',
        type: '',
        image: '',
        provider: '',
        observation: '',
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
                    <Typography variant='subtitle1'>Record</Typography>
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
                        <RHFTextField name="value" label="Value"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                        <RHFSelect name="type" label="Type">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>

                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                    <RHFTextField name="image" label="Image" />
                    <RHFTextField name="provider" label="Provider" />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                    <RHFTextField name="observation" label="Observation" />
                    
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
