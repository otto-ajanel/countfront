<script setup> 
import { defineComponent } from 'vue';

import {Form,Field} from 'vee-validate'
import { storeToRefs } from 'pinia';

import * as Yup from 'yup'
import { UserOutlined,SmileOutlined} from '@ant-design/icons-vue';
import {useAuthStore} from '@/stores'


const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
const {modal: modal } = storeToRefs(authStore);


 const schema = Yup.object().shape({
  username:Yup.string().required("usuario es requerido."),
  password: Yup.string().required("La contraseña es requerida")
 })
function onSubmit(values,{setErrors}){

  const authStore = useAuthStore();
  const {username,password} = values;

  return authStore.login(username, password ).catch(errors =>{
    authStore.modalShow()
    setInterval(() => {
      authStore.sideModal()
    },3000);
})
}

  
  </script>

<template>
<main class="login-page">
<h1 class="login-title">    Contable MYJALL</h1>
<Form class="Style-Form" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label class="label-login">Username</label>
                <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
            </div>            
            <div class="form-group">
                <label class="label-login">Contraseña </label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    L O G I N
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
</main>
<a-alert

  v-if="modal"
    message="Error"
    description="Las credenciales no son correctos."
    type="error"
    show-icon
  >
    <template #icon><smile-outlined /></template>
  </a-alert>
</template>
<style >
  
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  .login-page{
  position: relative;
  width: 100%;
  height: 100%;


}

.login-title{
  position: absolute;

right: 35%;
top: 5%;

font-family: 'Inter';
font-style: normal;
font-weight: 200;
font-size: 46px;
line-height: 116px;
z-index: 10;
font-size: 72px;
background: rgb(0,140,237);
background: linear-gradient(35deg, rgb(255, 255, 255) 0%, rgb(243, 233, 95) 54%, rgba(255,255,255,1) 86%, rgb(255, 255, 255) 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 
}
 .Style-Form{
 position: absolute;
font-family: 'Inter';

width: 435px;
height: 425px;
left: 35%;
top: 152px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 66px 66px 0px 66px;
display: flex;
flex-direction: column;

padding: 50px 10px ;

}
.form-group{
  display: flex;
flex-direction: column;
justify-content: space-around;
margin-top: 40px;
}

.showModal{
  position: absolute;
  width: 500px;
  right: 20%;
  z-index: 1010;
}
</style>