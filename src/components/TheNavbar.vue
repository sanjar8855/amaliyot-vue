<template>
  <nav class="navbar">
    <h3>Amaliyot</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Bosh sahifa</router-link>
      </li>
      <li>
        <router-link to="/help">Yordam</router-link>
      </li>
      <li>
        <a href="#" @click="open">Sidebar</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Chiqish</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
  setup(){
    const store = useStore()
    const router = useRouter()
    return {
      logout:()=>{
        store.commit('auth/logout')
        router.push('/login')
      },
      open:()=>{
        store.commit('openSidebar')
      }
    }
  }
}
</script>

<style scoped>

</style>