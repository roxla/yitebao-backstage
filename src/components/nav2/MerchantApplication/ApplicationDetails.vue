<template>
  <div id="details-statistics">
    <div class="details-page" v-show="showPage">
      <div class="details-info-box">
        <div class="details-title-box">
          <div class="details-info-title">
            商家申请详情
            <span></span>
          </div>
        </div>
        <div class="details-info-main">
          <div class="details-info-item">
            <div class="details-info-left">申请商户号:</div>
            <div class="details-info-right">{{detailsData.fkMerchantNo}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">申请商家号:</div>
            <div class="details-info-right">{{detailsData.fkBusinessNo}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商家联系电话:</div>
            <div class="details-info-right">{{detailsData.userTel}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">申请商家类型:</div>
            <div class="details-info-right">{{detailsData.businessAudits.typeText}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">申请商家名称:</div>
            <div class="details-info-right">{{detailsData.businessAudits.businessName}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">申请时间:</div>
            <div class="details-info-right">{{detailsData.submissionTime}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">店铺地址:</div>
            <div class="details-info-right">{{detailsData.businessAudits.detailsAddress}}</div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">营业执照:</div>
            <div class="details-info-right">
              <div @click="showPic(detailsImg.prove)" class="details-img-box">
                <img :src="detailsImg.prove" alt="img" />
              </div>
            </div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">店内照片:</div>
            <div class="details-info-right img-list">
              <div
                v-for="(item,index) in detailsData.storeAudit"
                :key="index"
                @click="showPic(item)"
                class="details-img-box"
              >
                <img :src="item" alt="img" />
              </div>
            </div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">审核状态:</div>
            <div class="details-info-right">{{detailsData.isReviewText}}</div>
          </div>
        </div>
        <div class="details-info-footer">
          <el-button
            :disabled="detailsData.isReview"
            @click="dialogVisible1 = true"
            type="success"
          >通过申请</el-button>
          <div style="padding: 0px 15px;"></div>
          <el-button
            :disabled="detailsData.isReview"
            @click="dialogVisible2 = true"
            type="info"
          >拒绝申请</el-button>
        </div>
      </div>
    </div>
    <!-- 图片弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="img" />
    </el-dialog>
    <DialogFramework top="32vh" title="商户申请通过" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <RimFramework
          type="number"
          placeholder="请输入需缴纳的保证金"
          v-model.number="cash"
          marginLeft="0px"
          width="93%"
          :isRadius="true"
        />
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
    <DialogFramework top="32vh" title="拒绝商户申请" :visible.sync="dialogVisible2" width="30%">
      <div style="width: 100%;">
        <RimFramework
          type="textarea"
          placeholder="请输入拒绝理由"
          v-model="description"
          marginLeft="0px"
          width="93%"
          :isRadius="true"
        />
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
      dialogVisible: false,
      dialogImageUrl: "",
      detailsImg: {},
      detailsImgList: [],
      cash: "",
      description: "",
      dialogVisible1: false,
      dialogVisible2: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    showPic(img) {
      this.dialogImageUrl = img;
      this.dialogVisible = true;
    },
    getData() {
      let data = JSON.parse(this.$route.query.data);
      if (!!data.businessProveAudits) {
        for (let i = 0; i < data.businessProveAudits.length; i++) {
          if (data.businessProveAudits[i].proveType == 1) {
            if (
              data.businessProveAudits[i].storageType &&
              !data.businessProveAudits[i].prove
            ) {
              data.businessProveAudits[i].prove = "./static/img/zhanwei.jpg";
            }
            this.detailsImg = data.businessProveAudits[i];
          }
        }
      }
      if (!!data.storeAudit) {
        for (let j = 0; j < data.storeAudit.length; j++) {
          if (!data.storeAudit[j]) {
            data.storeAudit[j] = "./static/img/zhanwei.jpg";
          }
        }
      }
      this.detailsData = data;
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
.details-img-box {
  width: 20%;
  border: 1px solid #999999;
  border-radius: 5px;
  overflow: hidden;
  height: 0px;
  padding-bottom: 15%;
  position: relative;
}
.details-img-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
/* 图片列表 */
.img-list {
  display: flex;
  align-items: center;
}
.img-list .details-img-box {
  margin-right: 10px;
}
/* 按钮 */
.details-info-footer {
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>