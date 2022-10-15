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
    }"
    >

    <a-table :columns="columns" :data-source="constancias">
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
            {{ record.constancia}}
          </a>
        </template>
        
        <template v-if="column.dataIndex === 'id'">
    <a-button  type="primary" ghost @click="setConstanciaEdit(record.id)">Editar</a-button>
    <a-button danger  @click="deleteConstancia(record.id)">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
     

    
    <a-drawer
      title="Modulo de Editar Constancia"
      placement="right"
      :visible="formVisible"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onClose"
    >
      <p > Usuario</p>
      <a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="saveEdited"
        aria-autocomplete="off"
			>
				<a-form-item class="mb-10">
					<a-input
						v-model:value="constanciaEdit.constancia"
						placeholder="userName" />
					
				</a-form-item>
				<p>Selección de cliente</p>
        <a-form-item>
          <a-select
            v-model:value="constanciaEdit.clienteId"
            show-search
            placeholder="Cliente"
            style="width: 100%"
            :options="clientesSelect"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
  ></a-select>
        </a-form-item>
				
				<a-form-item class="mb-10">
				
					
				</a-form-item>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Guardar Cambios
					</a-button>
				</a-form-item>
			</a-form>
    </a-drawer>

    <a-drawer
      title="Modulo de Crear Constancia"
      placement="right"
      :visible="formVisibleNew"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onCloseNewF"
    >
      <p > Constancia</p>
      <a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="saveConstancia"
        aria-autocomplete="off"
			>
				<a-form-item class="mb-10">
					<a-input
						v-model:value="newConstancia.nombre"
						placeholder="constancia" />
					
				</a-form-item>
        <p>Selección de cliente</p>
        <a-form-item>
          <a-select
            v-model:value="newConstancia.clienteId"
            show-search
            placeholder="selecciona el cliente"
            style="width: 100%"
            :options="clientesSelect"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
  ></a-select>
        </a-form-item>
				
	
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Guardar Nueva Constancia
					</a-button>
				</a-form-item>
			</a-form>
    </a-drawer>


  </div>
  <!--Button for Create New  USer-->
  <div class="new-user">
    <a-button type="primary" shape="circle" size="large" @click="setConstanciaNew">
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
import {useConstanciasStore,useClientesStore} from '@/stores'
const constanciasStore = useConstanciasStore()
const clientesStore=useClientesStore();

const {clientesSelect}=storeToRefs(useClientesStore())

const {newConstancia,constancias,constanciaEdit,formVisible,onCloseFormE,formVisibleNew}=storeToRefs(useConstanciasStore())
const {setConstanciaEdit,deleteConstancia,saveEdited,setConstanciaNew,saveConstancia,onCloseNewF}=useConstanciasStore()

const schema=Yup.object().shape({
  nombre:Yup.string().required('No puede ir el usuario vacio'),
  clienteId:Yup.number().required('El rol es requrido '),
})   
    
const columns = [{
    name: 'Cliente',
    title:'Cliente',
    dataIndex: 'cliente',
    
  },{
    name: 'dpi',
    title:'DPI',
    dataIndex: 'dpi',
    
  }, {
    name: 'nit',
    title:'NIT',
    dataIndex: 'nit',
    
  }, {
    name: 'constancia',
    title:'Nombre del Negocio',
    dataIndex: 'constancia',
    
  },  {
    title: 'Acciòn',
    dataIndex:'id'
  }];


    const handleChange = value => {
      console.log(`selected ${value}`);
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
  constanciasStore.getAll()
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
