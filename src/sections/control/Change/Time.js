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
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, InputAdornment } from '@mui/material';
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

export default function Setting() {
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
        value1: Yup.string().required('IP Address is required'),
        value2: Yup.string().required('IP Address is required'),
        value3: Yup.string().required('IP Address is required'),
        billing: Yup.string().required('IP Address is required'),
        minium: Yup.string().required('IP Address is required'),
        closing: Yup.string().required('IP Address is required'),
    });

    const defaultValues = {
        value1: 60,
        value2: 40,
        value3: 40,
        billing: 100,
        minium: 10,
        closing: 15,
        generate: true
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
                    <Typography variant='subtitle1'>Do a search</Typography>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="value1" label="Value1"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                        <RHFTextField name="value2" label="Value2"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                        <RHFTextField name="value3" label="Value3"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                        <RHFTextField name="billing" label="Billing Package"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="minium" label="Minium age" />
                        <RHFTextField name="closing" label="Closing Day" />
                        <RHFSwitch name="generate" label="Yes/No" />
                    </Stack>
                    <Box>
                        <Button variant="contained" size="large" onClick={handleOpenPreview}>
                           Update
                        </Button>
                    </Box>
                </Stack>
            </FormProvider>

        </>
    );
}
