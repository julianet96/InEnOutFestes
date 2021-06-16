<template>
  
    <div class="q-pa-md">
      <div class="q-pa-md q-gutter-sm">
        <q-btn round color="primary" @click="AddUserModal()" icon="add" size="md"></q-btn>
      </div>
      <q-table
      title="Usuarios"
      :data="data"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
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
                <q-btn flat color="white" @click="EditUserModal(props.row)" icon="edit" />
                <q-btn flat color="white" @click="DeleteUserModal(props.row)" icon="delete" />
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
                    <q-select 
                      outlined 
                      v-model="type" 
                      emit-value 
                      
                      :options="typeOptions" 
                      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
                      :option-label="opt => Object(opt) === opt && 'label' in opt ? opt.label : '- Null -'"
                      map-options
                      label="Tipo"></q-select>
                    <q-input v-show="editPass" outlined v-model="password" label="Password" :type="isPassHidden ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPassHidden ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassHidden = !isPassHidden"
                            />
                        </template>
                    </q-input>
                  </div> 
                  
                </q-card-section>
                <div class="q-gutter-md row items-start">
                <q-card-actions align="center">
                  <q-btn v-show="!editPass" @click="editPass=true" outline label="Cambiar Contraseña" class="q-ml-md"/>
                </q-card-actions>
                <q-card-actions>
                  <q-btn-group >
                    <q-btn outline label="Guardar" @click="insertCreate()"  v-close-popup/>
                    <q-btn outline color="" @click="editPass=false" label="Cancelar" v-close-popup/>
                  </q-btn-group>
                </q-card-actions>
                </div>
              </q-card>
            </q-dialog>

            <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Eliminar Usuario</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Estas seguro que deseas Elimminar este usuario
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy @click="deleteUser()" label="Si" color="primary" v-close-popup></q-btn>
          <q-btn glossy label="No" color="deep-orange" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>


    </div>
</template>

<script>
import globalvars from "../boot/globalvars.js";
export default {
  data () {
    return {
      alert:false,
      editId:'',
      isPassHidden: true,
      nombre:'',
      username:'',
      password:null,
      type:1,
      data:[],
      columns:[{name: 'Nombre', align: 'center', label: 'Nombre', field: 'Nombre', sortable: true},
        {name: 'UserName', align: 'center', label: 'Username', field: 'UserName', sortable: true},
        {name: 'TypeName', align: 'center', label: 'Tipo', field: 'Type', sortable: true},
        { name:'acciones', align:'center', label:'Actions', field:'acciones'}
      ],
      editCreate:false,
      EditOCreateText:"",
      editPass:false,
      InsertOrCreate:false,
      typeOptions:[
        {
          label:"Admin",
          value:1
        },
        {
          label:"Camarero",
          value:2
        },
        {
          label:"Cocina",
          value:3
        },
        {
          label:"Barra",
          value:4
        }
      ]
      
      
    }
  },
  methods:{
    async GetUsers(){
      this.data = []
      await this.$axios
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
            let result = res
            this.password = null;
            this.GetUsers()
          })
          .catch(err => {
            console.log(err)
          })
      
    },
    async DeleteUserModal(props){
      this.editId = props.Id
      this.type = props.Type
      this.alert=true;
    },
    GetTypeName(type){
      switch(type){
        case 1:
          return "Admin"
        case 2:
          return "Camarero"
        case 3:
          return "Cocina"
        case 4:
          return "Barra"
      }

      

    },
    EditUserModal(props){
      console.log(props)
      this.EditOCreateText = "EDITAR USUARIO"
      this.nombre = props.Nombre
      this.username = props.UserName
      this.type = props.Type
      this.editId = props.Id
      this.editPass=false;
      this.editCreate = true
      this.InsertOrCreate = false
      this.isPassHidden = true
    },
    AddUserModal(){
      this.editCreate = true
      this.editPass=true
      this.InsertOrCreate = true;
      this.isPassHidden = true
    },
    async insertCreate() {
      if(this.InsertOrCreate){
        await this.CreateUser()
      }
      else{
        await this.EditUser()
      }
      
    },
    async EditUser(){
      console.log(this.type)
      console.log(this.password)

      this.$axios
          .post(globalvars.RestURL+"/updateUser",{
            name:this.nombre,
            username:this.username,
            password:this.password,
            type:this.type,
            id:this.editId
          })
          .then(res => {
            let result = res
            this.password = null;
            this.GetUsers()
          })
          .catch(err => {
            console.log(err)
          })
    },
    async deleteUser(){
      this.$axios
          .post(globalvars.RestURL+"/deleteUser",{
            id:this.editId,
            type:this.type
          })
          .then(res => {
            let result = res
            this.password = null;
            this.GetUsers()
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
