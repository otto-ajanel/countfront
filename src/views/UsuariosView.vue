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

    <a-table :columns="columns" :data-source="users">
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
            {{ record.username }}
          </a>
        </template>
        
        <template v-if="column.dataIndex === 'id'">
    <a-button  type="primary" ghost @click="setUserEdit(record.id)">Editar</a-button>
    <a-button danger  @click="deleteUser(record.id)">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
     

    
    <a-drawer
      title="Modulo de Editar Usuario"
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
				@submit="saveUser"
        aria-autocomplete="off"
			>
				<a-form-item class="mb-10">
					<a-input
						v-model:value="userEdit.username"
						placeholder="userName" />
					
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input v-model:value="userEdit.email"
						placeholder="Email"
					>
					</a-input>
				</a-form-item>
        <a-form-item>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Seleciona el rol de usuario"
            style="width: 100%"
            :options="options"
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
      title="Modulo de Crea Usuario"
      placement="right"
      :visible="formVisibleNew"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onCloseNewF"
    >
      <p > Usuario</p>
      <a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="saveUser"
        aria-autocomplete="off"
			>
				<a-form-item class="mb-10">
					<a-input
						v-model:value="newUser.username"
						placeholder="Nombre de Usuario" />
					
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input v-model:value="newUser.email"
						placeholder="Email"
					>
					</a-input>
				</a-form-item>
        <a-form-item>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Seleciona el rol de usuario"
            style="width: 100%"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
  ></a-select>
        </a-form-item>
				
				<a-form-item class="mb-10">
				
          <a-input-password v-model:value="newUser.password" placeholder="Contraseña" />

				</a-form-item>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Guardar Nuevo Usuario
					</a-button>
				</a-form-item>
			</a-form>
    </a-drawer>


  </div>
  <!--Button for Create New  USer-->
  <div class="new-user">
    <a-button type="primary" shape="circle" size="large" @click="setUserNew">
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
import {useAuthStore,useUsersStore} from '@/stores'
const usersStore = useUsersStore()
const {newUser,users,userEdit,formVisible,onCloseFormE,formVisibleNew}=storeToRefs(useUsersStore())
const {setUserEdit,deleteUser,saveEdited,setUserNew,saveUser,onCloseNewF}=useUsersStore()

const schema=Yup.object().shape({
  username:Yup.string().required('No puede ir el usuario vacio'),
  rol:Yup.number().required('El rol es requrido '),
  password:Yup.string().required("Asegure con proteccion")
})   
    
const columns = [{
    name: 'Name',
    title:'username',
    dataIndex: 'username',
    
  }, {
    name:'email',
    title: 'correo',
    
    dataIndex: 'email',
    
  }, {
    title: 'Acciòn',
    dataIndex:'id'
  }];
  const options = ref([{
      value: 1,
      label: 'Administrador',
    }, {
      value: 2,
      label: 'Contador',
    }])

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
    return !(formState.username && formState.password);
  });
  
  const onClose = () => {
    usersStore.onCloseFormE()
  };

  const saveEdit=(values,{setErrores})=>{

    const authStore = useAuthStore();
    const {username,password,rol} = values;
    
    console.log("guardar  cambios ")
  }
 
  
 onMounted(()=>{
  usersStore.getAll()
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
