import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { HOST_API } from '../../../../config';
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------

EnvironmentTableRow.propTypes = {
    row: PropTypes.object,
    index:PropTypes.number,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function EnvironmentTableRow({index, row, onEditRow, onDeleteRow }) {

    const { name, image, cost, capacity, perRevervation, state, status } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover  >
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {index+1}
            </TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Image alt={name} src={`${HOST_API}${image}`} sx={{ mr: 2, width:120, height:60 }} />
                <Typography variant="subtitle2" noWrap>
                    {name}
                </Typography>
            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                R$ {cost}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {capacity} ps
            </TableCell>
            <TableCell align="left">{perRevervation === 0? 'Hourly':'Daily'}</TableCell>
            <TableCell align="left">{state}</TableCell>
            <TableCell align="center">
                <Iconify
                    icon={status === 1 ? 'iconoir:verified-badge' : 'codicon:unverified'}
                    sx={{
                        width: 20,
                        height: 20,
                        color: 'success.main',
                        ...(status !== 1 && { color: 'warning.main' }),
                    }}
                />
            </TableCell>
            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onDeleteRow();
                                    handleCloseMenu();
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon={'eva:trash-2-outline'} />
                                Delete
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onEditRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:edit-fill'} />
                                Edit
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}
