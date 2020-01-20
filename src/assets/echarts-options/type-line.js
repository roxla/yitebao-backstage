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
    data: ["邮件营销", "联盟广告"]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: "2%",
    right: "2%",
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
    }
  ]
}
