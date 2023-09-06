import { toast } from "react-toastify";

const getToastError = (data) => {
    return toast.error(data, {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark",});
}

export default getToastError