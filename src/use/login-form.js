import {useField,useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed,watch} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm(){
    const store = useStore()
    const router = useRouter()
    const {handleSubmit,isSubmitting,submitCount} = useForm()
    const {value:email,errorMessage:eError, handleBlur:eBlur} = useField('email', yup
        .string()
        .trim()
        .required('Login kiritilishi shart')
        .email('Emailni to`g`ri kiriting')
    )
    const {value:password,errorMessage:pError, handleBlur:pBlur} = useField('password', yup
        .string()
        .trim()
        .required('Parol kiritilishi shart')
        .min(6,'Parolda kamida 6 ta element bo`lishi shart')
    )
    const onSubmit = handleSubmit(async values => {
        try{
            await store.dispatch('auth/login',values)
            router.push('/')
        }
        catch (e) {
            console.log(e)
        }
    })
    const urinishSoni = computed(()=>submitCount.value>=3)
    watch(urinishSoni,(val) =>{
        if(val){
            setTimeout(()=>{submitCount.value = 0},3000)
        }
    })
    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        urinishSoni
    }
}