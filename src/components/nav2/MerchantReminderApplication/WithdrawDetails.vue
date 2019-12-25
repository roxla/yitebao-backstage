<template>
  <div id="details-statistics">
    <div class="details-page" v-show="showPage">
      <div class="details-info-box">
        <div class="details-title-box">
          <div class="details-info-title">
            商户申请详情
            <span></span>
          </div>
        </div>
        <div class="details-info-main">
          <div class="details-info-item">
            <div class="details-info-left">申请商户号:</div>
            <div class="details-info-right">114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商户名称:</div>
            <div class="details-info-right">野兽先辈</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">收款方式:</div>
            <div class="details-info-right">py交易</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">收款账号:</div>
            <div class="details-info-right">114514114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">申请时间:</div>
            <div class="details-info-right">{{detailsData.createdTime}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">提现金额:</div>
            <div class="details-info-right">114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">提现状态:</div>
            <div class="details-info-right">审核中</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">已审核次数:</div>
            <div class="details-info-right">123</div>
          </div>
        </div>
        <div class="details-info-footer">
          <el-button  @click="dialogVisible1 = true" type="success">通过申请</el-button>
          <div style="padding: 0px 15px;"></div>
          <el-button type="info">拒绝申请</el-button>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <DialogFramework top="32vh" title="审核通过" :visible.sync="dialogVisible1" width="30%">
      <div style="padding: 15px 0px;font-size: 18px;color: red;font-weight: 700;">
        <span>请确认账户余额是否充足！</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false" size="small" class="dialog-close">
          <i class="el-icon-circle-close el-icon--left"></i>取消
        </el-button>
        <el-button @click="dialogVisible1 = false" size="small" class="dialog-success">
          <i class="el-icon-circle-check el-icon--left"></i>确定
        </el-button>
      </span>
    </DialogFramework>
  </div>
</template>

<script>
import DialogFramework from "@/common/dialog-framework.vue";
import RimFramework from "@/common/rim-framework.vue";
export default {
  components: {
    DialogFramework,
    RimFramework
  },
  data() {
    return {
      showPage: true,
      detailsData: {},
      dialogVisible1: false,
      dialogImageUrl: "",
      testImg:'./static/img/zhanwei.jpg'
    };
  },
  created() {
    this.detailsData = this.$route.query.row;
  },
  methods:{
    showPic(img){
      this.dialogImageUrl = img;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
#details-statistics {
  height: calc(100vh - 59px);
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
/* 申请详情标题 */
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
/* 申请详情内容 */
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
/* 图片列表 */
.img-list{
  display: flex;
  align-items: center;
}
.img-list .details-img-box{
  margin-right: 10px;
}
/* 按钮 */
.details-info-footer{
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-success {
  background: #02bda6;
  border-color: #02bda6;
  color: #fff;
}
.dialog-success:focus,
.dialog-success:hover {
  background: #02bda6;
  border-color: #02bda6;
  color: #fff;
}
.dialog-close {
  background: #c9c9c9;
  border-color: #c9c9c9;
  color: #fff;
}
.dialog-close:focus,
.dialog-close:hover {
  background: #c9c9c9;
  border-color: #c9c9c9;
  color: #fff;
}
</style>