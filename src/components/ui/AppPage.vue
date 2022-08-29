<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Bosh sahifaga qaytish</router-link>
  </div>
  <div class="card">
    <h1 class="card-title">{{ title }}  <slot name="header"></slot> </h1>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props){
    document.title = `${props.title} | Amaliyot`
  }
}
</script>

<style scoped>

</style>