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
        cost: Yup.number().required('Cost field is required'),
    });

    const defaultValues = {
        name: '',
        cost: 0,
        image: '',
        perRevervation: '0',
        showAll: '0',
        state: '0',
        status:'1',
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
    const onSubmit = async (data) => {
        console.log(data)
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
                <Typography variant='subtitle1'>Environment information</Typography>
                <Typography variant='subtitle2'>Here you will define the information about the environment</Typography>
                <Stack gap={1} paddingBottom={1}>
                    <RHFTextField name="name" label="Name" />
                    <RHFUploadSingleFile name="image" onDrop={handleDrop}/>
                    <RHFTextField name="cost" label="Booking cost" />
                </Stack>
                <Stack gap={1}>
                    <Typography variant='subtitle1'>Environment setting</Typography>
                    <Typography variant='subtitle2'>Duration of servations</Typography>
                    <RHFToggleGroup
                        name = "perRevervation"
                        options={[
                            { value: '0', label: 'Per hour' },
                            { value: '1', label: 'Per Day' },
                        ]}
                    />
                    <Typography variant='subtitle2'>Will it appear for everyone?</Typography>
                    <RHFToggleGroup
                        name = "showAll"
                        options={[
                            { value: '0', label: 'Yes' },
                            { value: '1', label: 'No' },
                            { value: '2', label: 'Admins only' },
                        ]}
                    />
                    <Typography variant='subtitle2'>Environment status</Typography>
                    <RHFToggleGroup
                        name = "status"
                        options={[
                            {value:'1', label:'Active'},
                            {value:'0', label:'Inactive'},
                        ]}
                    />
                    <Typography variant='subtitle2'>Status pattern</Typography>
                    <RHFToggleGroup
                        name = "state"
                        options={[
                            {value:'0', label:'1st on hold'},
                            {value:'1', label:'Confirmed'},
                            {value:'2', label:'Expired'},
                            {value:'3', label:'Already Charged'},
                            {value:'4', label:'Prebooking'},
                        ]}
                    />
                    
                </Stack>

                <Box>
                    <LoadingButton loading={isSubmitting} variant="contained" type='submit' >
                        Register
                    </LoadingButton>
                </Box>
            </Stack>
        </FormProvider>
    );
}
