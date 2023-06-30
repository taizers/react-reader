import React, { FC } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';

type DotMenuType = {
    id: string;
    onDeleteClick: (id: string) => void;
    onShowMoreClick: (id: string) => void;
}

export const DotMenu: FC<DotMenuType> = ({ id, onShowMoreClick, onDeleteClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onSelectShowMoreItem = () => {
    onMenuClose();
    onShowMoreClick(id);
  }
  const onSelectDeleteItem = () => {
    onMenuClose();
    onDeleteClick(id);
  }

  return (
    <>
      <IconButton
        id="sub-button"
        aria-controls={open ? 'sub-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onMenuClick}
      >
        <DehazeIcon />
      </IconButton>
      <Menu
        id="sub-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onMenuClose}
        MenuListProps={{
          'aria-labelledby': 'sub-button',
        }}
      >
        <MenuItem onClick={onSelectShowMoreItem}>Подробнее</MenuItem>
        <MenuItem onClick={onSelectDeleteItem}>Удалить</MenuItem>
      </Menu>
    </>
  );
}
