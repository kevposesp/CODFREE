<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="'/'">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <router-link class="nav-link" :class="route == 'ax' ? 'active' : ''"
                :to="'/ax'">ax</router-link>
            </li> -->
          </ul>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <!-- <i class="bi bi-person-circle"></i> -->
              <i class="bi bi-gear-wide-connected"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              <!-- <li><a class="dropdown-item" href="#">Action</a></li> -->
              <!-- <li>
                <hr class="dropdown-divider">
              </li> -->
              <li @click="logOut()"><a class="dropdown-item">Cerrar sesion</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="view">
      <router-view />
    </div>
    <Alert :alert-data="state.alertData" v-if="state.alertData.open"></Alert>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import Alert from '@/components/Alert.vue'
import router from '@/router'

export default {
  components: { Alert },
  setup() {
    // const route = ref(window.location.pathname.split('/')[1])
    const state = reactive({
      alertData: {
        open: false,
        status: 0,
        message: ''
      }
    })
    const logOut = async () => {

      await localStorage.removeItem('accessToken')
      await localStorage.removeItem('refreshToken')
      state.alertData.open = true
      state.alertData.status = 200
      state.alertData.message = 'Has cerrado sesion'

      setTimeout(() => {
        state.alertData.open = false
        router.push("/auth")
      }, 3000);
    }
    return {
      // route
      state,
      logOut
    }
  },
}
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
</style>
