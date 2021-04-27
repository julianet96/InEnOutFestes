<template>
  
    <div class="q-pa-md row items-start q-gutter-md flex flex-center">


    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      name: 'PageIndex',
      mesa:0
      
    }
  },
  methods:{
    
  },
  created(){
    this.mesa = this.$router.currentRoute.query.mesa
  }
}
</script>