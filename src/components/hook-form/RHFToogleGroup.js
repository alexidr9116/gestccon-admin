import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { ToggleButton , ToggleButtonGroup , FormHelperText, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFToggleGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFToggleGroup({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <ToggleButtonGroup {...field}  {...other}>
            {options.map((option) => (
              <ToggleButton key = {option.value} value={option.value}>
                {option.label}
              </ToggleButton>
              // <FormControlLabel key={option.value} value={option.value} control={<ToggleButton />} label={option.label} />
            ))}
          </ToggleButtonGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
