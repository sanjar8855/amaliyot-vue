<template>
  <span :class="['badge', className]">{{text}}</span>
</template>

<script>

import {ref,watch} from 'vue'
export default {
  props:{
    type:{
      type:String,
      required:true,
      validator(value){
        return ['active','cancelled','done','sending'].includes(value)
      }
    }
  },
  setup(props){
    const classesMap = {
      'active':'primary',
      'cancelled':'danger',
      'done':'primary',
      'sending':'warning'
    }
    const textMap = {
      'active':'Tasdiqlanmoqda',
      'cancelled':'Qaytarildi',
      'done':'Bajarildi',
      'sending':'Yuborilmoqda'
    }

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    watch(props,val => {
      className.value = classesMap[val.type]
      text.value = textMap[val.type]
    })

    return {
      className,
      text
    }
  }

}
</script>

<style scoped>

</style>