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

export default function Edit() {
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
        image: Yup.string().required('IP Address is required'),
        site: Yup.string().required('IP Address is required'),
        email: Yup.string().required('IP Address is required'),
        telphone: Yup.string().required('IP Address is required'),
        zipcode: Yup.string().required('IP Address is required'),
        place: Yup.string().required('IP Address is required'),
        number: Yup.string().required('IP Address is required'),
        neighborhood: Yup.string().required('IP Address is required'),
        type: Yup.string().required('IP Address is required'),
        city: Yup.string().required('IP Address is required'),
        state: Yup.string().required('IP Address is required'),
        email: Yup.string().required('IP Address is required'),
    });

    const defaultValues = {
        name: '',
        image: '',
        site: true,
        email: '',
        telephone: '',
        zipcode: '',
        number: '',
        neighborhood: '',
        type: '',
        city: '',
        state: '',
        email: '',
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
                    <Typography variant='subtitle1'>Condominium Information</Typography>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="name" label="Condominium Name" />
                        <RHFTextField name="image" label="Image" />
                        <RHFTextField name="site" label="Site"
                            InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment> }} />
                    </Stack>
                </Stack>
                <Stack spacing={3} paddingTop={1}>
                    <Typography variant='subtitle1'>Condo Address</Typography>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                    <RHFTextField name="neighborhood" label="Neighborhood" />
                        <RHFSelect name="type" label="Type of Street">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>
                </Stack>
                <Stack spacing={3} paddingTop={1}>
                    <Typography variant='subtitle1'>Condo Settings and Permisions </Typography>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFTextField name="city" label="City" />
                        <RHFTextField name="state" label="State " />
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
