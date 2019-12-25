<template>
  <div class="hello">
    测试
    <RimFramework :inputVal="val" @getValue="test"/>
    <input v-model="val" type="text">
    <button>test</button>
  </div>
</template>

<script>
import RimFramework from "@/common/rim-framework.vue";
export default {
  components: {
    RimFramework
  },
  data () {
    return {
      val:""
    }
  },
  methods:{
    test(data){
      console.log(data);
    }
  }
}
</script>

<style scoped>
.hello{
  background: white;
}
</style>
