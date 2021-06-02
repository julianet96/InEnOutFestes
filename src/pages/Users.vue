<template>
  
    <div class="q-pa-md">
      <div class="q-pa-md q-gutter-sm">
        <q-btn round color="primary" icon="add" size="md"></q-btn>
      </div>
      <q-table
      title="Usuarios"
      :data="data"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      :hide-pagination="true"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Nombre" :props="props">
              {{props.row.Nombre}}
            </q-td>
            <q-td key="UserName" :props="props">
              {{props.row.UserName}}
            </q-td>
            <q-td key="TypeName" :props="props">
              {{props.row.TypeName}}
            </q-td>
            <q-td key="acciones" :props="props">
              <q-btn-group>
                <q-btn flat color="dark" @click="EditUserModal(props.row)" icon="edit" />
                <q-btn flat color="dark" @click="DeleteUserModal(props.row.Id)" icon="delete" />
              </q-btn-group>
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-dialog v-model="editCreate" persistent>
              <q-card class="q-pa-md">
                <q-card-section>
                  <div class="text-h6">{{EditOCreateText}}</div>
                </q-card-section>
                <q-card-section class="q-pt-none"> 
                  <div class="q-gutter-md row items-start">
                    <q-input outlined v-model="nombre" label="Nombre" />
                    <q-input outlined v-model="username" label="UserName" />
                  </div> 
                  
                </q-card-section>
                <div class="q-gutter-md row items-start">
                <q-card-actions align="center">
                  <q-btn @click="editPass=true" outline label="Cambiar Contraseña" class="q-ml-md"/>
                </q-card-actions>
                <q-card-actions>
                  <q-btn-group >
                    <q-btn outline label="Guardar"  v-close-popup/>
                    <q-btn outline color="" label="Cancelar" v-close-popup/>
                  </q-btn-group>
                </q-card-actions>
                </div>
              </q-card>
            </q-dialog>


    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      editId:'',
      nombre:'',
      username:'',
      password:'',
      type:'',
      data:[],
      columns:[{name: 'Nombre', align: 'center', label: 'Nombre', field: 'Nombre', sortable: true},
        {name: 'UserName', align: 'center', label: 'Username', field: 'UserName', sortable: true},
        {name: 'TypeName', align: 'center', label: 'Tipo', field: 'Type', sortable: true},
        { name:'acciones', align:'center', label:'Actions', field:'acciones'}
      ],
      editCreate:true,
      EditOCreateText:""

      
      
    }
  },
  methods:{
    async GetUsers(){
      
      this.$axios
        .get(globalvars.RestURL+"/getUsers")
        .then(res => {
          let result = res.data.recordset

          result.forEach(element => {
            this.data.push({
              Id:element.Id,
              Nombre:element.Nombre,
              Type:element.Type,
              UserName:element.UserName,
              TypeName:this.GetTypeName(element.Type)
            })
          });

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
      
    },
    async DeleteUserModal(id){

    },
    GetTypeName(type){
      switch(type){
        case 1:
          return "Admin"
      }

    },
    EditUserModal(props){
      this.EditOCreateText = "EDITAR USUARIO"
      this.nombre = props.Nombre
      this.username = props.UserName
      this.type = props.Type
      this.editId = props.Id
    }

  },
  created(){
    this.GetUsers()
  }
}
</script>
