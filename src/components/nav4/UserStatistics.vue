<template>
  <div id="user-statistics">
    <div class="user-page">
      <div class="user-statistics-box">
        <div class="user-statistics-title">今日用户统计</div>
        <div class="user-statistics-main">
          <div class="user-item-box">
            <div class="user-item-title item-green">新增用户量</div>
            <div class="user-item-main item-green">
              <div class="user-item-left">
                <svg-icon class="user-item-icon" icon-class="u53"></svg-icon>
              </div>
              <div class="user-item-right">
                15
                <span>人</span>
              </div>
            </div>
          </div>
          <div class="user-item-box">
            <div class="user-item-title item-blue">用户总数</div>
            <div class="user-item-main item-blue">
              <div class="user-item-left">
                <svg-icon class="user-item-icon" icon-class="u54"></svg-icon>
              </div>
              <div class="user-item-right">
                15
                <span>人</span>
              </div>
            </div>
          </div>
          <div class="user-item-box">
            <div class="user-item-title item-orange">持卡用户数</div>
            <div class="user-item-main item-orange">
              <div class="user-item-left">
                <svg-icon class="user-item-icon" icon-class="u55"></svg-icon>
              </div>
              <div class="user-item-right">
                15
                <span>人</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="statistics-main">
        <div class="statistics-box">
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
        <chart :options="userBar" theme="theme-bar" />
        <chart :options="userLine" theme="theme-line" />
      </div>
      <div class="statistics-table-box">
        <div class="table-title">分享统计详情</div>
        <div class="statistics-table">
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="date" label="分享编号"></el-table-column>
            <el-table-column align="center" prop="name" label="分享者电话"></el-table-column>
            <el-table-column align="center" prop="address" label="分享成功数"></el-table-column>
            <el-table-column align="center" prop="address" label="获得优惠券(张)"></el-table-column>
            <el-table-column align="center" prop="address" label="获得优惠券(元)"></el-table-column>
          </el-table>
          <div class="table-page">
            <el-pagination
              :current-page.sync="currentPage"
              @current-change="getTableData"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 图表
import chart from "vue-echarts/components/ECharts";
import line from "@/common/echarts-theme/theme-line.json";
import bar from "@/common/echarts-theme/theme-bar.json";
chart.registerTheme("theme-line", line.theme); //引入主题
chart.registerTheme("theme-bar", bar.theme); //引入主题
// 单独引入
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
// 工具
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
// 图表配置
import userBar from "@/assets/echarts-options/type-bar";
import userLine from "@/assets/echarts-options/type-line";
//一页显示多少行
const pageSize = 15;
export default {
  components: {
    chart
  },
  data() {
    return {
      // 时间
      radio: "mon",
      monValue: "",
      yearValue: "",
      timeValue: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // 图表
      userBar,
      userLine,
      // 表格
      tableData: [],
      total: 0, //总条数，根据接口获取数据长度
      currentPage: 1, //当前页数
      pageSize: pageSize
    };
  },
  computed: {
    todayStart() {
      const date = new Date(new Date().toLocaleDateString());
      return date;
    },
    todayEnd() {
      const date = new Date();
      return date;
    },
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
  created() {
    this.timeSet();
    this.userBarData();
    this.userLineData();
    this.getTableData();
  },
  methods: {
    // 时间初始化
    timeSet() {
      const date = new Date();
      this.timeValue = [this.todayStart, this.todayEnd];
      this.yearValue = this.tYear;
      this.monValue = this.tMon;
      let x = this.$date(this.tMon + "-" + "01", this.tMon + "-" + this.tDay);
      this.userBar.xAxis[0].data = x;
      this.userLine.xAxis[0].data = x;
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
          this.userBar.xAxis[0].data = x;
          this.userLine.xAxis[0].data = x;
        } else {
          let year = this.monValue.split("-")[0];
          let mon = this.monValue.split("-")[1];
          let day = this.$leap(year, mon); //返回当年月份的最后一天
          let x = this.$date(
            year + "-" + mon + "-" + "01",
            year + "-" + mon + "-" + day
          );
          this.userBar.xAxis[0].data = x;
          this.userLine.xAxis[0].data = x;
        }
      } else if (this.radio === "year") {
        if (this.yearValue == this.tYear) {
          const date = new Date();
          let mon = date.getMonth() + 1;
          let x = [];
          for (let i = 1; i <= mon; i++) {
            x.push(i + "月");
          }
          this.userBar.xAxis[0].data = x;
          this.userLine.xAxis[0].data = x;
        } else {
          let x = [];
          for (let i = 1; i < 13; i++) {
            x.push(i + "月");
          }
          this.userBar.xAxis[0].data = x;
          this.userLine.xAxis[0].data = x;
        }
      }
    },
    // 获取数据
    userBarData() {
      this.userBar.title.text = "用户下单人次统计";
    },
    userLineData() {
      this.userLine.title.text = "分享统计";
    },
    getTableData() {}
  }
};
</script>

<style scoped>
.echarts {
  width: calc(100vw - 280px);
  margin: auto;
}
#user-statistics {
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.user-page {
  padding: 10px;
}
.user-statistics-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
}
.user-statistics-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.user-statistics-main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;
}
.user-item-box {
  width: 25%;
  padding: 20px 10px 0px;
}
.user-item-title {
  border: 1px solid black;
  color: white !important;
  font-weight: 700;
  padding: 10px 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 1px;
}
.user-item-main {
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white !important;
}
.user-item-left .user-item-icon {
  font-size: 26px;
}
.user-item-right {
  font-size: 26px;
  font-weight: 500;
}
.user-item-right span {
  font-size: 14px;
  color: black;
}
.item-green {
  background-color: #137a2a;
  border-color: #137a2a;
  color: #137a2a;
}
.item-blue {
  background-color: #0084cc;
  border-color: #0084cc;
  color: #0084cc;
}
.item-orange {
  background-color: #dd8c00;
  border-color: #dd8c00;
  color: #dd8c00;
}
.statistics-main {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  margin-bottom: 20px;
}
.statistics-box {
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.statistics-table-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  padding: 10px 20px;
}
.table-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
  text-align: left;
  margin-bottom: 10px;
}
.statistics-table {
}
.table-page {
  border: 1px solid #ebeef5;
  padding: 5px 0px;
  border-top: 0px;
}
</style>