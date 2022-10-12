import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from './Image';
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  iconOnly:PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false,iconOnly = false }) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');

  const logo = (
    <Box sx = {{width:((isMobile || iconOnly)?80:230), background:(theme.palette.mode === 'light'?theme.palette.primary.main:'transparent')}} padding = {1}>
      <Image src = {(isMobile || iconOnly)?'/assets/images/logo.png':'/assets/images/logo-full.png'} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
