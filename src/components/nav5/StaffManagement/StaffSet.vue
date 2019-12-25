<template>
  <div class="staff-set">
    <div class="set-info-box">
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>姓名
        </div>
        <div ref="input" class="set-info-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入姓名" type="text" />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>手机号
        </div>
        <div ref="input" class="set-info-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入手机号" type="text" />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>密码
        </div>
        <div ref="input" class="set-info-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入密码" type="text" />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>性别
        </div>
        <div ref="input" class="set-info-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入性别" type="text" />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>住址
        </div>
        <div ref="input" class="set-info-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入住址" type="text" />
        </div>
      </div>
    </div>
    <div class="set-authority-box">
      <p class="authority-title">
        <span>*</span>权限设置
      </p>
      <div class="authority-item-box">
        <el-checkbox
          class="set-authority-all"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox
            class="set-authority-item"
            v-for="city in cities"
            :label="city"
            :key="city.index"
          >{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="set-button-box">
      <el-button type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button type="info">
        <span style="padding: 0px 20px;">取 消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import RimFramework from "@/common/rim-framework.vue";
export default {
  components: {
    RimFramework
  },
  data() {
    return {
      test: "123",
      // select1
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false
    };
  },
  created() {
    this.axios.get("/static/Json/staffSetList.json").then(res => {
      this.cities = res.data;
    });
  },
  watch: {
    $route: {
      handler: function() {
        if (this.$route.query.data) {
          console.log(this.$route.query.data);
        }
      },
      immediate: true
    },
    test: {
      handler: function(val) {
        console.log(val);
      },
      immediate: true
    }
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.path[1].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.path[1].style.borderColor = "black";
    },
    // 多选框方法
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped>
.staff-set {
  background: white;
}
/* 员工信息设置位 */
.set-info-box {
  padding: 20px 10px 20px 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
}
/* 员工信息输入框 */
.set-info {
  width: 33%;
  margin-bottom: 20px;
}
.set-info-title {
  text-align: left;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  margin-bottom: 10px;
}
.set-info-title span {
  color: red;
  font-size: 20px;
}
.set-info-input {
  display: flex;
  justify-content: flex-start;
  margin-left: 7px;
  padding: 10px 10px;
  width: 80%;
  border: 2px solid black;
  border-radius: 3px;
}
.set-info-input input {
  width: 100%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
  margin: 0px;
}
.set-info-input input::placeholder {
  color: #999999;
}
/* 权限设置位 */
.set-authority-box {
  padding: 0px 10px 20px 50px;
  text-align: left;
}
/* 权限设置标题 */
.authority-title {
  margin: 0px 0px 15px;
  font-size: 20px;
  font-weight: 700;
}
.authority-title span {
  color: red;
  font-size: 20px;
}
/* 权限设置项 */
.authority-item-box {
  width: 95%;
  border: 2px solid #cccccc;
  border-radius: 5px;
  text-align: left;
  padding: 20px 0px 0px 20px;
}
.set-authority-all {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
.set-authority-item {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  margin-bottom: 20px;
  margin-right: 40px;
  /* width: 10%; */
}
.set-button-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>