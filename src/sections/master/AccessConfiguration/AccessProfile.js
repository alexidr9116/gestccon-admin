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
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function AccessProfile() {
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
        profile: Yup.string().required('IP Address is required'),
    });

    const defaultValues = {
        profile: '',
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
                <Stack spacing={3}  paddingTop = {1}>
                    <Typography variant='subtitle1'>Change Permissions</Typography>
                    <Typography variant='subtitle2'>Select a section to view its permissions.</Typography>
                    <Stack sx={{flexDirection:{md:'row', xs:'column'}}} gap={2}>
                    <RHFTextField name="profile" label="Profile" />
                    </Stack>
                    <Box display="flex" >
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            Registeration
                        </Button>
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            Controls
                        </Button>
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            Financial
                        </Button>
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            Master Panel
                        </Button>
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            General Report
                        </Button>
                        <Button variant="contained" size="large" onClick={handleOpenPreview} sx={{mr:"20px"}}>
                            Portal Website
                        </Button>
                    </Box>
                    <Box>
                        <Button variant="contained" size="large" onClick={handleOpenPreview}>
                            To Save
                        </Button>
                    </Box>
                </Stack>
            </FormProvider>

        </>
    );
}
