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
        status: Yup.string().required('IP Address is required'),
        place: Yup.string().required('IP Address is required'),
        date: Yup.string().required('IP Address is required'),

    });

    const defaultValues = {
        
        name: '',
        status: '',
        place: '',
        date: new Date(),
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
                    <RHFTextField name="name" label="Name" />
                        <RHFSelect name="status" label="Status">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                    </Stack>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' } }} gap={2}>
                        <RHFSelect name="place" label="Place">
                            {["CATEGORY_OPTION"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>

                            ))}
                        </RHFSelect>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <MobileDatePicker
                                    {...field}
                                    label="Entry Date"
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />
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
