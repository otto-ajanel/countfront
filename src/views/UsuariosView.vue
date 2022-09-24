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
    <a-button  type="primary" ghost @click="showModalEditar(record.id)">Editar</a-button>
    <a-button danger  @click="eliminarUser(record.id)">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
     <input  
     v-model="userEdit.username"
     type="text">
    
    <a-drawer
      title="Editar Usuario"
      placement="right"
      :visible="visible"
      :get-container="false"
      :style="{
        position: 'absolute'
    }"
      :width="550"
      @close="onClose"
    >
      <p > Usuario</p>
      <Form @submit="saveEdit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label class="label-login">Username</label>
                <Field v-model="userEdit.username" name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
            </div> 
            <div class="form-group">
              <Field name="field" as="select">
                <option>Coffee</option>
                <option>Tea</option>
                <option>Coke</option>
              </Field>      
            </div>            
            <div class="form-group">
                <label class="label-login">Contraseña </label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Guardar Cambios
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
        
    </a-drawer>

</div>
  </div>

  

  </template>
  <script  setup>
    
import { defineComponent,reactive } from 'vue';
import {Form,Field} from 'vee-validate'
import * as Yup from 'yup'
import { SmileOutlined, DownOutlined,UserOutlined, InfoCircleOutlined, CloseSquareFilled } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { mapState, storeToRefs } from 'pinia';
import { useUsersStore } from '../stores';
import axios from 'axios';
import {useAuthStore} from '@/stores'

const schema=Yup.object().shape({
  username:Yup.string().required('No puede ir el usuario vacio'),
  rol:Yup.number().required('El rol es requrido '),
  password:Yup.string().required("Asegure con proteccion")
})


const authStore = useAuthStore();

 const usersStore=useUsersStore()

 usersStore.getAll()

   const userToEdit=ref({
      idEdit:null,
      username:"",
      rol:0,
      password:""
   })
 const {users}= storeToRefs(useUsersStore())
 const {userEdit}= storeToRefs(useUsersStore())
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

  const visible = ref(false);
  
    const showModalEditar = (id) => {
      usersStore.getUserById(id)

      visible.value=true;
     


    };

    const handleOk = () => {
      console.log("butoton ok ")

      visible.value = false;
    };
    
    const eliminarUser=(id)=>{
       console.log(id)
    }
    
   
    

const afterVisibleChange = bool => {
  console.log('visible', bool);
};



const onClose = () => {
  visible.value = false;
};
 const saveEdit=(values,{setErrores})=>{
  const authStore = useAuthStore();
  const {username,password,rol} = values;

  console.log("guardar  cambios ")
 }

  </script>
