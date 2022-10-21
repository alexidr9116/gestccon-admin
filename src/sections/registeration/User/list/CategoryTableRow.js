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

// ----------------------------------------------------------------------

CategoryTableRow.propTypes = {
    row: PropTypes.object,
    index: PropTypes.number,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function CategoryTableRow({ index, row, onEditRow, onDeleteRow }) {

    const { name, type } = row;

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
            <TableCell  sx={{ textTransform: 'capitalize' }}>

                {name}

            </TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {type}
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
