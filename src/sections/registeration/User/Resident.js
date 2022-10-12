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
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function Resident() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();


    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
        cell: Yup.string().required('Cell field is required'),
        block: Yup.string().required('Password field is required'),
        apartment: Yup.string().required('Password field is required'),
        apart: Yup.string().required('Apartment field is required'),
        roleId: Yup.string().required('Profile field is required'),

    });

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        cell: '',
        block: '',
        apartment: '',
        roleId: '',
        mayAccessSite:'true',
        releasePermission:'true',
        status:'1'
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

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatar',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} paddingTop={1}>
                <Typography variant='subtitle1'>User information</Typography>
                <Typography variant='subtitle2'>Here you will define information about the user.</Typography>
                <Stack gap={1} paddingBottom={1} sx={{ flexDirection: {xs:'column',md:'row'},justifyContent:'space-between' }}>

                    <RHFUploadAvatar name="avatar" onDrop={handleDrop}
                        helperText={
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 2,
                                    mx: 'auto',
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'text.secondary',
                                }}
                            >
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                            </Typography>
                        } />
                    <Stack sx = {{flexShrink:1, justifyContent:'space-between',py:2}}>
                        <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                            <RHFTextField name="name" label="Name" />
                            <RHFTextField name="email" label="Email" />
                        </Stack>
                        <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                            <RHFTextField name="password" label="Password" />
                            <RHFTextField name="cell" label="Cell" />
                        </Stack>
                    </Stack>

                </Stack>

                <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                    <RHFSelect name="block" label="Block" sx={{ mb: 2 }}>
                        {["ROLES"].map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </RHFSelect>
                    <RHFSelect name="apartment" label="Apartment" sx={{ mb: 2 }}>
                        {["ROLES"].map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </RHFSelect>
                </Stack>
                <Stack gap={1}>
                    <Typography variant='subtitle1'>User settings and permissions</Typography>
                    <RHFSelect name="roleId" label="Category" sx={{ mb: 2 }}>
                        {["ROLES"].map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </RHFSelect>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <Typography variant='subtitle1'>Will you receive messages?</Typography>
                            <RHFToggleGroup
                                name='mayAccessSite'
                                options={[
                                    { value: 'true', label: 'Yes' },
                                    { value: 'false', label: 'No' },

                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant='subtitle1'>Can you make reservations?</Typography>
                            <RHFToggleGroup
                                name='releasePermission'
                                options={[
                                    { value: 'true', label: 'Yes' },
                                    { value: 'false', label: 'No' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant='subtitle1'>Status</Typography>
                            <RHFToggleGroup
                                name='status'
                                options={[
                                    { value: '1', label: 'Active' },
                                    { value: '0', label: 'InActive' },
                                ]}
                            />
                        </Grid>
                    </Grid>

                </Stack>

                <Box>
                    <LoadingButton variant="contained" type = {'submit'}  loading = {isSubmitting}>
                        Register
                    </LoadingButton>
                </Box>
            </Stack>
        </FormProvider >
    );
}
