<template>
  <div >
    <header> <h1 class="inicio-title">MYJALL</h1></header>
    <div class="slidebar">
 
 <router-link 
 class="navlink"
 to="/inicio/clientes">Clientes</router-link>
 <router-link 
 class="navlink"

 to="/inicio/usuarios">Usuarios</router-link>
  
 <router-link
 class="navlink"
 to="/inicio/facturas">Facturas</router-link>
 <router-link 
 class="navlink"

 to="/inicio/controlPago">Control de Pagos</router-link>
  
 <router-link
 class="navlink"
 to="/inicio/constancias">Constancias</router-link>
 <router-link 
 class="navlink"
 
 to="/inicio/reportes">Reportes</router-link>


    </div>
    <div class="content">
   <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

</script>
<style >
  body{
  background: linear-gradient(-45deg, #faf9f9, #f9f6f7, #aae7fd, #eaf6f3);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
  
  
header{
  position: relative;
  background-color: #ffffff;
  height: 3.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
.slidebar{
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  align-content: space-around;
  position: absolute;
  background: rgb(255, 255, 255);
  width: 15%;
  height: 55%;
  top:15%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  border-radius: 0 15px 5px 0;
}
.content{
  border-radius:15px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: 12%;
  background-color: rgb(255, 255, 255);
  width: 80%;
  height: 83%;
  left: 17%;
}
.inicio-title{
  background: rgb(0,140,237);
background: linear-gradient(35deg, rgb(255, 255, 255) 0%, rgb(33, 128, 143) 54%, rgba(255,255,255,1) 86%, rgb(255, 255, 255) 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 
}

.navlink{
  color: rgba(22, 27, 27, 0.867);
  font-weight: 600;
}
</style>
