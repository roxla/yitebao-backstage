<template>
  <div id="merchant-details">
    <div class="details-page" v-show="showPage">
      <div class="details-info-box">
        <div class="details-title-box">
          <div class="details-info-title">
            商户详情
            <span></span>
          </div>
        </div>
        <div class="details-info-main">
          <div class="details-info-item">
            <div class="details-info-left">商户编号:</div>
            <div class="details-info-right">{{detailsData.fkMerchantNo}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商户联系地址:</div>
            <div class="details-info-right">{{merchantData.address}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商户余额:</div>
            <div class="details-info-right">{{merchantData.cash}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商户状态:</div>
            <div style="width: auto;" class="details-info-right">
              <span style="margin-right: 10px;">{{merchantData.stateText}}</span>
            </div>
            <div>
              <el-button
                @click="changeMerchantState(false)"
                v-show="merchantData.state"
                size="mini"
                type="primary"
                class="merchant-button"
              >冻结商户</el-button>
              <el-button
                @click="changeMerchantState(true)"
                v-show="!merchantData.state"
                size="mini"
                type="primary"
                class="merchant-button"
              >解冻商户</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="details-info-box">
        <div class="details-title-box">
          <div class="details-info-title">
            商家店铺详情
            <span></span>
          </div>
        </div>
        <div class="details-info-main">
          <div class="details-info-item">
            <div class="details-info-left">商家名称:</div>
            <div class="details-info-right">{{detailsData.businessName}}</div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">商家LOGO:</div>
            <div class="details-info-right">
              <div @click="showPic(detailsData.logo)" class="details-logo-box">
                <img :src="detailsData.logo" alt="img" />
              </div>
            </div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">商家首页图:</div>
            <div class="details-info-right">
              <div @click="showPic(detailsData.homeBg)" class="details-img-box">
                <img :src="detailsData.homeBg" alt="img" />
              </div>
            </div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">店内图片:</div>
            <div class="details-info-right img-list">
              <div @click="showPic(testImg)" class="details-img-box">
                <img :src="testImg" alt="img" />
              </div>
            </div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">店铺编号:</div>
            <div class="details-info-right">{{detailsData.businessNo}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">客服电话:</div>
            <div class="details-info-right">{{detailsData.serviceTel}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">营业时间:</div>
            <div class="details-info-right">{{detailsData.openTime}} - {{detailsData.closingTime}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商家地址:</div>
            <div class="details-info-right">{{detailsData.detailsAddress}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">商家状态:</div>
            <div style="width: auto;" class="details-info-right">
              <span style="margin-right: 10px;">{{detailsData.businessText}}</span>
            </div>
            <div>
              <el-button v-show="!detailsData.isState" size="mini" type="primary" class="merchant-button">冻结商家</el-button>
              <el-button v-show="detailsData.isState" size="mini" type="primary" class="merchant-button">解冻商家</el-button>
            </div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">保证金:</div>
            <div class="details-info-right">已缴纳￥3200元</div>
          </div>
          <div style="align-items: flex-start;" class="details-info-item">
            <div class="details-info-left">店铺描述:</div>
            <div class="details-info-right">
              <span v-show="!detailsData.descriptions">该店铺还没有描述</span>
              <div
                v-show="detailsData.descriptions"
                class="details-info-textarea"
              >{{detailsData.descriptions}}</div>
            </div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">使用平台优惠券:</div>
            <div class="details-info-right">
              <el-switch
                style="display: block"
                v-model="couponValue"
                active-color="#13ce66"
                active-text="可以使用"
                inactive-text="不可使用"
                :width="35"
                @change="useCoupon"
              ></el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 图片弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="img" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: true,
      detailsData: {},
      merchantData: {},
      dialogVisible: false,
      dialogImageUrl: "",
      testImg: "./static/img/zhanwei.jpg",
      couponValue: true
    };
  },
  created() {
    this.detailsData = this.$route.query.data;
    this.couponValue = this.$route.query.data.isUseplatformCoupon;
  },
  mounted() {
    if (
      JSON.stringify(this.$route.query.data) ==
      JSON.stringify("[object Object]") ||
      !this.$route.query.data
    ) {
      this.$router.push({ path: "/main/merchantmanagement" });
    }else{
      this.getMerchantData(this.$route.query.data.fkMerchantNo);
    }
  },
  methods: {
    showPic(img) {
      this.dialogImageUrl = img;
      this.dialogVisible = true;
    },
    getMerchantData(No) {
      let port = "handlers/mer/getMerchantList";
      let obj = {
        merchantNo: No
      };
      let specialData = this.$axios.specialData(port, obj);
      specialData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          if (data[0].merchantState) {
            data[0].stateText = "未冻结";
          } else {
            data[0].stateText = "已冻结";
          }
          this.merchantData = {
            stateText: data[0].stateText,
            state: data[0].merchantState,
            address: data[0].detailsAddress,
            cash: data[0].wallet.toFixed(2)
          };
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    changeMerchantState(state) {
      console.log(this.detailsData.fkMerchantNo);
      let port = "handlers/mer/blackListMerchant";
      let obj = {
        merchantNo: this.detailsData.fkMerchantNo,
        merchantState: state
      }
      let specialData = this.$axios.specialData(port, obj);
      specialData.then(res => {
        if (res.data.status == 200) {
          this.$message.success(res.data.data);
           this.getMerchantData(this.detailsData.fkMerchantNo);
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    useCoupon(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
#merchant-details {
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
  padding: 10px 20px;
  margin-bottom: 20px;
}
/* 标题设置 */
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
  padding-top: 10px;
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
.details-logo-box {
  width: 15%;
  border: 1px solid #999999;
  border-radius: 5px;
  overflow: hidden;
  height: 0px;
  padding-bottom: 15%;
  position: relative;
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
.details-logo-box img,
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
.details-info-textarea {
  width: 50%;
  word-break: break-all;
}
/* 按钮 */
.merchant-button {
  background: #1abc9c;
  border-color: #1abc9c;
}
.merchant-button:focus,
.merchant-button:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
</style>