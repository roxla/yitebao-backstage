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
            <div class="charge-info-right">{{charge.fkCardNo}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作时间:</div>
            <div class="charge-info-right">{{charge.createTime}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作金额:</div>
            <div class="charge-info-right">{{charge.capital}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作类型:</div>
            <div class="charge-info-right">{{charge.typeText}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作方式:</div>
            <div class="charge-info-right">{{charge.detailsText}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">卡类型:</div>
            <div class="charge-info-right">{{charge.cardTypeName}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">流水号:</div>
            <div class="charge-info-right">{{charge.cardOperateRecordNo}}</div>
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
            <div class="charge-info-right">{{give.fkCardNo}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作时间:</div>
            <div class="charge-info-right">{{give.createTime}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作金额:</div>
            <div class="charge-info-right">{{give.capital}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作类型:</div>
            <div class="charge-info-right">{{give.typeText}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">操作方式:</div>
            <div class="charge-info-right">{{give.detailsText}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">卡类型:</div>
            <div class="charge-info-right">{{give.cardTypeName}}</div>
          </div>
          <div class="charge-info-item">
            <div class="charge-info-left">流水号:</div>
            <div class="charge-info-right">{{give.cardOperateRecordNo}}</div>
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
      charge: {},
      give: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = JSON.parse(this.$route.query.data);
      // console.log(data);
      if (data.detailsText == "充值") {
        this.charge = data;
        this.getOtherData("充值", data);
      } else if (data.detailsText == "赠送") {
        this.give = data;
        this.getOtherData("赠送", data);
      }
    },
    getOtherData(type, data) {
      let port = "handlers/cardOperateRecord/getCardOperateRecord";
      let obj = {
        cardOperateRecordNo: data.bindNo
      };
      if (type == "赠送") {
        obj.operationDetails = 0;
      } else if (type == "充值") {
        obj.operationDetails = 1;
      }
      let upData = this.$axios.upData(port, obj);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data.list[0];
          if (!!data.operationType) {
            data.typeText = "收入";
          } else {
            data.typeText = "支出";
          }
          switch (data.operationDetails) {
            case 0:
              data.detailsText = "充值";
              break;
            case 1:
              data.detailsText = "赠送";
              break;
          }
          if (type == "赠送") {
            this.charge = data;
          } else if (type == "充值") {
            this.give = data;
          }
          console.log(this.give);
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