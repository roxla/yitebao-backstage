<template>
  <div id="card-statistics">
    <div class="card-page" v-show="showPage">
      <div class="card-button-box">
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
          <tab title="统计">
            <div class="pie-botton">
              <el-radio-group @change="getCardType" v-model="radio1">
                <el-radio-button label="all">全部查询</el-radio-button>
                <el-radio-button label="section">时间查询</el-radio-button>
              </el-radio-group>
            </div>
            <chart :options="cardPie" theme="theme-bar" />
            <div style="padding: 10px 0px;"></div>
          </tab>
          <tab title="充值报表">
            <chart :options="cardLine" theme="theme-line" />
            <div class="statistics-table-box">
              <div class="table-title">卡充值详情</div>
              <div class="statistics-table">
                <el-table border :data="tableData1" style="width: 100%">
                  <el-table-column align="center" prop="date" label="卡号"></el-table-column>
                  <el-table-column
                    :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filter1"
                    align="center"
                    prop="name"
                    label="获得途径"
                  ></el-table-column>
                  <el-table-column align="center" prop="address" label="电话"></el-table-column>
                  <el-table-column align="center" prop="address" label="名称"></el-table-column>
                  <el-table-column align="center" prop="address" label="卡类型"></el-table-column>
                  <el-table-column align="center" prop="address" label="充值额"></el-table-column>
                  <el-table-column align="center" prop="address" label="赠送额"></el-table-column>
                </el-table>
                <div class="table-page">
                  <el-pagination
                    :current-page.sync="currentPage1"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total1"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </tab>
          <tab title="消费报表">
            <chart :options="cardLine" theme="theme-line" />
            <div class="statistics-table-box">
              <div class="table-title">卡消费详情</div>
              <div class="statistics-table">
                <el-table border :data="tableData2" style="width: 100%">
                  <el-table-column align="center" prop="date" label="卡号"></el-table-column>
                  <el-table-column
                    :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filter2"
                    align="center"
                    prop="name"
                    label="消费方式"
                  ></el-table-column>
                  <el-table-column align="center" prop="address" label="电话"></el-table-column>
                  <el-table-column align="center" prop="address" label="名称"></el-table-column>
                  <el-table-column align="center" prop="address" label="卡类型"></el-table-column>
                  <el-table-column align="center" prop="address" label="消费金额"></el-table-column>
                  <el-table-column align="center" prop="address" label="消费时间"></el-table-column>
                </el-table>
                <div class="table-page">
                  <el-pagination
                    :current-page.sync="currentPage2"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total2"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </tab>
          <tab title="办卡报表">
            <chart :options="cardLine" theme="theme-line" />
            <div class="statistics-table-box">
              <div class="table-title">办卡详情</div>
              <div class="statistics-table">
                <el-table border :data="tableData3" style="width: 100%">
                  <el-table-column align="center" prop="date" label="卡号"></el-table-column>
                  <el-table-column
                    :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filter3"
                    align="center"
                    prop="name"
                    label="获得途径"
                  ></el-table-column>
                  <el-table-column align="center" prop="address" label="电话"></el-table-column>
                  <el-table-column align="center" prop="address" label="名称"></el-table-column>
                  <el-table-column align="center" prop="address" label="卡类型"></el-table-column>
                  <el-table-column align="center" prop="address" label="充值额"></el-table-column>
                  <el-table-column align="center" prop="address" label="赠送额"></el-table-column>
                </el-table>
                <div class="table-page">
                  <el-pagination
                    :current-page.sync="currentPage3"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total3"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </tab>
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
import pie from "@/common/echarts-theme/theme-pie.json";
import line from "@/common/echarts-theme/theme-line.json";
chart.registerTheme("theme-pie", pie.theme); //引入主题
chart.registerTheme("theme-line", line.theme); //引入主题
// 单独引入
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
// 工具
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
// 图表配置
import cardPie from "@/assets/echarts-options/type-pie";
import cardLine from "@/assets/echarts-options/type-line";
//一页显示多少行
const pageSize = 15;
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
      },
      radio1: "section",
      // 图表
      cardPie,
      cardLine,
      // 表格
      pageSize,
      // tab1
      tableData1: [],
      total1: 0, //总条数，根据接口获取数据长度
      currentPage1: 1, //当前页数
      // tab2
      tableData2: [],
      total2: 0, //总条数，根据接口获取数据长度
      currentPage2: 1, //当前页数
      // tab3
      tableData3: [],
      total3: 0, //总条数，根据接口获取数据长度
      currentPage3: 1 //当前页数
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
    this.getCardType();
  },
  methods: {
    // tabs方法
    handleClick(tab, event) {
      if (tab == 0) {
      } else if (tab == 1) {
        this.getChargeData();
      } else if (tab == 2) {
        this.getConsumptionData();
      } else if (tab == 3) {
        this.getCardData();
      }
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
          this.cardLine.xAxis[0].data = x;
        } else {
          let year = this.monValue.split("-")[0];
          let mon = this.monValue.split("-")[1];
          let day = this.$leap(year, mon); //返回当年月份的最后一天
          let x = this.$date(
            year + "-" + mon + "-" + "01",
            year + "-" + mon + "-" + day
          );
          this.cardLine.xAxis[0].data = x;
        }
      } else if (this.radio === "year") {
        if (this.yearValue == this.tYear) {
          const date = new Date();
          let mon = date.getMonth() + 1;
          let x = [];
          for (let i = 1; i <= mon; i++) {
            x.push(i + "月");
          }
          this.cardLine.xAxis[0].data = x;
        } else {
          let x = [];
          for (let i = 1; i < 13; i++) {
            x.push(i + "月");
          }
          this.cardLine.xAxis[0].data = x;
        }
      }
    },
    getCardType() {
      this.cardPie.title.text = "卡类型统计";
      console.log(this.cardPie.series[0]);
      this.cardPie.series[0] = {
        name: "面积模式",
        type: "pie",
        radius: [30, 110],
        center: ["25%", "50%"],
        roseType: "area",
        data: [
          {
            value: 10,
            name: "rose1"
          },
          {
            value: 5,
            name: "rose2"
          },
          {
            value: 15,
            name: "rose3"
          },
          {
            value: 25,
            name: "rose4"
          },
          {
            value: 20,
            name: "rose5"
          },
          {
            value: 35,
            name: "rose6"
          },
          {
            value: 30,
            name: "rose7"
          },
          {
            value: 40,
            name: "rose8"
          }
        ]
      };
      this.cardPie.series[1] = {
        name: "面积模式",
        type: "pie",
        radius: [30, 110],
        center: ["75%", "50%"],
        roseType: "area",
        data: [
          {
            value: 10,
            name: "rose1"
          },
          {
            value: 5,
            name: "rose2"
          },
          {
            value: 15,
            name: "rose3"
          },
          {
            value: 25,
            name: "rose4"
          },
          {
            value: 20,
            name: "rose5"
          },
          {
            value: 35,
            name: "rose6"
          },
          {
            value: 30,
            name: "rose7"
          },
          {
            value: 40,
            name: "rose8"
          }
        ]
      };
      if (this.radio1 === "section") {
        console.log(1);
      } else if (this.radio1 === "all") {
        console.log(2);
      }
    },
    // tab1
    getChargeData() {
      this.cardLine.title.text = "卡充值统计";
    },
    filter1(value, row) {
      return row.tag === value;
    },
    // tab2
    getConsumptionData() {
      this.cardLine.title.text = "卡消费统计";
    },
    filter2(value, row) {
      return row.tag === value;
    },
    // tab3
    getCardData() {
      this.cardLine.title.text = "会员卡办理统计";
    },
    filter3(value, row) {
      return row.tag === value;
    }
  }
};
</script>

<style scoped>
.echarts {
  width: calc(100vw - 280px);
  margin: auto;
}
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
.pie-botton {
  text-align: left;
  padding: 0px 10px 10px;
}
/* table */
.statistics-table-box {
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
  margin: auto;
}
.table-page {
  border: 1px solid #ebeef5;
  padding: 5px 0px;
  border-top: 0px;
}
</style>