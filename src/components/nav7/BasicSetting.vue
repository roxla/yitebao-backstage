<template>
  <div id="basic-setting">
    <div v-show="showPage" class="basic-page">
      <div class="basic-info-box">
        <div class="basic-title-box">
          <div class="basic-info-title">
            用户协议
            <span></span>
          </div>
          <div class="app-title-button">
            <el-button type="primary" class="app-plus">编辑详情</el-button>
          </div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-item">
            <div class="basic-info-left">协议版本号:</div>
            <div class="basic-info-right">114514</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">最后修订时间:</div>
            <div class="basic-info-right">野兽先辈</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">协议内容:</div>
            <div class="basic-info-right">py交易</div>
          </div>
        </div>
      </div>
      <div class="basic-info-box">
        <div class="basic-title-box">
          <div class="basic-info-title">
            关于我们
            <span></span>
          </div>
          <div class="app-title-button">
            <el-button type="primary" class="app-plus">编辑详情</el-button>
          </div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-item">
            <div class="basic-info-left">客户服务电话:</div>
            <div class="basic-info-right">114514</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">还有啥想不起:</div>
            <div class="basic-info-right">野兽先辈</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">还有啥想不起:</div>
            <div class="basic-info-right">py交易</div>
          </div>
        </div>
      </div>
      <div class="basic-info-box">
        <div class="basic-title-box">
          <div class="basic-info-title">
            客户APP版本控制
            <span></span>
          </div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-item">
            <div class="basic-info-left">协议版本号:</div>
            <div class="basic-info-right">114514</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">最后修订时间:</div>
            <div class="basic-info-right">野兽先辈</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">协议内容:</div>
            <div class="basic-info-right">py交易</div>
          </div>
        </div>
      </div>
      <div class="basic-info-box">
        <div class="basic-title-box">
          <div class="basic-info-title">
            收送APP版本控制
            <span></span>
          </div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-item">
            <div class="basic-info-left">客户服务电话:</div>
            <div class="basic-info-right">114514</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">还有啥想不起:</div>
            <div class="basic-info-right">野兽先辈</div>
          </div>
          <div class="basic-info-item">
            <div class="basic-info-left">还有啥想不起:</div>
            <div class="basic-info-right">py交易</div>
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
      showPage: true
    };
  },
  methods: {}
};
</script>

<style scoped>
#basic-setting {
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.basic-page {
  padding: 10px;
}
.basic-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  word-break: break-all;
  padding: 10px 20px;
  margin-bottom: 20px;
}
/* 详情标题 */
.basic-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.basic-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.basic-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 详情内容 */
.basic-info-main {
  padding-top: 20px;
}
.basic-info-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.basic-info-left {
  width: 15%;
  text-align: right;
  color: #999999;
  font-weight: 600;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.basic-info-right {
  margin-left: 10px;
  width: 85%;
  text-align: left;
}
.basic-img-box {
  width: 20%;
  border: 1px solid #999999;
  border-radius: 5px;
  overflow: hidden;
  height: 0px;
  padding-bottom: 15%;
  position: relative;
}
.basic-img-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
.app-plus {
  background: #1abc9c;
  border-color: #1abc9c;
  padding: 8px 12px;
}
.app-plus:focus,
.app-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
.app-plus:disabled {
  background: #7cedd7;
  border-color: #7cedd7;
  color: #fff;
}
</style>