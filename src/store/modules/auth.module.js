import axios from "axios";
import {error} from "@/utils/error";

export default {
    namespaced:true,
    state(){
        return{
            token:localStorage.getItem('jwt-token')
        }
    },
    mutations:{
        setToken(state,token){
            state.token = token
            localStorage.setItem('jwt-token',token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem('jwt-token')
        }
    },
    actions:{
        async login({commit,dispatch},payload){
            // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
            try{
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url,{...payload, returnSecureToken:true})
                commit('setToken', data.idToken)
                commit('clearMessage',null,{root:true})
            }
            catch (e){
                dispatch('setMessage',{
                    type:'danger',
                    value:error(e.response.data.error.message)
                }, {root: true})
            }
        }
    },
    getters:{
        token(state){
            return state.token
        },
        isAuth(_,getters){
            return !!getters.token
        }
    }
}