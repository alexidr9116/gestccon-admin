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
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function Search() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();


    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.number().required('Cost field is required'),
        block: Yup.number().required('Cost field is required'),
        apartment: Yup.number().required('Cost field is required'),
    });

    const defaultValues = {
        name: '',
        email: '',
        block: '',
        apartment: '',
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
            enqueueSnackbar('Post success!');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} paddingTop={1}>
                <Typography variant='subtitle1'>Do a Search</Typography>
                <Typography variant='subtitle2'>Here you can search for registered users and make edits.</Typography>
                <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                    <RHFTextField name="name" label="Name" />
                    <RHFTextField name="email" label="Email" />
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
                </Stack>

                <Box>
                    <Button variant="contained"  >
                        Search
                    </Button>
                </Box>
            </Stack>
        </FormProvider>
    );
}
