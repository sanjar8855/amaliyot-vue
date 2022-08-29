<template>
  <app-page title="Yordam sahifasi" back>
    <app-question
        v-for="q in savollar"
        :key="q.title"
        :question="q"
    ></app-question>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppQuestion from "@/components/ui/AppQuestion";
export default {
  setup(){
    const savollar = [
      {title:'Savol1', value:'javob1'},
      {title:'Savol2', value:'javob2'},
      {title:'Savol3', value:'javob3'},
      {title:'Savol4', value:'javob4'}
    ]


    return {
      savollar
    }
  },
  components:{
    AppPage,
    AppQuestion
  }
}
</script>
