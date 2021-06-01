<template>
  
    <div class="q-pa-md">
      <q-table
      title="Usuarios"
      :data="data"
      :columns="columns"
      row-key="name"
      :hide-pagination="true"
      rows-per-page-options="[0]"
    ></q-table>

    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
     nombre:'',
     username:'',
     password:'',
     type:'',
     data:[],
     columns:[{name: 'Nombre', align: 'center', label: 'Nombre', field: 'Nombre', sortable: true},
     {name: 'UserName', align: 'center', label: 'Username', field: 'UserName', sortable: true},
     {name: 'Type', align: 'center', label: 'Tipo', field: 'Type', sortable: true}
     ]

      
      
    }
  },
  methods:{
    async GetUsers(){
      
      this.$axios
        .get(globalvars.RestURL+"/getUsers")
        .then(res => {
          let result = res.data.recordset
          this.data = result
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })

    },
    async CreateUser(){
      
      this.$axios
          .post(globalvars.RestURL+"/addUser",{
            name:this.nombre,
            username:this.username,
            password:this.password,
            type:this.type
          })
          .then(res => {
            let result = res.data.recordset[0].Id
            this.sumarTotal(this.BebidaSelec.Precio)
            this.LimpiarVariables()
          })
          .catch(err => {
            console.log(err)
          })
      
    }
  },
  created(){
    this.GetUsers()
  }
}
</script>
