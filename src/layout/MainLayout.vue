<template>
  <the-navbar></the-navbar>
  <the-sidebar></the-sidebar>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import AppMessage from "@/components/AppMessage";
import TheSidebar from "@/components/TheSidebar";

export default {
  components:{
    TheNavbar,
    AppMessage,
    TheSidebar
  }
}
</script>

<style scoped>

</style>