<template>
  <div id="card-statistics">
    <div class="card-page" v-show="showPage">
      <div class="card-button-box">
        <el-select class="search-select" v-model="shopValue" placeholder="请选择店铺">
          <el-option label="全部店铺" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="padding: 0px 5px;"></div>
        <el-date-picker
          class="search-date"
          :editable="false"
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="getCardData()" type="primary" class="card-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="card-info-box">
        <div class="card-title-box">
          <div class="card-info-title">
            卡消费流水
            <span></span>
          </div>
          <div class="card-title-button">
            <el-button type="primary" class="card-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
      </div>
      <div class="card-info-box">
        <div class="card-title-box">
          <div class="card-info-title">
            卡充值流水
            <span></span>
          </div>
          <div class="card-title-button">
            <el-button type="primary" class="card-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
      </div>
      <div class="card-info-box">
        <div class="card-title-box">
          <div class="card-info-title">
            卡余额统计
            <span></span>
          </div>
          <div class="card-title-button">
            <el-button type="primary" class="card-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage:true,
      cardName:"",
      options:[],
      shopValue:""
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/cardcomprehensivestatistics") {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  methods:{
    // 选中input边框变色
    changeColor(e) {
      e.path[1].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.path[1].style.borderColor = "black";
    },
  }
};
</script>

<style scoped>
#card-statistics{
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.card-page {
  padding: 10px;
}
.card-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center; */
  padding: 10px 20px;
  margin-bottom: 20px;
}
/* 按钮存放位置 */
.card-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.card-button-box {
  margin-bottom: 20px;
  padding: 10px;
}
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 15%;
  border: 2px solid black;
  border-radius: 3px;
}
.search-input input {
  width: 100%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
  margin: 0px;
}
.search-input input::placeholder {
  color: #999999;
}
/* 卡设置标题 */
.card-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.card-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.card-plus:focus,
.card-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
.card-plus:disabled {
  background: #7cedd7;
  border-color: #7cedd7;
  color: #fff;
}
.card-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.card-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
</style>