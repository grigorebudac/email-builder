import { toast, TypeOptions } from 'react-toastify';

function useToast() {
  function showToast(content: string, type: TypeOptions) {
    toast(content, {
      type: type,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  return {
    showToast,
  };
}

export default useToast;
