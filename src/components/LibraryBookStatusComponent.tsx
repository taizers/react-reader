import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type Statusestypes = 'not' | 'read' | 'later' | 'reading' | 'add' | 'delete';

const statuses = {
  'reading': {
    labelR: 'Читаю',
    LabelEn: 'Reading',
    icon: <AutoStoriesIcon />,
  },
  'later': {
    labelR: 'Прочту позже',
    LabelEn: 'Read it later',
    icon: <QueryBuilderIcon />,
  },
  'read': {
    labelR: 'Прочитал',
    LabelEn: 'Read',
    icon: <DoneAllIcon />,
  },
  'not': {
    labelR: 'Не интересно',
    LabelEn: 'Not interested',
    icon: <VisibilityOffIcon />,
  },
  'delete': {
    labelR: 'Удалить',
    LabelEn: 'Delete',
    icon: <DeleteIcon />,
  },
  'add': {
    labelR: 'Добавить',
    LabelEn: 'Add',
    icon: <AddIcon />,
  }
};

type LibraryBookStatusComponentType = {
    onDeleteFunction: () => void;
    onUpdateStatusFunction: (status: Statusestypes) => void;
    state: 'not' | 'read' | 'later' | 'reading' | null;
}

const LibraryBookStatusComponent: FC<LibraryBookStatusComponentType> = ({onDeleteFunction, onUpdateStatusFunction, state}) => {
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
      if (key === 'not' || key === 'read' || key === 'later' || key === 'reading' || key === 'delete') {
        arr.push(getStatusItem(key as Statusestypes, onSubButtonClick));
      }
    }

    return arr;
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }} ref={menuRef}>
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
