<template>
  <div id="card-details">
    <div class="details-page">
      <div class="details-info-box">
        <div class="details-title-box">
          <div class="details-info-title">
            用户基本信息
            <span></span>
          </div>
        </div>
        <div class="details-info-main">
          <div class="details-info-item">
            <div class="details-info-left">用户ID:</div>
            <div class="details-info-right">114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户姓名:</div>
            <div class="details-info-right">野兽先辈</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户电话:</div>
            <div class="details-info-right">py交易</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">消费总额:</div>
            <div class="details-info-right">114514114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">积分数:</div>
            <div class="details-info-right">{{}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户所在地:</div>
            <div class="details-info-right">114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">注册时间:</div>
            <div class="details-info-right">审核中</div>
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
      cardData: {}
    };
  },
  mounted() {
    this.cardData = JSON.parse(this.$route.query.data);
    console.log(this.cardData);
  },
  methods: {}
};
</script>

<style scoped>
#card-details {
  overflow-y: auto;
}
.details-page {
  padding: 10px;
}
.details-info-box {
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
.details-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.details-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.details-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 详情内容 */
.details-info-main {
  padding-top: 20px;
}
.details-info-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.details-info-left {
  width: 15%;
  text-align: right;
  color: #999999;
  font-weight: 600;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.details-info-right {
  margin-left: 10px;
  width: 85%;
  text-align: left;
}
.details-img-box{
  width: 20%;
  border: 1px solid #999999;
  border-radius: 5px;
  overflow: hidden;
  height: 0px;
  padding-bottom: 15%;
  position: relative;
}
.details-img-box img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
</style>