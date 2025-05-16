import axiosClient from "../../common/axiosClient.tsx";

class LoginResponse {
    constructor(b: boolean) {
        this.isAuthenticated = b
    }

    isAuthenticated: boolean;
}

export async function isAuthorized(): Promise<LoginResponse> {
    try {
        const r = await axiosClient.get('/public/login/isAuthenticated',
            // {
            //     transformRequest: (data, headers) => {
            //         delete headers.common['Authorization'];
            //         return data;
            //     }
            // }
        );
        return new LoginResponse(r.data.isAuthenticated);
    } catch {
        return new LoginResponse(false);
    }
}