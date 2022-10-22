<template>
<div class="main-content"
    :style="{
      overflow: 'hidden',
      position: 'absolute',
      border: '1px solid #ebedf0',
      borderRadius: '23px',
      padding: '48px',
      textAlign: 'center',
      background: '#fafafa',
      width: '100%',
      minHeight:'550px',

    }"
    >

    <a-table :columns="columns" :data-source="controlPagos">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <a>
            {{ record.totalPago}}
          </a>
        </template>
        
        <template v-if="column.dataIndex === 'id'">
        <a-button danger  @click="deleteControlPago(record.id)">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
     

    
  

    <a-drawer
      title="Realizacion de Pago de servicio"
      placement="right"
      :visible="formVisibleNew"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onCloseNewF"
    >
      <p></p>
      <a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="saveControlPago"
        aria-autocomplete="off"
			>
	
        <p>DPI del Cliente</p>
        <a-form-item>
          <a-select
            v-model:value="newControlPago.clienteId"
            show-search

            placeholder="selecciona el cliente por medio DPI"
            style="width: 100%"
            :options="clientesSelect"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            >
          </a-select>
        </a-form-item>
        <p>Servicio Prestado</p>
        <a-form-item>
          <a-select
            v-model:value="newControlPago.servicioId"
            show-search
            placeholder="seleccione el servicio prestado"
            style="width: 100%"
            :options="serviciosSelect"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            >
          </a-select>
        </a-form-item>
				<p>Total a Pagar:</p>
        <p v-text="price"></p>
	
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Realizar Pago
					</a-button>
				</a-form-item>
			</a-form>
    </a-drawer>


  </div>
  <!--Button for Create New  USer-->
  <div class="new-user">
    <a-button type="primary" shape="circle" size="large" @click="setControlPagoNew">
      <template #icon>
      <plus-outlined 
      :style="{  fontSize:'30px',color: '#ffff'}" 
    />
      </template>
    </a-button>
  </div>
  
</div>
</template>

<script setup>
  
import { storeToRefs } from 'pinia';
import { ref,computed, onMounted } from 'vue';
import {Form,Field} from 'vee-validate'
import * as Yup from 'yup'
import {PlusOutlined, SmileOutlined, DownOutlined,UserOutlined, InfoCircleOutlined, CloseSquareFilled } from '@ant-design/icons-vue';
import axios from 'axios';
import {useControlPagosStore,useClientesStore} from '@/stores'
const controlPagosStore = useControlPagosStore()
const clientesStore=useClientesStore();

const {clientesSelect}=storeToRefs(useClientesStore())

const {newControlPago,price,controlPagos,controlPagoEdit,formVisible,onCloseFormE,formVisibleNew}=storeToRefs(useControlPagosStore())
const {setControlPagoEdit,deleteControlPago,saveEdited,setControlPagoNew,saveControlPago,onCloseNewF}=useControlPagosStore()

const schema=Yup.object().shape({
  nombre:Yup.string().required('No puede ir el usuario vacio'),
  clienteId:Yup.number().required('El rol es requrido '),
})   
    
const columns = [{
    name: 'Cliente',
    title:'Cliente',
    dataIndex: 'nombre',
    
  }, {
    name: 'nit',
    title:'NIT',
    dataIndex: 'nit',
    
  }, {
    name: 'servicio',
    title:'Servicio',
    dataIndex: 'servicio',
    
  },{
    name:'totalPago',
    title:'Pago Total',
    dataIndex:'totalPago'
  }
  
  ,  {
    title: 'Acciòn',
    dataIndex:'id'
  }];
const serviciosSelect=[
  {
    value: 1,
    label: 'Atualización',
    price:50
  },
  {
    value: 2,
    label: 'Honorarios',
    price:50
  },
  {
    value: 3,
    label: 'Contancia',
    price:50
  },
  {
    value: 4,
    label: 'Inscripción',
    price:300
  }
]
 
    const handleChange = value => {

       let  selectService= serviciosSelect.find((select)=>select.value==value )
       price.value= selectService.price
       console.log(selectService)
    };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
    };

  const visible = ref(false);

  
  const handleOk = () => {
    console.log("butoton ok ")
    
    visible.value = false;
  };
  
  const onFinish = values => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  const disabled = computed(() => {
    return !(formState.nombre&& formState.clienteId);
  });
  
  const onClose = () => {
    constanciasStore.onCloseFormE()
  };


  
 onMounted(()=>{
  controlPagosStore.getAll()
  clientesStore.getAll()
 })


</script>
<style>
  .new-user{
    
    position: absolute;
    top: 5px;
    right: 2px;
    border-radius: 3px;
    border: none !important;
  }
  
</style>
