import { toast } from 'react-hot-toast';

export const createToast = {
  error: (message?: string | unknown, status?: number | string) => {
    toast.error(`${status ? `Error ${status}, ` : ''} ${message || 'Непредвиденная ошибка'}`);
  },
  success: (message: string) => {
    toast.success(message);
  },
};
