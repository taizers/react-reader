import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { stateValuesType, statusesObjectType, Statusestypes } from '../constants/tsSchemes';

type LibraryBookStatusComponentType = {
    onDeleteFunction: () => void;
    onUpdateStatusFunction: (status: stateValuesType) => void;
    state: stateValuesType;
    statuses: statusesObjectType;
    styles?: object;
};

const LibraryBookStatusComponent: FC<LibraryBookStatusComponentType> = ({onDeleteFunction, onUpdateStatusFunction, state, statuses, styles}) => {
  const [status, setStatus] = useState<Statusestypes>('add');
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state) {
      setStatus(state);
    }
  }, [state]);

  const onOpenButtonClick = () => {
    setOpen(true);
  };

  const onSubButtonClick = (value: Statusestypes) => {
    setStatus(value);
    setOpen(false);

    if (value === 'delete') {
        return onDeleteFunction();
    }
    if (value !== 'add') {
        return onUpdateStatusFunction(value);
    }
  };

  const getStatusItem = (value: Statusestypes, onClick: (value: Statusestypes) => void, main?: boolean) => {
    let color: "info" | "warning" | "inherit" | "primary" | "secondary" | "success" | "error" = 'info';

    if (main && value === 'delete') {
      setStatus('add');
    }

    if (value === status && !main) {
      color = 'warning';
    }

    return (
      <Button key={value} color={color} sx={{ display: 'flex', gap: '5px', width: '100%', justifyContent: 'start' }} onClick={() => { onClick(value) }}>
        {statuses[value].icon} {statuses[value].labelR}
      </Button>
    );
  };

  const getStatusItems = () => {
    const arr = [];

    for (const key in statuses) {
      if ((key === 'not' || key === 'read' || key === 'later' || key === 'reading' || key === 'delete') && !(key === 'delete' && status === 'add')) {
        arr.push(getStatusItem(key as Statusestypes, onSubButtonClick));
      }
    }

    return arr;
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', ...styles }} ref={menuRef}>
      <Box sx={{ width: '200px' }}>{getStatusItem(status, onOpenButtonClick, true)}</Box>
      {isOpen && (
        <Box sx={{ width: '200px', display: 'flex', gap: '2px', flexDirection: 'column', position: 'absolute',bgcolor:'white', zIndex: 2, }}>
          {getStatusItems()}
        </Box>
      )}
    </Box>
  );
};

export default LibraryBookStatusComponent;
