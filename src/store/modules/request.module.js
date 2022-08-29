import axios from '../../axios/request'
import store from '../index'
// import {error} from "@/utils/error";

export default {
    namespaced:true,
    state(){
        return {
            requests:[]
        }
    },
    mutations:{
        setRequests(state,requests){
            state.requests = requests
        },
        addRequest(state,request){
            state.requests.push(request)
        }
    },
    actions:{
        async create({commit,dispatch},payload){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/requests.json?auth=${token}`,payload)
                commit('addRequest',{...payload,id:data.name})
                // console.log(data)
                dispatch('setMessage',{
                    type:'primary',
                    value:'Muvaffaqiyatli qo`shildi!'
                }, {root: true})
            }
            catch (e) {
                dispatch('setMessage',{
                    type:'danger',
                    value:e.message
                }, {root: true})
            }
        },
        async load({commit,dispatch}){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`)
                const requests  = Object.keys(data).map(id=>({...data[id], id}))
                commit('setRequests',requests)
            }
            catch (e) {
                // console.log(e.response.data.error.message)
                dispatch('setMessage',{
                    type:'danger',
                    value:e.message
                }, {root: true})
            }
        },
        async loadById({dispatch},id){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
                return data
            }
            catch (e) {
                dispatch('setMessage',{
                    type:'danger',
                    value:e.message
                }, {root: true})
            }
        },
        async removeById({dispatch},id){
            try{
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                dispatch('setMessage',{
                    type:'primary',
                    value:'Muvaffaqiyatli o`chirildi!'
                }, {root: true})
            }
            catch (e) {
                dispatch('setMessage',{
                    type:'danger',
                    value:e.message
                }, {root: true})
            }
        },
        async updateById({dispatch},request){
            try{
                const token = store.getters['auth/token']
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage',{
                    type:'primary',
                    value:'Muvaffaqiyatli o`zgartirildi!'
                }, {root: true})
            }
            catch (e) {
                dispatch('setMessage',{
                    type:'danger',
                    value:e.message
                }, {root: true})
            }
        },
    },
    getters:{
        requests(state){
            return state.requests
        }
    }
}