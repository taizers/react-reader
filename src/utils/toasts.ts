import { toast } from 'react-hot-toast';

export const createToast = {
  erroror: (message?: string) => {
    toast.erroror(message || 'Непредвиденная ошибка');
  },
  success: (message: string) => {
    toast.success(message);
  },
};
