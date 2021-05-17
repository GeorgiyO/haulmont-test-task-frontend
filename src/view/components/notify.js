import {toast} from "react-toastify";

const settings = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

export function show(message) {
    toast.info(message, settings);
}

export function showError(message) {
    toast.error(message, settings);
}

export function showWarning(message) {
    toast.warn(message, settings);
}
