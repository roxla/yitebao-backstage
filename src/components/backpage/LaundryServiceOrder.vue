<template>
  <div id="laundry-service-order">
    <div class="shop-info-box">
      <div class="shop-info-icon">
        <img :src="shopIcon" alt="img" />
      </div>
      <div class="shop-info-item">
        店铺名称:
        <span>123</span>
      </div>
      <div class="shop-info-item">
        店铺电话:
        <span>132</span>
      </div>
      <div class="shop-info-item">
        商家编号:
        <span>123</span>
      </div>
    </div>
    <div class="order-state-box">
      <div class="order-state-text">
        当前订单状态:
        <span>已下单(待付款)</span>
      </div>
    </div>
    <tabs v-model="active">
      <tab title="订单详情">
        <div>123</div>
      </tab>
      <tab title="取配信息">
        <div class="delivery-info-box">
          <div class="delivery-title-box">
            <div class="delivery-info-title">收取信息</div>
            <div class="delivery-info-main">123</div>
          </div>
          <div class="delivery-title-box">
            <div class="delivery-info-title">收取进度记录</div>
            <div class="delivery-info-main">
              <el-steps direction="vertical" :active="step1">
                <el-step v-for="(item,index) in receiveInfo" :key="index">
                  <span slot="title">123</span>
                  <span slot="description">123</span>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <div class="delivery-info-box">
          <div class="delivery-title-box">
            <div class="delivery-info-title">配送信息</div>
            <div class="delivery-info-main">123</div>
          </div>
          <div class="delivery-title-box">
            <div class="delivery-info-title">配送进度记录</div>
            <div class="delivery-info-main">
              <el-steps direction="vertical" :active="step2">
                <el-step v-for="(item,index) in deliveryInfo" :key="index">
                  <span slot="title">{{item.text}}</span>
                  <span slot="description">
                    <div>{{item.info}}</div>
                    <div>{{item.time}}</div>
                  </span>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
      </tab>
      <tab title="顾客评价">
        <div class="customer-rate-box">
          <div class="rate-box">
            <div class="rate-title">
              <span>物品评价</span>
              <el-rate
                :value="3.7"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
            <div class="rate-title">
              <span>物流评价</span>
              <el-rate
                :value="3.7"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
            <div class="rate-title">
              <span>商家评价</span>
              <el-rate
                :value="3.7"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
          </div>
          <div style="margin-bottom: 10px;" class="customer-text-box">
            顾客评价:
            <div class="customer-text"></div>
          </div>
          <div class="customer-text-box">
            商家回复:
            <div class="customer-text"></div>
          </div>
        </div>
      </tab>
      <tab title="退补款">
        <div style="margin-top: 10px;font-size: 14px;">
          <div v-show="JSON.stringify(refund)!='{}'" class="refund-info-box">
            <div class="refund-title-box">
              <div class="refund-info-title">退款信息</div>
            </div>
            <div class="refund-info-main">
              <div class="refund-info-item">
                <div class="refund-info-left">订单编号:</div>
                <div class="refund-info-right">{{refund.name}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">状态:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">退款金额:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">退款成功时间:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">商家编号:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
            </div>
          </div>
          <div v-show="JSON.stringify(toll)!='{}'" class="refund-info-box">
            <div class="refund-title-box">
              <div class="refund-info-title">补款信息</div>
            </div>
            <div class="refund-info-main">
              <div class="refund-info-item">
                <div class="refund-info-left">订单编号:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">创建时间:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">状态:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">补款金额:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">用户补款时间:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">交易方式:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">是否已补款:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
              <div class="refund-info-item">
                <div class="refund-info-left">补款说明:</div>
                <div class="refund-info-right">{{}}</div>
              </div>
            </div>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import tabs from "@/common/tabs2/tabs-framework.vue";
import tab from "@/common/tabs2/tab-framework.vue";
export default {
  components: {
    tabs,
    tab
  },
  data() {
    return {
      shopIcon:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      shopInfo: {},
      active: 0,
      step1: 0,
      receiveInfo: [],
      step2: 0,
      deliveryInfo: [],
      refund: {
        name:"123"
      },
      toll: {
        name:"123"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/static/Json/deliveryList.json").then(res => {
        this.deliveryInfo = res.data.list;
        if (!!res.data.complete) {
          this.step2 = parseInt(res.data.list.length);
        } else {
          this.step2 = parseInt(res.data.list.length) - 1;
        }
      });
    },
  }
};
</script>

<style scoped>
#laundry-service-order {
  height: calc(100vh - 75px);
  overflow-y: auto;
  padding: 15px 5px 0px;
}
.shop-info-box {
  margin: 0px 10px 10px;
  padding: 10px 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
}
.shop-info-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 2500px;
  overflow: hidden;
}
.shop-info-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shop-info-item {
  margin: 10px;
  font-size: 15px;
  font-weight: 700;
}
.shop-info-item span {
  margin-left: 5px;
  font-weight: normal;
}
.order-state-box {
  background-color: #fff7ec;
  padding: 10px 20px;
  margin: 0px 10px 15px;
  border: 3px solid #fde5c5;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
}
.order-state-text {
  font-size: 15px;
  font-weight: 700;
}
.order-state-text span {
  margin: 6px;
  color: #00b5a9;
}
/* 取配信息 */
.delivery-info-box {
  border: 2px solid #26caac;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
}
.delivery-title-box {
  margin-bottom: 15px;
}
.delivery-info-title {
  border-left: 4px solid #f5bc10;
  text-align: left;
  padding-left: 15px;
  font-weight: 700;
  font-size: 14px;
}
.delivery-info-main {
  text-align: left;
  margin: 10px 0px 0px 40px;
  font-size: 14px;
}
/* 顾客评价 */
.customer-rate-box {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.35);
  padding: 10px 20px;
  margin-top: 10px;
}
.rate-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.customer-item {
  font-size: 15px;
  font-weight: 700;
  color: #717171;
}
.customer-item span {
  margin: 0px 20px 0px 3px;
  font-weight: normal;
  color: black;
}
.rate-title {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.rate-title span {
  padding-right: 5px;
  font-size: 15px;
  font-weight: 700;
  color: #717171;
}
.customer-text-box {
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  color: #717171;
}
.customer-text {
  border: 2px solid #26caac;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
}
/* 退补款 */
.refund-info-box {
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
.refund-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.refund-info-title {
  font-size: 15px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.refund-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 详情内容 */
.refund-info-main {
  padding-top: 10px;
}
.refund-info-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 15px;
}
.refund-info-left {
  width: 12%;
  text-align: right;
  color: #999999;
  font-weight: 600;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.refund-info-right {
  margin-left: 10px;
  width: 85%;
  text-align: left;
}
</style>