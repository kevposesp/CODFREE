import ApiService from "@/core/api.service";
export function authComp() {

    const login = async (usr) => {

        const res = await ApiService.post(
            "/auth/signin",
            usr
        )

        if (res.data) {
            return {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                status: 200
            }
        }

        return false

    }

    const refreshToken = async (token) => {
        const res = await ApiService.post(
            "/auth/refresh",
            { refreshToken: token }
        )
        if (res.status == 200) {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    const signup = async (usr) => {

        const res = await ApiService.post(
            "/auth/signup",
            usr
        )
        if(res.status == 200) {
            return {
                status: 200
            }
        } else {
            if(res.response.data.message == 'err_sgup_username_ex') {
                return {
                    status: 500,
                    message: 'err_sgup_username_ex'
                }
            } else if(res.response.data.message == 'err_sgup_email_ex') {
                return {
                    status: 500,
                    message: 'err_sgup_email_ex'
                }
            }
            return {
                status: 500
            }
        }
    }

    return {
        login,
        refreshToken,
        signup
    }
}