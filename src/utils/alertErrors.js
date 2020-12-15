import { toast } from 'react-toastify';

export function alertErrors(type) {
  switch (type) {
    case 'auth/wrong-password':
      toast.warning('La contraseña introducida no es correcta.');
      break;

    default:
      toast.warning('Error del servidor, inténtelo más tarde.');
      break;
  }
}
