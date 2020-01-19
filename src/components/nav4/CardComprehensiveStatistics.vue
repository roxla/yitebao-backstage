<template>
  <div id="card-statistics">
    <div class="card-page" v-show="showPage">
      <div class="card-button-box" v-show="active != 0">
        <div style="padding: 0px 5px;">
          <el-radio-group @change="changeTime()" v-model="radio">
            <el-radio-button label="mon">按月统计</el-radio-button>
            <el-radio-button label="year">按年统计</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="radio === 'mon'">
          <el-date-picker
            :clearable="false"
            @change="changeTime()"
            v-model="monValue"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div v-show="radio === 'year'">
          <el-date-picker
            :clearable="false"
            @change="changeTime()"
            v-model="yearValue"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="card-statistics-main">
        <tabs @click="handleClick" v-model="active">
          <tab title="统计"></tab>
          <tab title="充值报表"></tab>
          <tab title="消费报表"></tab>
          <tab title="办卡报表"></tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "@/common/tabs/tabs-framework.vue";
import tab from "@/common/tabs/tab-framework.vue";
// 图表
import chart from "vue-echarts/components/ECharts";
export default {
  components: {
    tabs,
    tab,
    chart
  },
  computed: {
    tYear() {
      const date = String(new Date().getFullYear());
      return date;
    },
    tMon() {
      const date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let mon = date.getFullYear() + "-" + month;
      return mon;
    },
    tDay() {
      const date = new Date();
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return day;
    }
  },
  data() {
    return {
      showPage: true,
      active: 0,
      radio: "mon",
      monValue: "",
      yearValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
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
  created() {
    this.timeSet();
  },
  methods: {
    // tabs方法
    handleClick(tab, event) {
      this.active = tab;
    },
    // 时间初始化
    timeSet() {
      this.yearValue = this.tYear;
      this.monValue = this.tMon;
      let x = this.$date(this.tMon + "-" + "01", this.tMon + "-" + this.tDay);
    },
    // 时间更变
    changeTime() {
      if (this.radio === "mon") {
        if (this.monValue == this.tMon) {
          //返回当年月份的日期
          let x = this.$date(
            this.tMon + "-" + "01",
            this.tMon + "-" + this.tDay
          );
          console.log(x);
        } else {
          let year = this.monValue.split("-")[0];
          let mon = this.monValue.split("-")[1];
          let day = this.$leap(year, mon); //返回当年月份的最后一天
          let x = this.$date(
            year + "-" + mon + "-" + "01",
            year + "-" + mon + "-" + day
          );
          console.log(x);
        }
      } else if (this.radio === "year") {
        if (this.yearValue == this.tYear) {
          const date = new Date();
          let mon = date.getMonth() + 1;
          let x = [];
          for (let i = 1; i <= mon; i++) {
            x.push(i + "月");
          }
          console.log(x);
        } else {
          let x = [];
          for (let i = 1; i < 13; i++) {
            x.push(i + "月");
          }
          console.log(x);
        }
      }
    },
    
  }
};
</script>

<style scoped>
#card-statistics {
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
  margin-bottom: 25px;
  padding: 10px 5px;
}
/* main */
.card-statistics-main .tabs {
  margin: 30px 0px 10px;
}
</style>