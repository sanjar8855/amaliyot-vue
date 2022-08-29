<template>
  <teleport to="body">
    <AppModal title="Qo`shish" v-if="modal" @close="modal=false">
      <request-form @created="modal=false"></request-form>
    </AppModal>
  </teleport>

  <app-loader v-if="loading"></app-loader>
  <app-page title="Arizalar ro'yxati" v-else>
    <template #header>
      <button class="btn primary" @click="modal=true">Ariza qo'shish</button>
    </template>
    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>
  </app-page>
</template>

<script>
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import AppModal from "@/components/ui/AppModal";
import AppLoader from "@/components/ui/AppLoader";
import RequestTable from "@/components/request/RequestTable";
import RequestForm from "@/components/request/RequestForm";
import RequestFilter from "@/components/request/RequestFilter";
import {ref, computed, onMounted} from 'vue'
export default {
  setup(){
    const loading = ref(false)
    const modal = ref(false)
    const store = useStore()
    const filter = ref({})
    const requests = computed(() => store.getters['request/requests']
      .filter(request=>{
        if(filter.value.name){
          return request.fish.includes(filter.value.name)
        }
        return request
      })
      .filter(request=>{
        if(filter.value.status){
          return request.status == filter.value.status
        }
        return request
      })
    )
    onMounted(async ()=>{
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    return {
      modal,
      requests,
      loading,
      filter
    }
  },
  components:{
    AppPage,
    RequestTable,
    AppModal,
    RequestForm,
    AppLoader,
    RequestFilter
  }
}
</script>
