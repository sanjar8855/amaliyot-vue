<template>
  <h4 class="text-center" v-if="requests.length==0">Arizalar ro'yxati bo'm-bo'sh</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>FISH</th>
        <th>Telefon</th>
        <th>Summa</th>
        <th>Status</th>
        <th>Amal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r,idx) in requests" :key="r.id">
        <td>{{ idx+1 }}</td>
        <td>{{ r.fish }}</td>
        <td>{{ r.phone }}</td>
        <td>{{ currency(r.sum) }}</td>
        <td><app-status :type="r.status"></app-status></td>
        <td>
          <router-link v-slot="navigate" :to="{name:'Request', params: {id:r.id} }">
            <button class="btn" @click="navigate">O'zgartirish</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from "@/utils/currency";
import appStatus from "@/components/ui/AppStatus";
export default {
  props:['requests'],
  setup(){
    return {
      currency
    }
  },
  components:{
    appStatus
  }

}
</script>

<style scoped>

</style>