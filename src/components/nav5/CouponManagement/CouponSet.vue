<template>
  <div class="coupon-set">
    <div class="coupon-title">领取和使用规则</div>
    <div class="coupon-main">
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>优惠券名称：
        </div>
        <div class="coupon-item-text">
          <RimFramework
            placeholder="请输入优惠券名称"
            v-model="couponName"
            marginLeft="10px"
            width="30%"
            :isRadius="true"
          />
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>优惠券金额：
        </div>
        <div class="coupon-item-text">
          <RimFramework
            type="number"
            placeholder="请输入优惠券金额"
            v-model="couponCash"
            marginLeft="10px"
            width="30%"
            :isRadius="true"
          />
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>发放总量：
        </div>
        <div class="coupon-item-text">
          <RimFramework
            type="number"
            placeholder="请输入发放总量"
            v-model="couponNum"
            marginLeft="10px"
            width="30%"
            :isRadius="true"
          />
        </div>
      </div>
      <div style="align-items: flex-start;" class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>是否上架：
        </div>
        <div style="margin-left: 12px;" class="coupon-item-text">
          <div style="text-align: left;">
            <div style="margin-bottom: 5px;">
              <el-radio v-model="isRacking" :label="true">是</el-radio>
            </div>
            <div>
              <el-radio v-model="isRacking" :label="false">否</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div style="align-items: flex-start;" class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>适用商户：
        </div>
        <div style="margin-left: 12px;">
          <div class="coupon-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio @change="clickAll" v-model="couponType" label="laundryAll">全部洗护商家可用</el-radio>
            </div>
            <div>
              <el-radio v-model="couponType" label="laundryItem">指定洗护商家可用</el-radio>
              <el-checkbox-group
                class="set-coupon-box"
                v-model="checkedLaundry"
                @change="handleCheckedLaundryChange"
                :disabled="couponType!=='laundryItem'"
              >
                <el-checkbox
                  class="set-coupon-item"
                  v-for="item in laundry"
                  :label="item.fkBusinessNo"
                  :key="item.index"
                >{{item.businessName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="coupon-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio @change="clickAll" v-model="couponType" label="shopAll">全部商品商家可用</el-radio>
            </div>
            <div>
              <el-radio v-model="couponType" label="shopItem">指定商品商家可用</el-radio>
              <el-checkbox-group
                class="set-coupon-box"
                v-model="checkedShop"
                @change="handleCheckedShopChange"
                :disabled="couponType!=='shopItem'"
              >
                <el-checkbox
                  class="set-coupon-item"
                  v-for="item in shop"
                  :label="item.fkBusinessNo"
                  :key="item.index"
                >{{item.businessName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>优惠内容：
        </div>
        <div class="coupon-item-text">
          <div class="coupon-item-info">
            <div style="margin-left: 10px;">订单满</div>
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                placeholder="请输入金额"
                v-model="couponCost"
                marginLeft="0px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>元</div>
          </div>
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>用券时间：
        </div>
        <div class="coupon-item-text">
          <div class="coupon-item-info">
            <div style="margin-left: 10px;">领券当日起</div>
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                placeholder="请输入时间"
                v-model="couponTime"
                marginLeft="0px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>天内可用</div>
          </div>
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>截止领取时间：
        </div>
        <div style="margin-left: 10px;">
          <el-date-picker
            class="coupon-end-time"
            size="small"
            v-model="endTime"
            type="datetime"
            placeholder="请选择截止领取时间"
            @focus="changeColor"
            @blur="reChange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </div>
      <!-- </div>
    <div class="coupon-title">领取和使用规则</div>
      <div class="coupon-main">-->
      <div style="align-items: flex-start;" class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>使用门槛：
        </div>
        <div style="margin-left: 12px;" class="coupon-item-text">
          <div class="coupon-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio v-model="useAuthority" label="all">不限制，所有人可领</el-radio>
            </div>
            <div>
              <el-radio v-model="useAuthority" label="item">指定会员等级可领</el-radio>
              <div style="margin: 5px 0px 0px 25px">
                <el-select
                  multiple
                  collapse-tags
                  :disabled="useAuthority==''||useAuthority=='all'"
                  v-model="authorityValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>每人限领次数：
        </div>
        <div class="coupon-item-text">
          <div class="coupon-item-info">
            <div style="margin-left: 10px;">限领</div>
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                placeholder="请输入限领次数"
                type="number"
                v-model="getNum"
                marginLeft="0px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>次</div>
          </div>
        </div>
      </div>
      <div style="align-items: flex-start;" class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>使用说明：
        </div>
        <div class="coupon-item-text editor-item">
          <editor-bar v-model="useText" :isClear="isClear"></editor-bar>
        </div>
      </div>
      <!-- <div style="align-items: flex-start;" class="coupon-item-box">
        <div class="coupon-item-title">
          <span>*</span>是否立即上架：
        </div>
        <div>
          <el-switch v-model="isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div> -->
    </div>
    <div class="coupon-footer">
      <el-button @click="postCoupon" type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button @click="go('/main/couponmanagement')" type="info">
        <span style="padding: 0px 20px;">取 消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import RimFramework from "@/common/rim-framework.vue";
import EditorBar from "@/common/wangenduit.vue";
export default {
  components: {
    RimFramework,
    EditorBar
  },
  data() {
    return {
      couponName: "", //优惠券名称
      couponCash: "", //优惠券金额
      couponNum: "", //发放总量
      couponCost: "", //优惠内容
      couponTime: "", //用券时间
      endTime: "", //截止领取时间
      getNum: "", //每人限领次数
      useText: "", //使用说明
      isRacking: false, //是否上架
      // 洗护
      couponType: "",
      laundry: [],
      checkedLaundry: [],
      // 商品
      shop: [],
      checkedShop: [],
      // 使用门槛
      useAuthority: "",
      authorityValue: [],
      options: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      isClear: false
    };
  },
  created() {
    this.getShopList();
    this.getCardList();
  },
  mounted() {
    if (!!this.$route.query.item) {
      let data = JSON.parse(this.$route.query.item);
      this.couponName = data.couponName;
      this.couponCash = data.money;
      this.couponNum = data.num;
      this.couponCost = data.fullPrice;
      this.couponTime = data.validityDays;
      this.endTime = data.endTime;
      this.getNum = data.collect;
      this.useText = data.details;
      this.isRacking = data.isRacking;
      if (data.couponType == 0) {
        if (!!data.bindingBusinesses && data.bindingBusinesses.length > 0) {
          this.couponType = "shopItem";
          for (let i = 0; i < data.bindingBusinesses.length; i++) {
            this.checkedShop[i] = data.bindingBusinesses[i].fkBusinessNo;
          }
        } else {
          this.couponType = "shopAll";
        }
      } else if (data.couponType == 1) {
        if (!!data.bindingBusinesses && data.bindingBusinesses.length > 0) {
          this.couponType = "laundryItem";
          for (let i = 0; i < data.bindingBusinesses.length; i++) {
            this.checkedLaundry[i] = data.bindingBusinesses[i].fkBusinessNo;
          }
        } else {
          this.couponType = "laundryAll";
        }
      }
      if (!!data.bindingCardTypes && data.bindingCardTypes.length > 0) {
        this.useAuthority = "item";
        for (let i = 0; i < data.bindingCardTypes.length; i++) {
          this.authorityValue = data.bindingCardTypes[i].fkCardTypeNo;
        }
      } else {
        this.useAuthority = "all";
      }
    }
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.refInput[0].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.refInput[0].style.borderColor = "black";
    },
    // 单选框方法
    clickAll() {
      this.checkedLaundry = [];
      this.checkedShop = [];
    },
    // 多选框方法
    handleCheckedLaundryChange(value) {
      if (value.length === this.laundry.length) {
        this.checkedLaundry = [];
        this.checkedShop = [];
        this.couponType = "laundryAll";
      }
    },
    handleCheckedShopChange(value) {
      if (value.length === this.shop.length) {
        this.checkedShop = [];
        this.checkedLaundry = [];
        this.couponType = "shopAll";
      }
    },
    replaceSeperator(mobiles) {
      let result = "";
      let c;
      for (let i = 0; i < mobiles.length; i++) {
        c = mobiles.substr(i, 1);
        if (c == "\n") result = result + "<br/>";
        else if (c != "\r") result = result + c;
      }
      return result;
    },
    // 获取列表
    getShopList() {
      let port = "handlers/business/getBusinessListClose";
      let obj = {};
      let upData = this.$axios.upData(port, obj);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          let laundry = [];
          let shop = [];
          for (let i = 0; i < data.length; i++) {
            if (!data[i].businessName) {
              data[i].businessName = data[i].businessNo;
            }
            if (data[i].businessType == 2) {
              laundry.push({
                fkBusinessNo: data[i].businessNo,
                businessName: data[i].businessName
              });
            } else if (data[i].businessType == 1) {
              shop.push({
                fkBusinessNo: data[i].businessNo,
                businessName: data[i].businessName
              });
            }
          }
          this.laundry = laundry;
          this.shop = shop;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getCardList() {
      let port = "handlers/cardType/getCardTypeList";
      let upData = this.$axios.upData(port);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          let list = [];
          for (let i = 0; i < data.length; i++) {
            list.push({ label: data[i].typeName, value: data[i].cardTypeNo });
          }
          this.options = list;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 提交
    postCoupon() {
      if (
        !!this.couponName &&
        !!this.endTime &&
        !!this.useText &&
        (this.useAuthority == "all" ||
          (this.useAuthority == "item" && this.authorityValue.length > 0))
      ) {
        if (!!this.couponCash) {
          if (!!this.couponNum) {
            if (!!this.couponCost) {
              if (!!this.couponTime) {
                if (!!this.getNum) {
                  if (
                    this.couponType == "laundryAll" ||
                    this.couponType == "shopAll" ||
                    (this.couponType == "laundryItem" &&
                      this.checkedLaundry.length > 0) ||
                    (this.couponType == "shopItem" &&
                      this.checkedShop.length > 0)
                  ) {
                    // 发送请求
                    // let useText = this.replaceSeperator(this.useText); //替换回车
                    let port = "activity/coupon/addCoupon";
                    let cardTypes = [];
                    let binding = [];
                    let obj = {
                      couponName: this.couponName,
                      num: this.couponNum,
                      endTime: this.endTime,
                      fullPrice: this.couponCost,
                      money: this.couponCash,
                      collect: this.getNum,
                      details: this.useText,
                      validityDays: this.couponTime,
                      isRacking: this.isRacking
                    };
                    if (
                      this.couponType == "laundryAll" ||
                      this.couponType == "laundryItem"
                    ) {
                      obj.couponType = 1;
                      if (this.couponType == "laundryItem") {
                        for (let i = 0; i < this.checkedLaundry.length; i++) {
                          for (let j = 0; j < this.laundry.length; j++) {
                            if (
                              this.checkedLaundry[i] ==
                              this.laundry[j].fkBusinessNo
                            ) {
                              binding.push(this.laundry[j]);
                            }
                          }
                        }
                      } else {
                        binding = this.checkedLaundry;
                      }
                    } else if (
                      this.couponType == "shopAll" ||
                      this.couponType == "shopItem"
                    ) {
                      obj.couponType = 0;
                      if (this.couponType == "shopItem") {
                        for (let i = 0; i < this.checkedShop.length; i++) {
                          for (let j = 0; j < this.shop.length; j++) {
                            if (
                              this.checkedShop[i] == this.shop[j].fkBusinessNo
                            ) {
                              binding.push(this.shop[j]);
                            }
                          }
                        }
                      } else {
                        binding = this.checkedShop;
                      }
                    }
                    if (this.authorityValue.length > 0) {
                      for (let i = 0; i < this.authorityValue.length; i++) {
                        for (let j = 0; j < this.options.length; j++) {
                          if (this.authorityValue[i] == this.options[j].value) {
                            cardTypes.push({
                              fkCardTypeNo: this.options[j].value,
                              cardTypeName: this.options[j].label
                            });
                          }
                        }
                      }
                    }
                    obj.bindingBusinesses = binding;
                    obj.bindingCardTypes = cardTypes;
                    let upData = this.$axios.upData(port, obj);
                    upData.then(res => {
                      if (res.data.status == 200) {
                        this.$message.success("设置成功");
                        this.$router.push({ path: "/main/couponmanagement" });
                      } else if (res.data.status == 588) {
                        this.$message.error(res.data.msg);
                        this.checkLogin();
                      } else {
                        this.$message.error(res.data.msg);
                      }
                    });
                  } else {
                    this.$message.warning("请选择商户分类");
                  }
                } else {
                  this.$message.warning("每人限领次数只能为数字");
                }
              } else {
                this.$message.warning("用券时间只能为数字");
              }
            } else {
              this.$message.warning("优惠内容只能为数字");
            }
          } else {
            this.$message.warning("发放总量只能为数字");
          }
        } else {
          this.$message.warning("优惠券金额只能为数字");
        }
      } else {
        this.$message.warning("有必填项未填写，请检查并填写");
      }
    },
    go(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>

<style scoped>
.coupon-set {
  background: white;
  margin-left: 25px;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
/* 优惠券设置标题 */
.coupon-title {
  margin: 20px 10px 10px 0px;
  padding: 13px 25px;
  text-align: left;
  background-color: #f2f2f2;
  font-size: 14px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
/* 优惠券设置主体 */
.coupon-main {
  margin-right: 10px;
}
/* 优惠券设置子项 */
.coupon-item-box {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.coupon-item-box:last-of-type {
  margin-bottom: 0px;
}
/* 优惠券设置子项标题 */
.coupon-item-title {
  width: 15%;
  text-align: right;
  font-size: 14px;
}
.coupon-item-title span {
  font-size: 16px;
  color: red;
}
/* 优惠券设置子项内容 */
.coupon-item-text {
  width: 87%;
}
.coupon-item-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.coupon-item-radio {
  text-align: left;
  margin-bottom: 10px;
}
.coupon-item-radio:last-of-type {
  margin-bottom: 0px;
}
.set-coupon-box {
  margin-left: 25px;
}
.set-coupon-item {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  margin-bottom: 5px;
  margin-right: 15px;
  /* width: 10%; */
}
/* 优惠券按钮 */
.coupon-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px 20px;
}
/* 编辑器 */
.editor-item {
  width: 72%;
  margin-left: 10px;
}
</style>