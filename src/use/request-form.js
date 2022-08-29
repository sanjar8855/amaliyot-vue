import {useField,useForm} from 'vee-validate'
import * as yup from 'yup'
// import {computed,watch} from 'vue'
// import {useStore} from "vuex";
// import {useRouter} from "vue-router";

export function useRequestForm(fn){
    // const store = useStore()
    // const router = useRouter()
    const {handleSubmit,isSubmitting} = useForm({
        initialValues:{
            'status':'active'
        }
    })
    const {value:fish,errorMessage:fError, handleBlur:fBlur} = useField('fish', yup
        .string()
        .trim()
        .required('FISH kiritilishi shart')
        .min(4,'FISH kamida 4 ta elemnt bo`lishi shart')
    )
    const {value:phone,errorMessage:pError, handleBlur:pBlur} = useField('phone', yup
        .string()
        .trim()
        .required('Telefon kiritilishi shart')
        .min(9,'Telefonda kamida 9 ta element bo`lishi shart')
    )
    const {value:sum,errorMessage:sError, handleBlur:sBlur} = useField('sum', yup
        .number()
        .required('Summa kiritilishi shart')
        .min(999,'Summa kamida 1000 bo`lishi shart')
    )
    const {value:status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        fish,
        fError,
        fBlur,
        phone,
        pError,
        pBlur,
        sum,
        sError,
        sBlur,
        status,
        onSubmit,
        isSubmitting,
    }
}