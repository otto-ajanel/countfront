<template>
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
    <a-button danger  @click="eliminar">Eliminar</a-button>
          
        </template>
      </template>
      
      
    </a-table>
    <div>
    
    <a-modal v-model:visible="visible" title="Editar Informacion del Ususario" @ok="handleOk">
      <div class="components-input-demo-presuffix">
    <a-input v-model:value="userName" placeholder="usuario">
      <template #prefix>
        <user-outlined type="user" />
      </template>
      <template #suffix>
        <a-tooltip title="Ingrese informacion que lo identifique">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
    <br />
    <br />

    <a-input-group compact>
      <a-select v-model:value="value17" style="width: 100%" placeholder="Permiso de  Usuario">
        <a-select-option value="1">Administrador</a-select-option>
        <a-select-option value="2">Contador</a-select-option>
      </a-select>
      
    </a-input-group>
    <br />
    <a-input-password v-model:value="value" placeholder="Ingrese la Contraseña" />
  </div>
    </a-modal>
  </div>

  </template>
  <script  setup>
    
   import { defineComponent } from 'vue';

  import { SmileOutlined, DownOutlined,UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from '../stores';
  
 const usersStore=useUsersStore()
 usersStore.getAll()
 const {users}= storeToRefs(useUsersStore())
  
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
      console.log(id)

      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    

    
      

  </script>