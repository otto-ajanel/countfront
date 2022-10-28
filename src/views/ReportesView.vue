<template>
  <div class="container">
      <h3 class="title-report">Reporte de Servicios</h3>
    <BarChart
    style="
      width:50%;
    "
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
    />
  </div>
  </template>
  
  <script setup>
  import pattern from "patternomaly"
  import { ref, computed, onMounted } from "vue"
  import { BarChart } from "vue-chart-3"
  
  import {
    Chart,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement
  } from "chart.js"
  import {useControlPagosStore} from "@/stores"
import { storeToRefs } from "pinia"
  const controlPagosStore= useControlPagosStore();
  const {reportLabels,reportData,reportServices} = storeToRefs(useControlPagosStore())
  Chart.register(BarController, CategoryScale, LinearScale, BarElement)
  controlPagosStore.getReportServices()

  const dataValues = ref([

    reportData.value
  ]
  )
  
  const data = {
    labels: reportLabels.value,
    datasets: [
      {
      label: "Foo",
      data: dataValues.value[0],
      backgroundColor: pattern.draw("dash", "#268bd2")
    
      }
    ]
  }
  const options = ref({
    plugins: {
      title: {
        text: "Bar"
      }
    }
  })
  </script>
<style scoped>
 .container{
  width: 100%;
  display: flex;
  margin:50px;
  flex-direction: column;
 }
 .title-report{
  margin-left: 25%;
  margin-bottom: 5px;
 }
</style>
