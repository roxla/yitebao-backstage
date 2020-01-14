<template>
  <div id="card-details">
    <div v-show="showPage" class="details-page">
      <div class="details-top-box">
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
              <div class="details-info-right">{{cardData.fkConsumerNo}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户昵称:</div>
              <div class="details-info-right">{{userData.nickName}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户电话:</div>
              <div class="details-info-right">{{userData.phone}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">消费总额:</div>
              <div class="details-info-right">114514114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">积分数:</div>
              <div class="details-info-right">{{userData.integral}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户所在地:</div>
              <div class="details-info-right">{{userData.address}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">注册时间:</div>
              <div class="details-info-right">{{userData.createTime}}</div>
            </div>
          </div>
        </div>
        <div style="padding-top: 10px;" class="details-info-box">
          <div class="details-title-box">
            <div class="details-info-title">
              会员卡信息
              <span></span>
            </div>
            <div v-show="!cardData.isCardState" class="app-title-button">
              <el-button @click="dialogVisible = true" type="primary" class="card-disable">卡冻结</el-button>
            </div>
            <div v-show="cardData.isCardState" class="app-title-button">
              <el-button @click="dialogVisible = true" type="primary" class="card-disable">卡解冻</el-button>
            </div>
          </div>
          <div class="details-info-main">
            <div class="details-info-item">
              <div class="details-info-left">会员卡号:</div>
              <div class="details-info-right">{{cardData.cardNo}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡内余额:</div>
              <div class="details-info-right">{{cardData.cardBalance}}元</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡类型:</div>
              <div class="details-info-right">{{cardData.cardTypeName}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡有效期:</div>
              <div class="details-info-right">{{}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡折扣率:</div>
              <div class="details-info-right">{{cardData.cardDiscount}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡充值总额:</div>
              <div class="details-info-right">{{}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡消费总额:</div>
              <div class="details-info-right">{{}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="details-bottom-box">
        <el-tabs class="card-details-tabs" type="border-card">
          <el-tab-pane label="卡操作记录">
            <el-table height="calc(100vh - 535px)" :data="setData" style="width: 100%">
              <el-table-column
                align="center"
                prop="cardOperateRecordNo"
                show-overflow-tooltip
                label="单号"
              ></el-table-column>
              <el-table-column align="center" prop="createTime" show-overflow-tooltip label="时间"></el-table-column>
              <el-table-column align="center" prop="typeText" show-overflow-tooltip label="类型"></el-table-column>
              <el-table-column align="center" prop="capital" show-overflow-tooltip label="金额"></el-table-column>
              <el-table-column align="center" prop="detailsText" show-overflow-tooltip label="方式"></el-table-column>
              <el-table-column align="center" prop="bindNo" show-overflow-tooltip label="操作单号"></el-table-column>
              <el-table-column align="center" label="操作">
                <template v-slot="scope">
                  <el-button
                    type="primary"
                    @click="getRowData(scope.$index, scope.row)"
                    size="mini"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="padding: 5px 0px;">
              <el-pagination
                :current-page.sync="setPage"
                @current-change="getCardOperate()"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="setTotal"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="卡转换记录">
            <el-table height="calc(100vh - 550px)" :data="changeData" style="width: 100%">
              <el-table-column align="center" prop="name" show-overflow-tooltip label="转换时间"></el-table-column>
              <el-table-column align="center" prop="name" show-overflow-tooltip label="转换前折扣率"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="转换后折扣率"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="转换前余额"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="转换后余额"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="转换前卡类型"></el-table-column>
            </el-table>
            <div style="padding: 5px 0px;">
              <el-pagination
                :current-page.sync="changePage"
                @current-change="changeBeetle"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="changeTotal"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <DialogFramework top="35vh" title="确认弹窗" :visible.sync="dialogVisible" width="30%">
        <div v-show="!cardData.isCardState" style="padding: 15px 0px;font-size: 14px;">
          <span>确认冻结该会员卡？</span>
        </div>
        <div v-show="cardData.isCardState" style="padding: 15px 0px;font-size: 14px;">
          <span>确认解冻该会员卡？</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small" class="dialog-close">
            <i class="el-icon-circle-close el-icon--left"></i>取消
          </el-button>
          <el-button @click="cardDel" size="small" class="dialog-danger">
            <i class="el-icon-switch-button el-icon--left"></i>确认
          </el-button>
        </span>
      </DialogFramework>
    </div>
    <router-view v-show="!showPage" />
  </div>
</template>

<script>
import DialogFramework from "@/common/dialog-framework.vue";
const pageSize = 15; //一页显示多少行
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      showPage: true,
      userData: {},
      cardData: {},
      pageSize: pageSize,
      setData: [],
      setTotal: 0, //总条数，根据接口获取数据长度
      setPage: 1, //当前页数
      changeData: [],
      changeTotal: 0,
      changePage: 1,
      dialogVisible: false
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/cardmanagement/carddetails") {
          this.showPage = true;
          if(!!this.$route.query.data){
            this.cardData = JSON.parse(this.$route.query.data);
          }
          this.getUserData(this.cardData.fkConsumerNo);
          this.getCardOperate();
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取用户信息
    getUserData(No) {
      let port = "handlers/consumers/getConsumersInfo";
      let obj = {
        consumerNo: No
      };
      let upData = this.$axios.upData(port, obj);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data[0];
          data.createTime = this.formatDate(new Date(data.createTime));
          this.userData = data;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取操作记录
    getCardOperate() {
      let obj = {
        fkCardNo: this.cardData.cardNo
      };
      let pages = {
        pageNum: this.setPage,
        pageSize: this.pageSize
      };
      let port = "handlers/cardOperateRecord/getCardOperateRecord";
      let upData = this.$axios.upData(port, obj, pages);
      upData.then(res => {
        if (res.data.status == 200) {
          this.setTotal = res.data.data.total;
          let data = res.data.data.list;
          for (let i = 0; i < data.length; i++) {
            if (!!data[i].operationType) {
              data[i].typeText = "收入";
            } else {
              data[i].typeText = "支出";
            }
            switch (data[i].operationDetails) {
              case 0:
                data[i].detailsText = "充值";
                break;
              case 1:
                data[i].detailsText = "赠送";
                break;
              case 2:
                data[i].detailsText = "退款";
                break;
              case 3:
                data[i].detailsText = "洗护消费";
                break;
              case 4:
                data[i].detailsText = "商品消费";
                break;
              case 5:
                data[i].detailsText = "补款";
                break;
            }
          }
          this.setData = data;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 卡操作分页方法
    changeBeetle() {},
    getRowData(index, row) {
      let data = JSON.stringify(row.cardOperateRecordNo);
      let url;
      switch (row.operationDetails) {
        case 0:
          url = "carddetails/chargedetails";
          break;
        case 1:
          url = "carddetails/givedetails";
          break;
        case 3:
          url = "/main/backpage/laundryserviceorder";
          break;
        case 4:
          url = "商品消费";
          break;
      }
      this.$router.push({
        path: url,
        query: {
          data
        }
      });
    },
    cardDel() {
      let cardState;
      if (!!this.cardData.isCardState) {
        cardState = 0; //解冻
      } else {
        cardState = 2; //冻结
      }
      let obj = {
        cardNo: this.cardData.cardNo,
        cardState: cardState
      };
      let port = "handlers/cardManage/carSetState";
      let upData = this.$axios.upData(port, obj);
      upData.then(res => {
        if (res.data.status == 200) {
          if (!!this.cardData.isCardState) {
            this.$message.success("解冻成功");
          } else {
            this.$message.success("冻结成功");
          }
          this.$router.push({ path: "/main/cardmanagement" });
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
#card-details {
  overflow-y: auto;
}
.details-page {
  padding: 10px;
}
.details-top-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.details-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  word-break: break-all;
  padding: 20px;
  margin-bottom: 20px;
  width: calc((100% - 90px) / 2);
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
/* 按钮 */
.card-disable {
  background: #1abc9c;
  border-color: #1abc9c;
  padding: 8px 12px;
}
.card-disable:focus,
.card-disable:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
.card-disable:disabled {
  background: #7cedd7;
  border-color: #7cedd7;
  color: #fff;
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
  width: 25%;
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
</style>