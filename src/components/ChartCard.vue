<template>
  <div class="chart-card">
      <div class="chart">
        <h1>Chart Card</h1>
      </div>

      <!-- <div id="nav">
        <div id="circle"></div>
        <button class="button_icon button_icon_selected" onclick="select_page(0)"><i class="fas fa-home"></i></button>
        <button class="button_icon" onclick="select_page(1)"><i class="fas fa-bell" style="padding-left: 4px"></i></button>
        <button class="button_icon" onclick="select_page(2)"><i class="fas fa-comments"></i></button>
        <button class="button_icon" onclick="select_page(3)"><i class="fas fa-search"></i></button>
      </div> -->
  </div>
</template>
<script>
export default {
  name: 'ChartCard',
  props: {}
}
</script>
<style scoped>
  .chart-card {
    position: relative;
    width: 300px;
    height: 500px;
    background-color: #FFF;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
</style>
