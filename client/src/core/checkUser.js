import ApiService from "@/core/api.service";

export default {
    async checkUser() {
        var res = false
        await ApiService.post('/auth/checkAccess/')
            .then((data) => {
                if (data?.data?.status && data != null) {
                    res = true;
                } else {
                    res = false;
                }
            })
            .catch((error) => {
                console.log(error);
                res = false;
            })
        return res
    }
}