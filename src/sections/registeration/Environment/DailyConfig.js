import { useMemo } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { WEEK_ARRAY } from "../../../utils/formatTime";
import { RHFSwitch, RHFToggleGroup, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFUploadAvatar } from '../../../components/hook-form';


export default function DailyConfig({ name }) {
    const RegisterForm = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        cost: Yup.number().required('Cost field is required'),
        capacity: Yup.number().required('Capacity field is required'),
    });

    const defaultValues = useMemo(() => ({
        week: [],
    }), []);
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
    
    return (
        <Stack>
            <Typography variant="caption">
                {name}
            </Typography>
            <Stack>
                <FormProvider  >
                    <Grid container>
                        <Grid item xs={12} sm={6}>

                            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                                <Stack direction="row" gap={1} key={index}>
                                    <Typography>
                                        {WEEK_ARRAY[index].name}
                                    </Typography>
                                    <RHFSwitch name={'week'}/>
                                </Stack>
                            ))}
                        </Grid>
                    </Grid>

                </FormProvider>
            </Stack>
        </Stack>
    )
}