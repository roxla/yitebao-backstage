<template>
  <div id="merchandise-edit">
    <div class="merchandise-page" v-show="showPage">
      <div class="merchandise-info-box">
        <div class="merchandise-title-box">
          <div class="merchandise-info-title">
            商品基本信息
            <span></span>
          </div>
        </div>
        <div class="merchandise-info-main">
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商品分类:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商品类型:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商品名称:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div style="align-items: flex-start;" class="merchandise-info-item">
            <div class="merchandise-info-left">商品主图:</div>
            <div class="merchandise-info-right img-list">
              <div @click="showPic()" class="merchandise-img-box">
                <img :src="testImg" alt="img" />
              </div>
            </div>
          </div>
          <div style="align-items: flex-start;" class="merchandise-info-item">
            <div class="merchandise-info-left">商品详情描述:</div>
            <div class="merchandise-info-right">
              <div class="merchandise-info-textarea"></div>
            </div>
          </div>
          <div style="align-items: flex-start;" class="merchandise-info-item">
            <div class="merchandise-info-left">商品规格价格:</div>
            <div class="merchandise-info-right"></div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">发货城市:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">销售量:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">是否为特价商品:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">限购次数:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
        </div>
      </div>
      <div class="merchandise-info-box">
        <div class="merchandise-title-box">
          <div class="merchandise-info-title">
            商家基本信息
            <span></span>
          </div>
        </div>
        <div class="merchandise-info-main">
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商家编号:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商家名称:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商家所在地:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
          <div class="merchandise-info-item">
            <div class="merchandise-info-left">商家电话:</div>
            <div class="merchandise-info-right">114514</div>
          </div>
        </div>
      </div>
      <div class="merchandise-info-footer">
        <el-button type="success">通过申请</el-button>
        <div style="padding: 0px 15px;"></div>
        <el-button type="info">拒绝申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: true,
      testImg:"./static/img/zhanwei.jpg",
    };
  },
  methods:{
    showPic(img) {
      this.dialogImageUrl = img;
      this.dialogVisible = true;
    },
  }
};
</script>

<style scoped>
#merchandise-edit {
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.merchandise-page {
  padding: 10px;
}
.merchandise-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  padding: 10px 20px;
  margin-bottom: 20px;
}
.merchandise-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.merchandise-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.merchandise-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 详情内容 */
.merchandise-info-main {
  padding-top: 20px;
}
.merchandise-info-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.merchandise-info-left {
  width: 15%;
  text-align: right;
  color: #999999;
  font-weight: 600;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.merchandise-info-right {
  margin-left: 10px;
  width: 85%;
  text-align: left;
}
.merchandise-info-footer{
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.merchandise-info-textarea{
  max-height: 200px;
  width: 50%;
  word-break: break-all;
  overflow-y: auto;
}
/* 图片列表 */
.img-list {
  display: flex;
  align-items: center;
}
.img-list .merchandise-img-box {
  margin-right: 10px;
}
.merchandise-img-box {
  width: 20%;
  border: 1px solid #999999;
  border-radius: 5px;
  overflow: hidden;
  height: 0px;
  padding-bottom: 15%;
  position: relative;
}
.merchandise-img-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
</style>