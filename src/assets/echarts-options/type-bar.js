export default {
  title: {
    text: ""
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
    left: "center",
    data: ["蒸发量", "降水量"]
  },
  toolbox: {
    feature: {
      magicType: {type: ['line', 'bar']},
      restore: {},
      saveAsImage: {}
    }
  },
  grid: {
    left: "3%", //组件离容器左侧
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [{
    type: "category",
    boundaryGap: false,
    data: []
  }],
  yAxis: [{
    type: "value"
  }],
  series: [{
      name: "蒸发量",
      type: "bar",
      data: []
    },
    {
      name: "降水量",
      type: "bar",
      data: [],
    }
  ]
}
