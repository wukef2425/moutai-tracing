<template>
  <div>
    <h1>Create Bottle</h1>
    <form @submit.prevent="submitForm">
      <input v-model="newBottle.description" placeholder="Enter description">
      <button type="submit">Create Bottle</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBottle: {
        description: ''
      }
    };
  },
  methods: {
    submitForm() {
      // 只传递 description 字符串
      this.$store.dispatch('createBottle', this.newBottle.description);
      this.newBottle.description = '';  // 清空表单
    }
  }
};
</script>