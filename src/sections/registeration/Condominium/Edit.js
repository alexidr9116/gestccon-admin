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
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function Edit() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().required('Email field is required'),
        phoneNumber: Yup.string().required('PhoneNumber field is required'),
        CEP: Yup.string().required('CEP field is required'),
        publicPlace: Yup.string().required('Public place field is required'),
        zip: Yup.string().required('Zip code field is required'),
        condoNumber: Yup.string().required('Condonumber field is required'),
        neighbohood: Yup.string().required('Neighbohood field is required'),
        streetType: Yup.string().required('Street type field is required'),
        city: Yup.string().required('City field is required'),
        state: Yup.string().required('State field is required'),
        reservationEmailType: Yup.string().required('Email Reservation field is required'),
    });

    const defaultValues = {
        name: '',
        siteAddress: '',
        email: '',
        phoneNumber: '',
        CEP: '',
        publicPlace: '',
        condoNumber: '',
        neighbohood: '',
        streetType: '',
        city: '',
        state: '',
        reservationEmailType: '',
        guestList: '0',
        cardPosition: '0',
        validateBirth: '0',
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
    const handleDrop = useCallback(
        (acceptedFiles) => {
          const file = acceptedFiles[0];
    
          if (file) {
            setValue(
              'image',
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
          }
        },
        [setValue]
      );
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
                <Typography variant='subtitle1'>Condominium information</Typography>
                <RHFUploadSingleFile name="image" onDrop = {handleDrop} />
                <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                    <RHFTextField name="name" label="Name" />
                    <RHFTextField name="siteAddress" label="Website" InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment> }} />
                </Stack>
                <Typography variant='subtitle1'>Condominium Contact</Typography>
                <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                    <RHFTextField name="email" label="Email" />
                    <RHFTextField name="phoneNumber" label="Phone Number" />
                </Stack>
                <Typography variant='subtitle1'>Condominium Address</Typography>
                <Stack gap={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                    <RHFTextField name="zip" label="Zip code" />
                    <RHFTextField name="publicPlace" label="Public place" />
                    <RHFTextField name="condoNumber" label="Number" />
                </Stack>
                <Stack gap={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                    <RHFTextField name="city" label="City" />
                    <RHFTextField name="state" label="State" />

                </Stack>
                <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                    <RHFTextField name="neighbohood" label="Neighborhood"  />
                    <RHFTextField name="streetType" label="Type of street" />
                </Stack>
                <Typography variant='subtitle1'>Condominium setting and permission</Typography>
                <Stack gap={1}>
                    <RHFSelect name="reservationEmailType" label="Reservation Email" sx ={{mb:2}}>
                        {["CATEGORY_OPTION"].map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>

                        ))}
                    </RHFSelect>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <Typography variant='subtitle1'>Guest List</Typography>
                            <RHFToggleGroup
                                name = 'guestList'
                                options={[
                                    { value: '0', label: 'Typed list' },
                                    { value: '1', label: 'Upload' },
                                    { value: '2', label: 'Both' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant='subtitle1'>Card Position</Typography>
                            <RHFToggleGroup
                                name = 'cardPosition'
                                options={[
                                    { value: '0', label: 'Vertical' },
                                    { value: '1', label: 'Horizontal' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant='subtitle1'>Validate birth?</Typography>
                            <RHFToggleGroup
                                name = 'validateBirth'
                                options={[
                                    { value: '1', label: 'Yes' },
                                    { value: '0', label: 'No' },
                                ]}
                            />
                        </Grid>
                    </Grid>

                </Stack>

                <Box>
                    <LoadingButton variant="contained" loading = {isSubmitting} type ={'submit'}>
                        Update
                    </LoadingButton>
                </Box>
            </Stack>
        </FormProvider>
    );
}
