<template>
  <div
    class="staff-item-box"
    :style="{borderRight:!isStaff?'0px':'',height:!isStaff?'140px':'',width:!isStaff?'325px':''}"
  >
    <div v-show="!isStaff" :style="{height:!isStaff?'30%':''}" class="staff-item-title">
      <!-- <div @click="go(cardallurl,cardalldata)" class="card-item-info">详情</div> -->
      <div @click="go(cardurl,cardInfo)" class="staff-item-edit">编辑</div>
      <div @click="cardDel" class="staff-item-del">删除</div>
    </div>
    <div v-show="isStaff" class="staff-item-title">
      <div @click="go(staffurl,staffInfo)" class="staff-item-edit">编辑</div>
      <div @click="staffDel" class="staff-item-del">删除</div>
    </div>
    <div v-show="!isStaff" class="card-item-main">
      <div class="card-item-name">
        <div>
          <div class="card-item-cost">
            ￥
            <span>{{cardInfo.money}}</span>元
          </div>
          <div>满{{cardInfo.fullPrice}}元可用</div>
        </div>
      </div>
      <div style="width: 92%;" class="staff-item-info">
        <div style="width: 100%;">
          <div class="card-item-title">{{cardInfo.couponName}}</div>
          <div v-show="cardInfo.couponType == 1" class="card-item-text">优惠券类型：洗护优惠券</div>
          <div v-show="cardInfo.couponType == 0" class="card-item-text">优惠券类型：商城优惠券</div>
          <div v-show="cardInfo.isRacking" class="card-item-text">是否上架：是</div>
          <div v-show="!cardInfo.isRacking" class="card-item-text">是否上架：否</div>
          <!-- <div v-show="cardInfo.shop" class="card-item-text">指定商品可用(详细查看详情)</div>
          <div v-show="!cardInfo.shop" class="card-item-text">全部商品可用</div>
          <div v-show="cardInfo.user" class="card-item-text">指定会员可领取(详细查看详情)</div>
          <div v-show="!cardInfo.user" class="card-item-text">全部会员可领取</div>-->
          <div class="card-item-text">有效期天数：{{cardInfo.validityDays}}天</div>
        </div>
      </div>
      <div class="card-icon-box">
        <div class="card-item-icon"></div>
      </div>
    </div>
    <div v-show="isStaff" class="staff-item-main">
      <div class="staff-item-name">{{staffInfo.bwName}}</div>
      <div class="staff-item-info">
        <div style="width: 100%;">
          <div class="staff-info-border">
            <div class="staff-info-title">员工手机号：</div>
            <div class="staff-info-text">{{staffInfo.phone}}</div>
          </div>
          <div class="staff-info-border">
            <div class="staff-info-title">员工性别：</div>
            <div class="staff-info-text">{{staffInfo.sex}}</div>
          </div>
          <div class="staff-info-border">
            <div class="staff-info-title">员工地址：</div>
            <div class="staff-info-text">{{staffInfo.detailsAddress}}</div>
          </div>
          <!-- <div class="staff-info-border">
            <div class="staff-info-title">员工类型：</div>
            <div class="staff-info-text">{{staffInfo.type}}</div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isStaff: {
      type: Boolean,
      default: true
    },
    // 员工
    staffInfo: {
      type: Object,
      default: function() {
        return {
          bwName: "员工名称",
          phone: "1111111111",
          sex: "男",
          detailsAddress: "azdsnfoikainbfioaqnbw4156165qasasdqaw4156q1afa"
        };
      }
    },
    staffurl: {
      type: String,
      default: "/main/staffmanagement/staffset"
    },
    staffdata: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 优惠券
    cardInfo: {
      type: Object,
      default: function() {
        return {
          cost: 12,
          text: "满10元可用",
          name: "优惠券名称",
          shop: true,
          user: true,
          day: "90"
        };
      }
    },
    // 优惠券详情
    cardallurl: {
      type: String,
      default: "/main/couponmanagement/couponinfo"
    },
    // 优惠券编辑
    cardurl: {
      type: String,
      default: "/main/couponmanagement/couponset"
    }
  },
  methods: {
    go(url, data) {
      if (!!data && JSON.stringify(data) != "{}") {
        let item = JSON.stringify(data);
        this.$router.push({
          path: url,
          query: {
            item
          }
        });
      } else {
        this.$router.push({ path: url });
      }
    },
    staffDel() {
      console.log("staffDel");
    },
    cardDel() {}
  }
};
</script>

<style scoped>
/* 员工信息卡 */
.staff-item-box {
  border: 1px solid #d7d7d7;
  width: 320px;
  height: 140px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
}
/* 员工信息头部 */
.staff-item-title {
  height: 27%;
  background-color: #eaeaea;
  border-right: 1px solid #d7d7d7;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
/* 员工信息按钮 */
.card-item-info,
.staff-item-edit,
.staff-item-del {
  padding: 6px 16px;
  color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid #d7d7d7;
  font-size: 14px;
  border-top: 0px;
}
.card-item-info:hover,
.staff-item-edit:hover,
.staff-item-del:hover {
  cursor: pointer;
}
.card-item-info {
  margin-right: 5px;
  background-color: #378aec;
}
.staff-item-edit {
  margin-right: 5px;
  background-color: #23c8ad;
}
.staff-item-del {
  background-color: #e8934f;
  border-right: 0px;
}
/* 员工信息 */
.card-item-main,
.staff-item-main {
  height: 73%;
  display: flex;
  background: #118eb5;
}
.card-item-main {
  height: 70%;
  background: #c8428a;
}
/* 员工姓名 */
.staff-item-name {
  height: 100%;
  width: 32%;
  background: linear-gradient(40deg, #027195, #25cee6);
  border-radius: 5px;
  border-top-left-radius: 0px;
  color: white;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 优惠券 */
.card-item-name {
  height: 100%;
  width: 40%;
  border-radius: 5px;
  border-top-left-radius: 0px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  font-size: 14px;
  background: #f7f7f7;
  box-sizing: border-box;
  box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-item-cost {
  color: #c8428a;
}
.card-item-cost span {
  font-size: 28px;
  font-weight: 500;
}
.card-icon-box {
  height: 100%;
  width: 9%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  border-right: 1px solid #d7d7d7;
}
.card-item-icon {
  border-top-left-radius: 2500px;
  border-bottom-left-radius: 2500px;
  background: white;
  width: 100%;
  height: 40%;
  position: absolute;
  z-index: 1;
  left: 1px;
}
/* 员工信息 */
.staff-item-info {
  width: 68%;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.staff-info-border {
  display: flex;
  align-items: flex-start;
  color: white;
}
.staff-info-title {
  width: 38%;
  text-align: right;
  height: 24px;
  line-height: 24px;
}
.staff-info-text {
  width: 60%;
  text-align: left;
  min-height: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 优惠券信息 */
.card-item-title {
  margin-left: 20px;
  text-align: left;
  color: white;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-item-text {
  margin-left: 20px;
  text-align: left;
  color: white;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>