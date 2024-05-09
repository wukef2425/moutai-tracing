<template>
  <div>
    <h1>Bottle List</h1>
    <ul>
      <!-- 使用 slice().reverse() 保持列表倒序 -->
      <li v-for="bottle in bottles.slice().reverse()" :key="bottle.id">
        Description: {{ bottle.description }}, Status: {{ bottle.latestStatus }}
        <!-- 添加更新物流信息的表单 -->
        <form @submit.prevent="submitUpdate(bottle.id)">
          <input type="text" v-model="updateStatus[bottle.id]" placeholder="Enter new status" />
          <button type="submit">Update Status</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BottleList',

  data() {
    return {
      bottles: [],  // 初始化 bottles 为空数组
      updateStatus: {},  // 用于存储每个瓶子的更新状态
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('fetchBottles'); // 从 Vuex dispatch fetchBottles
      
      const bottlesWithStatus = this.$store.getters.getBottles.map(bottle => {
        if (bottle.logistics.length > 0) {
          const lastStatus = bottle.logistics[bottle.logistics.length - 1];
          bottle.latestStatus = lastStatus;
        } else {
          bottle.latestStatus = 'No status updates';
        }
        return bottle;
      });
      this.bottles = bottlesWithStatus; // 更新本地数据
    },

    submitUpdate(id) {
      this.$store.dispatch('updateLogistics', {
        id: id,
        status: this.updateStatus[id]
      });
      this.updateStatus[id] = '';  // 清空输入框
    }
  }
};
</script>