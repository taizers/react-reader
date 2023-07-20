import { toast } from 'react-hot-toast';

export const createToast = {
  error: (message?: string) => {
    toast.error(message || 'Непредвиденная ошибка');
  },
  success: (message: string) => {
    toast.success(message);
  },
};
