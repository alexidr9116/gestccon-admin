import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Box, InputAdornment, Select, CardContent, CardHeader } from '@mui/material';
// routes

// components
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadImage } from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';
import { HOST_API } from '../../../config';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
const mailOptions = [
    { value: 'portal', label: "Term Portal" },
    { value: 'panel', label: "Term Panel" },
    { value: 'both', label: "Both" },
    { value: 'none', label: "None" },
]
// ----------------------------------------------------------------------
export default function Edit() {
    const navigate = useNavigate();
    const { user, initialize } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [mode, setMode] = useState('update');
    const [condominiums, setCondominiums] = useState([]);
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().required('Email field is required'),
        phoneNumber: Yup.string().required('PhoneNumber field is required'),
        publicPlace: Yup.string().required('Public place field is required'),
        zip: Yup.string().required('Zip code field is required'),
        condoNumber: Yup.string().required('Condonumber field is required'),
        neighbohood: Yup.string().required('Neighbohood field is required'),
        streetType: Yup.string().required('Street type field is required'),
        city: Yup.string().required('City field is required'),
        state: Yup.string().required('State field is required'),
        // reservationEmailType: Yup.string().required('Email Reservation field is required'),
    });

    const defaultValues = useMemo(() => ({
        logo: user.condo?.logo && `${HOST_API}${user?.condo?.logo}` || '',
        name: user.condo?.name || '',
        siteAddress: user.condo?.siteAddress || '',
        email: user.condo?.email || '',
        image: `${HOST_API}${user.condo?.image || ''}`,
        phoneNumber: user.condo?.phoneNumber || '',
        publicPlace: user.condo?.publicPlace || '',
        condoNumber: user.condo?.condoNumber || '',
        neighbohood: user.condo?.neighbohood || '',
        streetType: user.condo?.streetType || '',
        city: user.condo?.city || '',
        zip: user.condo?.zip || '',
        state: user.condo?.state || '',
        // reservationEmailType: user.condo?.reservationEmailType || 'both',
        // guestList: user.condo?.guestList || '0',
        // cardPosition: user.condo?.cardPosition || '0',
        // validateBirth: `${user.condo?.validateBirth}` || 'true',
    }), [user?.condo]);

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
    const handleDropLogo = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'logo',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );
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
    useEffect(() => {
        if (user?.disId?.includes('super-administrator')) {
            axios.get('/api/admin/condominium/gets').then(res => {
                setCondominiums(res.data.data.condominiums);
            }).catch(err => {

            })
        }

    }, [])
    const uploadLogo = async (data, id) => {
        try {
            console.log(data)
            if (typeof data.logo === 'string' && id>0) {
                axios.post('/api/admin/condominium/set-condo-logo-without-image', {logo:data.logo, id}).then(res=>{
                    if(res.status === 200){
                        enqueueSnackbar(res.data?.message);
                        initialize();
                        reset(defaultValues)
                        
                    }
                    else{
                        enqueueSnackbar(res.data?.message,{variant:'error'});
                    }
                }).catch(err=>{

                }).finally(()=>{

                })
            }
            if (typeof data.logo === 'object' && id > 0) {
                const iData = new FormData();
                iData.append('logo', data.logo);
                iData.append('id',id);

                axios.post('/api/admin/condominium/set-condo-logo-with-image', iData).then(res=>{
                    if(res.status === 200){
                        enqueueSnackbar(res.data?.message);
                        initialize();
                        reset(defaultValues)
                       
                    }
                    else{
                        enqueueSnackbar(res.data?.message,{variant:'error'});
                    }
                }).catch(err=>{

                }).finally(()=>{

                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        try {
            const iData = new FormData();

            if (typeof data.image === 'string') {
                axios.post('/api/admin/condominium/set-condo-without-image', { ...data, id: (mode === 'update' ? (user?.condo?.id || 0) : 0) }).then(async(res) => {
                    if (res.status === 200) {
                        
                        await uploadLogo(data, res.data.data.id);
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => enqueueSnackbar("Internal server error", { variant: 'error' }))
            }
            if (typeof data.image === 'object') {
                iData.append("name", data.name);
                iData.append("siteAddress", data.siteAddress);
                iData.append("email", data.email);
                iData.append("image", data.image);
                iData.append("phoneNumber", data.phoneNumber);
                iData.append("publicPlace", data.publicPlace);
                iData.append("condoNumber", data.condoNumber);
                iData.append("neighbohood", data.neighbohood);
                iData.append("streetType", data.streetType);
                iData.append("city", data.city);
                iData.append("state", data.state);
                iData.append("zip", data.zip);
                // iData.append("reservationEmailType", data.reservationEmailType);
                // iData.append("guestList", data.guestList);
                // iData.append("cardPosition", data.cardPosition);
                // iData.append("validateBirth", data.validateBirth);
                iData.append("id", (mode === 'update' ? (user?.condo?.id || 0) : 0));
                axios.post('/api/admin/condominium/set-condo-with-image', iData).then(async(res) => {
                    if (res.status === 200) {
                        await uploadLogo(data,res.data.data.id);
                         
                    }
                    else {
                        enqueueSnackbar(res.data?.message || "Failed your request", { variant: 'error' });
                    }
                }).catch(err => { enqueueSnackbar("Internal server error", { variant: 'error' }); })
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeCondo = (e, value) => {
        axios.post('/api/admin/user/update-condo', { condoId: value.id }).then(res => {
            enqueueSnackbar(res.data?.message);
            initialize();
        })
    }
    useEffect(() => {

        reset(defaultValues)
    }, [user, reset, defaultValues]);

    return (
        <>
            {user?.disId === 'super-administrator' &&
                <Stack padding={2} sx ={{bgcolor:'background.paper'}}>
                    <Autocomplete options={condominiums} renderInput={(params) => <TextField {...params} label="Current Condominium" />} isOptionEqualToValue={(option, value) => (option.name === value.name)} defaultValue={user?.condo} getOptionLabel={(option) => option.name} onChange={handleChangeCondo} />

                </Stack>
            }
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} paddingTop={1}>
                    <Card>
                        <CardHeader title={'Condominium information'} />
                        <CardContent >
                            <RHFUploadImage name="logo" onDrop={handleDropLogo}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            my: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Choose logo image.
                                    </Typography>
                                } />


                            <RHFUploadSingleFile name="image" onDrop={handleDrop} sx={{ mb: 4 }} />
                            <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                <RHFTextField name="name" label="Name" />
                                <RHFTextField name="siteAddress" label="Website" InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment> }} />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title='Condominium Contact' />
                        <CardContent>
                            <Stack gap={1} paddingBottom={1} sx={{ flexDirection: { md: 'row', xs: 'column' } }}>
                                <RHFTextField name="email" label="Email" />
                                <RHFTextField name="phoneNumber" label="Phone Number" />
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title='Condominium Address' />
                        <CardContent >
                            <Stack gap={2}>
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
                                    <RHFTextField name="neighbohood" label="Neighborhood" />
                                    <RHFTextField name="streetType" label="Type of street" />
                                </Stack>
                            </Stack>

                            {/* <Typography variant='subtitle1'>Condominium setting and permission</Typography>
                    <Stack gap={1}>
                        <RHFSelect name="reservationEmailType" label="Reservation Email" sx={{ mb: 2 }}>
                            {mailOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>

                            ))}
                        </RHFSelect>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={5}>
                                <Typography variant='subtitle1'>Guest List</Typography>
                                <RHFToggleGroup
                                    name='guestList'
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
                                    name='cardPosition'
                                    options={[
                                        { value: '0', label: 'Vertical' },
                                        { value: '1', label: 'Horizontal' },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant='subtitle1'>Validate birth?</Typography>
                                <RHFToggleGroup
                                    name='validateBirth'
                                    options={[
                                        { value: 'true', label: 'Yes' },
                                        { value: 'false', label: 'No' },
                                    ]}
                                />
                            </Grid>
                        </Grid>

                    </Stack> */}
                        </CardContent>
                    </Card>
                    <Box>
                        {user?.condo && user?.condo !== null &&
                            <LoadingButton onClick={() => setMode('update')} variant="contained" loading={isSubmitting} type={'submit'} >
                                Update
                            </LoadingButton>
                        }
                        {(user?.disId === 'super-administrator') &&
                            <LoadingButton onClick={() => setMode('new')} variant="outlined" loading={isSubmitting} type={'submit'} sx={{ ml: 2 }} >
                                Add Condominium
                            </LoadingButton>
                        }
                    </Box>
                </Stack>
            </FormProvider>
        </>

    );
}
