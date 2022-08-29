<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title">{{ title }}</p>
    <p>{{message.value}}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
  setup(){
    const store = useStore()
    const message = computed(()=> store.state.message)
    const Title_map = {
      primary:'Muvaffaqiyatli bajarildi',
      danger:'Xatolik',
      warning:'Ogohlantirish'
    }
    const title = computed(()=>message.value ? Title_map[message.value.type] : null)

    return {
      message,
      title,
      close:()=>{ store.commit('clearMessage')}
    }
  }
}
</script>

<style scoped>

</style>