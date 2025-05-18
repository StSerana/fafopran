import axios from "axios";

delete axios.defaults.headers.common["Authorization"];
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_FAFOPRAN_BACK_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    // transformRequest: (data, headers) => {
    //     delete headers.common['Authorization'];
    //     return data;
    // }

});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['Authorization'] = null;


export default axiosInstance