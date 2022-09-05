<script > 
import { UserOutlined} from '@ant-design/icons-vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {
      UserOutlined,
    },
  });</script>

<template>
<main class="login-page">
<!---
  <img  class="img-bg" src="../assets/img.jpg"  width="auto" srcset="">
-->
<h1 class="login-title">    Contable MYJALL</h1>
<form  class="login-form" action="" method="post">
  <div class="form-group">

    <label for="usuario" class="label-login" >Usuario</label>
    <a-input v-model:value="value" placeholder="usuario..." />
  </div>
  <div class="form-group">

    <label for="password" class="label-login">Contraseña</label>
    <a-input-password v-model:value="value" placeholder="password..." />
  </div>
  <div class="space-login form-group">
<hr>
<user-outlined />
    <hr>
  </div>
  <div class="form-group">
    <a-button type="primary">L o g i n</a-button>

  </div>
</form>
</main>

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
.login-form{
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
margin-top:50px;
}
</style>