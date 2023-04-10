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
            {refreshToken: token}
        )
        if(res.status == 200){
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    return {
        login,
        refreshToken
    }
}