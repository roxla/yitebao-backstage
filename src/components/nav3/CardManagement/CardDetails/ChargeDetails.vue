<template>
  <div>
    <div class="charge-page">
      <div class="charge-info-box">
        <div class="charge-title-box">
          <div class="charge-info-title">
            充值信息
            <span></span>
          </div>
        </div>
        <div class="charge-info-main">
          <div class="charge-info-item">
            <div class="charge-info-left">卡号:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作时间:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作金额:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作类型:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作方式:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">卡类型:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">流水号:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
        </div>
      </div>
      <div class="charge-info-box">
        <div class="charge-title-box">
          <div class="charge-info-title">
            赠送信息
            <span></span>
          </div>
        </div>
        <div class="charge-info-main">
          <div class="charge-info-item">
            <div class="charge-info-left">卡号:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作时间:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作金额:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作类型:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作方式:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">卡类型:</div>
            <div class="charge-info-right">{{}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">流水号:</div>
            <div class="charge-info-right">{{}}</div>
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
      data: {}
    };
  },
  created(){
    this.data = JSON.parse(this.$route.query.data);
    console.log(this.data);
  },
  methods: {}
};
</script>

<style scoped>
#charge-statistics {
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.charge-page {
  padding: 10px;
}
.charge-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center; */
  padding: 20px;
  margin-bottom: 20px;
}
/* 详情标题 */
.charge-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.charge-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.charge-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 详情内容 */
.charge-info-main {
  padding-top: 20px;
}
.charge-info-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.charge-info-left {
  width: 15%;
  text-align: right;
  color: #999999;
  font-weight: 600;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.charge-info-right {
  margin-left: 10px;
  width: 85%;
  text-align: left;
}
</style>