const  ERROR_CODES = {
    'EMAIL_NOT_FOUND' : 'POCHTA TOPILMADI',
    'INVALID_PASSWORD' : 'PAROL XATO',
    'auth': 'ILTIMOS TIZIMGA KIRING',
    'Network Error' : 'Internetda XATOLIK!'
}


export function error(CODE){
    return ERROR_CODES[CODE] ? ERROR_CODES[CODE] : 'Nomalum xatolik'
}