<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3 v-if="title">{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:['title'],
  emits:['close'],
  setup(){

    return {

    }
  }
}
</script>

<style scoped>

</style>