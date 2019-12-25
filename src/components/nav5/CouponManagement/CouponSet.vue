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
          <span>*</span>适用商户：
        </div>
        <div style="margin-left: 12px;">
          <div class="coupon-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio v-model="useLaundry" label="all">全部洗护商家可用</el-radio>
            </div>
            <div>
              <el-radio v-model="useLaundry" label="item">指定洗护商家可用</el-radio>
              <el-checkbox-group
                class="set-coupon-box"
                v-model="checkedLaundry"
                @change="handleCheckedLaundryChange"
                :disabled="useLaundry==''||useLaundry=='all'"
              >
                <el-checkbox
                  class="set-coupon-item"
                  v-for="item in laundry"
                  :label="item"
                  :key="item.index"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="coupon-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio v-model="useShop" label="all">全部洗护商家可用</el-radio>
            </div>
            <div>
              <el-radio v-model="useShop" label="item">指定洗护商家可用</el-radio>
              <el-checkbox-group
                class="set-coupon-box"
                v-model="checkedShop"
                @change="handleCheckedShopChange"
                :disabled="useShop==''||useShop=='all'"
              >
                <el-checkbox
                  class="set-coupon-item"
                  v-for="item in shop"
                  :label="item"
                  :key="item.index"
                >{{item.name}}</el-checkbox>
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
              <el-radio v-model="useAuthority" label="all">全部洗护商家可用</el-radio>
            </div>
            <div>
              <el-radio v-model="useAuthority" label="item">指定洗护商家可用</el-radio>
              <div style="margin: 5px 0px 0px 25px">
                <el-select
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
          <editor-bar v-model="detail" :isClear="isClear"></editor-bar>
        </div>
      </div>
    </div>
    <div class="coupon-footer">
      <el-button @click="postCoupon" type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button type="info">
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
      // 洗护
      useLaundry: "",
      laundry: [
        {
          name: "洗护商家1"
        },
        {
          name: "洗护商家2"
        }
      ],
      checkedLaundry: [],
      // 商品
      useShop: "",
      shop: [
        {
          name: "商品商家1"
        },
        {
          name: "商品商家2"
        }
      ],
      checkedShop: [],
      // 使用门槛
      useAuthority: "",
      authorityValue: "选项1",
      options: [
        {
          value: "选项1",
          label: "有卡用户"
        },
        {
          value: "选项2",
          label: "无卡用户"
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      isClear: false,
      detail: ""
    };
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.refInput[0].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.refInput[0].style.borderColor = "black";
    },
    // 多选框方法
    handleCheckedLaundryChange(value) {
      if (value.length === this.laundry.length) {
        this.checkedLaundry = [];
        this.useLaundry = "all";
      }
    },
    handleCheckedShopChange(value) {
      if (value.length === this.shop.length) {
        this.checkedShop = [];
        this.useShop = "all";
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
    // 提交
    postCoupon() {
      if (
        !!this.couponName &&
        !!this.endTime &&
        !!this.useText &&
        !!this.useLaundry &&
        !!this.useShop &&
        !!this.useAuthority
      ) {
        if (!!this.couponCash) {
          if (!!this.couponNum) {
            if (!!this.couponCost) {
              if (!!this.couponTime) {
                if (!!this.getNum) {
                  if (
                    this.useLaundry == "all" ||
                    (this.useLaundry == "item" &&
                      this.checkedLaundry.length > 0)
                  ) {
                    if (
                      this.useShop == "all" ||
                      (this.useShop == "item" && this.checkedLaundry.length > 0)
                    ) {
                      // 发送请求
                      // let useText = this.replaceSeperator(this.useText); //替换回车
                      let obj = {};
                      if (this.useShop == "all") {
                      } else {
                      }
                      if (this.useLaundry == "all") {
                      } else {
                      }
                    } else {
                      this.$message.warning("请选择商品商户权限");
                    }
                  } else {
                    this.$message.warning("请选择洗衣商户权限");
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
.editor-item{
  width: 72%;
  margin-left: 10px;
}
</style>