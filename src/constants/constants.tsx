import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BorderAllIcon from '@mui/icons-material/BorderAll';

export const apiUrl = 'http://localhost:5000/api/v1/';
export const appUrl = 'http://localhost:3000/';
export const defaultStartPage = 0;
export const defaultLimit = 10;

export const libraryBookStatuses = {
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

export const libraryBookStatusesForSearch = {
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
    labelR: 'Все',
    LabelEn: 'All',
    icon: <BorderAllIcon />,
  },
  'add': {
    labelR: 'Все',
    LabelEn: 'All',
    icon: <BorderAllIcon />,
  }
};