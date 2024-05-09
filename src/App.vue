<template>
  <div id="app" class="container">
    <bottle-form class="component"></bottle-form>
    <bottle-list class="component"></bottle-list>
    <bottle-detail class="component"></bottle-detail>
  </div>
</template>

<script>
import BottleForm from './components/BottleForm.vue';
import BottleList from './components/BottleList.vue';
import BottleDetail from './components/BottleDetail.vue';

export default {
  components: {
    BottleForm,
    BottleList,
    BottleDetail
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

.component {
  margin: 10px;
  flex: 1; /* Each component takes equal width */
}
</style>