import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Box } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { HOST_API } from '../../../../config';

// ----------------------------------------------------------------------

VehicleTableRow.propTypes = {
    row: PropTypes.object,
    index: PropTypes.number,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function VehicleTableRow({ index, row, onEditRow, onDeleteRow }) {

    const { board,model,color } = row;

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
                {index + 1}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {board}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {model}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                <Box sx = {{width:60, height:30, bgcolor:color}} />
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
