<template>
    <div class="article">
        <div class="workspace">
            <div class="edit">
                <div class="data">
                    <div class="ttl">{{ state.article.title }}</div>
                    <div class="desc">
                        {{ state.article.description }}
                    </div>
                </div>
                <div class="cont">
                    <div class="act">
                        <div class="ttl">Code: </div>
                        <div class="cp" v-clipboard="state.article.text"><i class="bi bi-clipboard"></i></div>
                    </div>
                    <textarea class="" rows="4" v-model="state.article.text" :readonly="!state.isOwner">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe.
                                                                </textarea>
                </div>
            </div>
        </div>
        <div class="usersspace">
            <div class="cont">
                <div class="form-comment col-md-6">
                    <h2 class="mb-3 mt-2 text-primary">Hacer un comentario</h2>
                    <form>
                        <div class="mb-3">
                            <label for="titleComment" class="form-label">Titulo</label>
                            <input type="text" class="form-control border border-primary" id="titleComment"
                                v-model="state.commentData.title">
                        </div>
                        <div class="mb-3">
                            <label for="textComment" class="form-label">Comentario</label>
                            <textarea class="form-control" name="" id="textComment" rows="5"
                                v-model="state.commentData.text"></textarea>
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary" type="button" @click="sendComment()" v-if="state.comments">Publicar</button>
                            <router-link to="/auth" class="btn btn-primary" v-if="!state.comments">Iniciar sesion</router-link>
                        </div>
                    </form>
                </div>
                <div class="comments" v-if="state.comments">
                    <div class="comment mb-2" v-for="(comment, key) in state.comments" :key="key">
                        <div class="img">
                            <img :src="comment.user.img" alt="">
                        </div>
                        <div class="cont">
                            <div class="header">
                                <div class="personal">
                                    <div class="name">{{ comment.user.username }}</div>
                                    <div class="username">{{ comment.user.username }}</div>
                                </div>
                                <div class="title">{{ comment.title }}</div>
                            </div>
                            <div class="body">
                                <div class="com">{{ comment.text }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { articleComp } from '@/composables/article'
import Alert from '../components/Alert.vue'

export default {
    components: { Alert },
    setup() {
        const idArticle = ref(window.location.pathname.split('/')[1])

        const state = reactive({
            alertData: {
                open: false,
                status: 200,
                message: ''
            },
            article: {
                title: 'Titulo de el articulo',
                description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit fugit quis at, reprehenderit odio porro adipisci repellat nulla a voluptatum quia quibusdam libero, nesciunt amet ratione numquam placeat rerum suscipit!',
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nisi nesciunt expedita ea ullam cupiditate magni neque praesentium quod laboriosam, quaerat fuga maiores eius obcaecati non consequatur! Sed, quae saepe.'
            },
            isOwner: false,
            comments: false,
            commentData: {
                title: '',
                text: ""
            }
        })

        const { checkOwner, readComments, createComment } = articleComp()
        const checkProperty = async () => {
            state.isOwner = await checkOwner(idArticle.value);
            console.log(state.isOwner);
        }

        const readComment = async () => {
            let res = await readComments(idArticle.value)
            if (res.message == "read_comments_ok") {
                state.comments = res.comments
            } else {
                state.comments = false
            }
        }

        const proccessCommentData = () => {
            let data = state.commentData
            return {
                idArticle: idArticle.value,
                title: data.title,
                text: data.text
            }
        }

        const clearCommentData = () => {
            state.commentData.text = ""
            state.commentData.title = ""
        }

        const sendComment = async () => {
            let res = await createComment(proccessCommentData())
            console.log(res);
            if (res.message == 'create_comment_ok') {
                state.alertData.open = true
                state.alertData.status = 201
                state.alertData.message = 'Publicaste un comentario'

                setTimeout(() => {
                    state.alertData.open = false
                    readComment()
                    clearCommentData()
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 500
                state.alertData.message = 'Error al crear comentario'

                setTimeout(() => {
                    clearCommentData()
                    state.alertData.open = false
                }, 3000);
            }
        }

        checkProperty()
        readComment()
        return {
            state,
            sendComment
        }
    },
}
</script>