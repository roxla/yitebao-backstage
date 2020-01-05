<template>
  <div class="hello">
    <tabs v-model="active">
      <tab title="批量发卡">批量发卡</tab>
      <tab title="发卡详情">发卡详情</tab>
    </tabs>
  </div>
</template>

<script>
import tabs from "@/common/tabs/tabs-framework.vue";
import tab from "@/common/tabs/tab-framework.vue";
export default {
  components: {
    tabs,
    tab
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped>

</style>
