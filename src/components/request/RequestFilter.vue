<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="FISH ni kiriting..." v-model="name">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option selected="" disabled>Tanlang...</option>
        <option value="done">Bajarildi</option>
        <option value="cancelled">Qaytarildi</option>
        <option value="active">Tasdiqlanmoqda</option>
        <option value="sending">Yuborilmoqda</option>
      </select>
    </div>
    <button class="btn" @click="reset" v-if="isActive">Tozalash</button>
  </div>
</template>

<script>
import {ref,watch,computed} from 'vue'
export default {
  emits:[
      'update:modelValue'
  ],
  props:['modelValue'],
  setup(_,{emit}){
    const name = ref()
    const status = ref()
    watch([name,status],values => {
      emit('update:modelValue',{
        name:values[0],
        status:values[1]
      })
    })
    const isActive = computed(()=> name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset:() =>{
        name.value = ''
        status.value = ''
      }
    }
  }
}
</script>

<style scoped>

</style>