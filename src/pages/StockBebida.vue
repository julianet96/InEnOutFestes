<template>
  
    <div class="q-pa-md ">

      <q-table
      title="Stock Bebidas"
      :data="Bebidas"
      :columns="columns"
      row-key="Id"
      dark
      color="amber"
      :rows-per-page-options="[0]"
      :hide-pagination="true"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Nombre" :props="props">
            {{ props.row.Nombre }}
          </q-td>
          <q-td key="Precio" :props="props">
            {{ props.row.Precio }} €
          </q-td>
          <q-td key="Type" :props="props">
            {{ props.row.Type }}
          </q-td>
          <q-td key="Stock" :props="props">
              <q-toggle v-model="props.row.Stock" @input="ConfirmarCambioStok(props.row)" color="green"></q-toggle>
          </q-td>
        </q-tr>
      </template>

    
      </q-table>
    

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Cuidado</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Vas a modificar el Stock estas seguro?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn glossy @click="CambiarStock()" label="Si" color="primary" v-close-popup></q-btn>
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
    return{
      name: 'PageIndex',
      alert:false,
      columns:[
        {
          name: 'Nombre',
          label: 'Nombre',
          align: 'center'
        },
        {
          name: 'Precio',
          label: 'Precio',
          align: 'center'
        },
        {
          name: 'Type',
          label: 'Tipo',
          align: 'center'
        },
        {
          name: 'Stock',
          label: 'Stock',
          align: 'center'
        }
      ],
      Bebidas:[],
      BebidaModificada:{}
    }
  },
  methods:{
    async getTodasBebidas() {
      this.$axios
      .get(globalvars.RestURL +"/getTodasBebidas")
      .then(res =>{
        console.log(res.data.recordset)
        this.Bebidas = res.data.recordset
      })
      .catch(err => {
        console.log(err)
      })
    },
    ConfirmarCambioStok(props) {
        console.log(props)
      this.BebidaModificada = props
      this.alert = true;
    },
    CambiarStock(){

        let stock = 0;
        if(this.BebidaModificada.Stock){
            stock = 1
        }

      this.$axios
          .post(globalvars.RestURL+"/UpdateStockBebida",{
            Stock:stock,
            Id:this.BebidaModificada.Id
          })
          .then(res => {
            console.log(res)
            this.getTodasBebidas();
          })
          .catch(err => {
            console.log(err)
          })
    }
    
  },
  created (){
    this.getTodasBebidas();
  }
  
}
</script>