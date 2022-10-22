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
      minHeight:'600px'
    }"
    >

    <a-table :columns="columns" :data-source="facturas">
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
    <a-button  type="primary" ghost @click="setFacturaEdit(record.id)">ver DPI</a-button>
    <a-button danger  @click="deleteFactura(record.id)">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
     

    
    <a-drawer
      title="Modulo de visualizar imagen "
      placement="right"
      :visible="formVisible"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="750"
      @close="onClose"
    >
    <a-image
    :width="400"
  :src="facturaEdit.dpiUrl"
  />
    </a-drawer>

    <a-drawer
      title="Modulo de Registro  de facturas"
      placement="right"
      :visible="formVisibleNew"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onCloseNewF"
    >
      <p>Factura</p>
      <a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="saveFactura"
        aria-autocomplete="off"
			>
				<a-form-item class="mb-10">
					<a-input
						v-model:value="newFactura.noNiss"
						placeholder="Numero de Niss" />
					
				</a-form-item>
        
        <p>Selección de cliente</p>
        <a-form-item>
          <a-select
            v-model:value="newFactura.clienteId"
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
                  <a-select
          v-model:value="newFactura.idEstadoFactura"
          show-search
          placeholder="Selecciona el estado de la Factura"
          style="width: 100%"
          :options="options"
          :filter-option="filterOption"
        
        ></a-select>
      </a-form-item>
				<a-form-item class="mb-12">

          
          <a-space direction="horizontal" :size="12">
            
            <p>Vencimiento del R.T.U.</p>
            <a-date-picker v-model:value="newFactura.fechaVenRtu" 
            placeholder="Fecha"
            />
          </a-space>

          
          <a-space direction="horizontal" :size="12">
            
            <p>Vencimiento de factura</p>
            <a-date-picker v-model:value="newFactura.fechaVenFactura" 
            placeholder="Fecha"
            />
          </a-space>
              </a-form-item>
              <div>
            <a-upload
            v-model="fileList"
            action="http://localhost:8080/api/uploadFactura"
            list-type="picture"
            @change="handleChangeUpLoad"

          >
            <a-button>
              <upload-outlined></upload-outlined>
              Subir Imagen
            </a-button>
          </a-upload>
          <br />

        </div>
				
	
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Guardar Nueva Factura
					</a-button>
				</a-form-item>
			</a-form>
    </a-drawer>


  </div>
  <!--Button for Create New  USer-->
  <div class="new-user">
    <a-button type="primary" shape="circle" size="large" @click="setFacturaNew">
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
  import {PlusOutlined, SmileOutlined, DownOutlined,UserOutlined, InfoCircleOutlined, CloseSquareFilled,UploadOutlined  } from '@ant-design/icons-vue';
  import axios from 'axios';
  import {useFacturasStore,useClientesStore} from '@/stores'
  const facturasStore = useFacturasStore()
const clientesStore=useClientesStore();

const {clientesSelect}=storeToRefs(useClientesStore())

const {newFactura,facturas,facturaEdit,formVisible,onCloseFormE,formVisibleNew}=storeToRefs(useFacturasStore())
const {setFacturaEdit,deleteFactura,saveEdited,setFacturaNew,saveFactura,onCloseNewF}=useFacturasStore()

const schema=Yup.object().shape({
  nombre:Yup.string().required('No puede ir el usuario vacio'),
  clienteId:Yup.number().required('El rol es requrido '),
})   


/*
para el estado de la factura 
*/
const options = ref([{
      value: 1,
      label: 'Impreso',
    }, {
      value: 2,
      label: 'Digital',
    }]);

const fileList = ref(null); 


const columns = [{
    
   
    name: 'dpi',
    title:'DPI',
    dataIndex: 'dpi',
    
  }, {
    name: 'fechaVenFacturra',
    title:'Fecha nacimiento de factura',
    dataIndex: 'fechaVenFactura',
    
  }
  , {
    name: 'fechaVenRtu',
    title:'Fecha nacimiento de RTU',
    dataIndex: 'fechaVenRtu',
    
  },
  {
    name: 'fechaNaciemineto',
    title:'Fecha de Nacimiento',
    dataIndex: 'fechaNacimiento',
    
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
    facturasStore.onCloseFormE()
  };

const handleChangeUpLoad =(info)=>{

  if (info.file.status=="done") {
    
    console.log(info.file.response)
    facturasStore.setDpiUrl(info.file.response)
  }

}

  
 onMounted(()=>{
  facturasStore.getAll()
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
  .upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
  float: right;
}
  
</style>
