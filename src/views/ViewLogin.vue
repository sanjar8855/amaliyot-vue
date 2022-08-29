<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Tizimga kirish</h1>
    <div :class="['form-control',{invalid:eError}]">
      <label for="email" class="label">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control',{invalid:pError}]">
      <label for="password" class="label">Password</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || urinishSoni">Kirish</button>
    <button class="btn" @click.prevent="test">Google orqali Kirish</button>
    <div class="text-danger" v-if="urinishSoni">Tizimga kirish urinishlar soni ko'p</div>
  </form>
</template>

<script>
import {useLoginForm} from "@/use/login-form";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {error} from "@/utils/error";
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
export default {
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    if(route.query.message=='auth'){
      store.dispatch('setMessage',{
        type:'warning',
        value:error(route.query.message)
      })
    }

    const firebaseConfig = {
      apiKey: "AIzaSyDArPoB6Bm_LoOTi9ycr6q-6lfCmsViSb4",
      authDomain: "web21-15-amaliyot.firebaseapp.com",
      databaseURL: "https://web21-15-amaliyot-default-rtdb.firebaseio.com",
      projectId: "web21-15-amaliyot",
      storageBucket: "web21-15-amaliyot.appspot.com",
      messagingSenderId: "349216380687",
      appId: "1:349216380687:web:0c854e44ebe8f2875d907a"
    };

    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const test = async () =>{
      const auth = getAuth();
      signInWithPopup(auth, provider).then(function(result) {
        const token = result.user.accessToken;
        store.commit('auth/setToken', token)
        router.push('/')
      });
    }

    return{
      ...useLoginForm(),
      test,
      app
    }
  }
}
</script>
