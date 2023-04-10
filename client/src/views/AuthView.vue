<template>
    <div class="login">
        <div class="d-flex justify-content-center align-items-center login-cont">
            <div class="col-md-4 p-5 shadow-sm border rounded-3">
                <div class="changeMode mb-4">
                    <div class="log" :class="state.mode == 'login' ? 'active' : ''" @click="state.mode = 'login'">Login
                    </div>
                    <div class="signup" :class="state.mode == 'signup' ? 'active' : ''" @click="state.mode = 'signup'">
                        SignUp</div>
                </div>
                <div class="loginCont" :class="state.mode == 'login' ? 'active' : ''">
                    <h2 class="text-center mb-4 text-primary">Login Form</h2>
                    <form>
                        <div class="mb-3">
                            <label for="usernameLogin" class="form-label">Username</label>
                            <input type="text" class="form-control border border-primary" id="usernameLogin"
                                v-model="userData.login.username">
                        </div>
                        <div class="mb-3">
                            <label for="passwordLogin" class="form-label">Password</label>
                            <input type="password" class="form-control border border-primary" id="passwordLogin"
                                v-model="userData.login.password">
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary" type="button" @click="signIn">Login</button>
                        </div>
                    </form>
                </div>
                <div class="signupCont" :class="state.mode == 'signup' ? 'active' : ''">
                    <h2 class="text-center mb-4 text-primary">SignUp Form</h2>
                    <form>
                        <div class="mb-3">
                            <label for="nameSignup" class="form-label">Name</label>
                            <input type="text" class="form-control border border-primary" id="nameSignup"
                                v-model="userData.signup.name">
                        </div>
                        <div class="mb-3">
                            <label for="usernameSignup" class="form-label">Username</label>
                            <input type="text" class="form-control border border-primary" id="usernameSignup"
                                v-model="userData.signup.username">
                        </div>
                        <div class="mb-3">
                            <label for="emailSignup" class="form-label">email</label>
                            <input type="text" class="form-control border border-primary" id="emailSignup"
                                v-model="userData.signup.email">
                        </div>
                        <div class="mb-3">
                            <label for="passwordSignup" class="form-label">Password</label>
                            <input type="password" class="form-control border border-primary" id="passwordSignup"
                                v-model="userData.signup.password">
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary" type="button" @click="signUp">SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
    </div>
</template>

<script>
import { authComp } from '../composables/auth'
import { ref, reactive } from 'vue'
import Alert from '../components/Alert.vue'
import router from '@/router'

export default {
    components: { Alert },
    setup() {
        const state = reactive({
            alertData: {
                open: false,
                status: 0,
                message: ''
            }, mode: 'login'
        })
        const { login, signup } = authComp()
        const userData = reactive({
            login: {
                username: 'ax',
                password: '12345678'
            },
            signup: {
                name: 'kevin',
                username: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                password2: '12345678'
            }
        })
        const processUserData = (t) => {
            let data = userData;
            if (t == 'login') {
                return {
                    username: data.login.username,
                    password: data.login.password
                }
            } else if (t == 'signup') {
                return {
                    name: data.signup.name,
                    username: data.signup.username,
                    email: data.signup.email,
                    password: data.signup.password
                }
            }
        }

        const signIn = async () => {
            let usr = processUserData('login')
            let sign = await login(usr)
            if (sign.status == 200) {
                localStorage.setItem('accessToken', sign.accessToken)
                localStorage.setItem('refreshToken', sign.refreshToken)
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Has iniciado sesion'

                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/")
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 401
                state.alertData.message = 'Error interno'

                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/auth")
                }, 3000);
            }
        }
        const signUp = async () => {
            let usr = processUserData('signup')
            let sign = await signup(usr)
            if (sign.status == 200) {
                state.alertData.open = true
                state.alertData.status = 200
                state.alertData.message = 'Te has registrado correctamente!'

                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/auth")
                }, 3000);
            } else {
                state.alertData.open = true
                state.alertData.status = 501
                
                if(sign.message == 'err_sgup_username_ex') {
                    state.alertData.message = 'El nombre de usuario ya existe'
                } else if(sign.message == 'err_sgup_email_ex') {
                    state.alertData.message = 'El email ya existe'
                } else {
                    state.alertData.message = 'Error interno'
                }
                
                setTimeout(() => {
                    state.alertData.open = false
                    router.push("/auth")
                }, 3000);
            }
        }
        return {
            userData,
            signIn,
            signUp,
            state
        }
    },
}
</script>