const formatter = new Intl.NumberFormat('uz-UZ',{style:'currency', currency:'UZS'})
// const formatter = new Intl.NumberFormat('ru-RU',{style:'currency', currency:'RUB'})
// const formatter = new Intl.NumberFormat('us-US',{style:'currency', currency:'USD'})

export function currency(value){
    return formatter.format(value)
}
