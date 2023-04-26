import ApiService from "@/core/api.service";
export function articleComp() {

    const checkOwner = async (id) => {

        try {
            const res = await ApiService.post(
                "/article/checkOwner",
                { id }
            )
            if (res.data?.isOwner) {
                return true
            }
        } catch (error) {
            console.log(error);
        }

        return false
    }

    const readComments = async (id) => {
        const res = await ApiService.post(
            "/comment/readComments",
            {
                id
            }
        )
        if (res.data) {
            if (res.data.message == "not_auth") {
                return {
                    message: res.data.message
                }
            } else {
                return {
                    message: res.data.message,
                    comments: res.data.comments
                }
            }
        }

        return false
    }

    const createComment = async (data) => {
        const res = await ApiService.post(
            "/comment/create",
            data

        )
        if (res.data) {
            if (res.data.message == "create_comment_ok") {
                return {
                    message: res.data.message
                }
            }
        }
        return false
    }

    return {
        checkOwner,
        readComments,
        createComment
    }
}