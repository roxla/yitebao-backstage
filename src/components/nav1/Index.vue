<template>
  <div class="hello">
    <chart :options="polar1" theme="theme-line"/>
    <chart :options="polar1" theme="theme-bar"/>
    <button @click="go">test</button>
  </div>
</template>

<script>
import chart from "vue-echarts";
// 图表类型
import "echarts/lib/chart/line";
import line from "@/common/echarts-theme/theme-line.json";
chart.registerTheme('theme-line', line.theme); //引入主题
import bar from '@/common/echarts-theme/theme-bar.json'
chart.registerTheme('theme-bar', bar.theme); //引入主题
//工具
import "echarts/lib/component/title"; //标题组件
import "echarts/lib/component/legend"; //图例组件
import "echarts/lib/component/tooltip"; //提示框组件
export default {
  components: {
    chart
  },
  data() {
    return {
      polar1: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          left: "right",
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
          }
        ]
      }
    };
  },
  created() {
    // this.test = this.$date("2019/01/04", "2019/01/06");
    this.test();
  },
  methods: {
    test() {
      this.axios.get("./static/Json/test.json").then(res => {
        let data = res.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.polar1.series[i].data = data[i].data;
        }
      });
    },
    go() {
      this.$router.push({
        path: "/main/backpage/laundryserviceorder"
      });
    }
  }
};
</script>

<style scoped>
</style>
