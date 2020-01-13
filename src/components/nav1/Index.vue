<template>
  <div class="hello">
    <tabs v-model="active">
      <tab title="批量发卡">批量发卡</tab>
      <tab title="发卡详情">发卡详情</tab>
    </tabs>
    <button @click="go">test</button>
  </div>
</template>

<script>
import tabs from "@/common/tabs2/tabs-framework.vue";
import tab from "@/common/tabs2/tab-framework.vue";
export default {
  components: {
    tabs,
    tab
  },
  data() {
    return {
      active: 0
    };
  },
  methods:{
    go(){
      this.$router.push({ path: '/main/backpage/laundryserviceorder' });
    }
  }
};
</script>

<style scoped>

</style>
