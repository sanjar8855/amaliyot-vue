<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>
    <div class="sidebar-content">
      <h1>Title</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aut cupiditate delectus dolorem doloremque, eum id ipsum labore necessitatibus non obcaecati quam quasi quia quidem reprehenderit soluta veritatis vero.</p>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup(){
    const store = useStore()
    const sidebar = computed(()=>{
      return store.state.sidebar
    })

    return {
      sidebar,
      close:()=>{
        store.commit('closeSidebar')
      }
    }
  }
}
</script>

<style scoped>

</style>