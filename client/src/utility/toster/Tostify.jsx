import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
const handleSuccess = (msg) => {
  toast.success(msg);
};

const handleError = (msg) => {
  toast.error(msg);
};

export { handleSuccess, handleError };
