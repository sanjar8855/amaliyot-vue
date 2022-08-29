<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Arizani ko'rish" v-else-if="request" back>
    <p> <strong>FISH</strong>: {{request.fish}}</p>
    <p><strong>Telefon raqami </strong>: {{request.phone}}</p>
    <p><strong>Summasi</strong>: {{ currency(request.sum) }}</p>
    <p><strong>Status</strong>: <app-status :type="request.status"></app-status></p>
    <div :class="['form-control']">
      <label for="status" class="label">Status</label>
      <select v-model="status">
        <option value="done">Bajarildi</option>
        <option value="cancelled">Qaytarildi</option>
        <option value="active">Tasdiqlanmoqda</option>
        <option value="sending">Yuborilmoqda</option>
      </select>
    </div>
    <button class="btn danger" @click="remove">O'chirish</button>
    <button class="btn primary" @click="update" v-if="hasChanges">O'zgartirish</button>
  </app-page>
  <h3 class="text-center danger"> Bunday ma'lumot bazadan topilmadi</h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {currency} from "@/utils/currency";
import {ref, onMounted, computed} from "vue";

export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(false)
    const request = ref({})
    const status = ref('')
    onMounted(async ()=>{
      loading.value=true
      request.value = await store.dispatch('request/loadById',route.params.id)
      status.value = request.value.status
      //
      loading.value=false
    })
    const hasChanges = computed( ()=>{
      return request.value.status!==status.value
    })

    const remove = async ()=>{
      await store.dispatch('request/removeById',route.params.id)
      router.push('/')
    }
    const update = async ()=>{
      const data = {...request.value, id:route.params.id,status:status.value}
      await store.dispatch('request/updateById',data)
      request.value.status = status.value
    }


    return {
      loading,
      request,
      status,
      hasChanges,
      currency,
      remove,
      update
    }
  },
  components:{
    AppPage,
    AppLoader,
    AppStatus
  }
}
</script>
