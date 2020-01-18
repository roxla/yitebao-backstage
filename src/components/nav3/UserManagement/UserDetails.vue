<template>
  <div id="user-details">
    <div class="details-page">
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
            <div class="details-info-right">{{data.consumerNo}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户姓名:</div>
            <div class="details-info-right">{{data.nickName}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户电话:</div>
            <div class="details-info-right">{{data.phone}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">消费总额:</div>
            <div class="details-info-right">114514114514</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">积分数:</div>
            <div class="details-info-right">{{data.integral}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">用户所在地:</div>
            <div class="details-info-right">{{data.address}}</div>
          </div>
          <div class="details-info-item">
            <div class="details-info-left">注册时间:</div>
            <div class="details-info-right">{{data.createTime}}</div>
          </div>
        </div>
      </div>
      <el-tabs class="user-details-tabs" type="border-card">
        <el-tab-pane>
          <span slot="label">洗护订单(0)</span>
          <div class="table-box-border">
            <div style="margin-top: 10px;"></div>
            <div v-for="(item,index) in laundryData" :key="index" class="table-box">
              <div class="table-icon">
                <img :src="testUrl" alt="img" />
              </div>
              <div class="table-item">2019-12-27 11:38:04</div>
              <div class="table-item">单号: PT15789821536258321343</div>
              <div class="table-item">件数: 2件</div>
              <div class="table-item">价格: ￥19.9</div>
              <div class="table-user">
                <div>张家辉</div>
                <div>13856996969</div>
              </div>
              <div class="table-item">杭州市拱墅区萍水街多少多少号</div>
              <div class="table-item">状态: 处理中</div>
              <div class="table-item">
                <el-button size="small">详情</el-button>
              </div>
            </div>
            <div v-show="laundryData.length <= 0" class="data-none">暂无数据</div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">商场订单(0)</span>
          <div class="table-box-border">
            <div style="margin-top: 10px;"></div>
            <div v-for="(item,index) in shopData" :key="index" class="table-box">
              <div class="table-icon">
                <img :src="testUrl" alt="img" />
              </div>
              <div class="table-item">2019-12-27 11:38:04</div>
              <div class="table-item">单号: PT15789821536258321343</div>
              <div class="table-item">件数: 2件</div>
              <div class="table-item">价格: ￥19.9</div>
              <div class="table-user">
                <div>张家辉</div>
                <div>13856996969</div>
              </div>
              <div class="table-item">杭州市拱墅区萍水街多少多少号</div>
              <div class="table-item">状态: 处理中</div>
              <div class="table-item">
                <el-button size="small">详情</el-button>
              </div>
            </div>
            <div v-show="shopData.length <= 0" class="data-none">暂无数据</div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">积分记录</span>
          <el-table height="calc(100vh - 477px)" :data="integralData" style="width: 100%">
            <el-table-column align="center" prop="date" label="积分操作"></el-table-column>
            <el-table-column align="center" prop="name" label="支出"></el-table-column>
            <el-table-column align="center" prop="address" label="操作单号"></el-table-column>
            <el-table-column align="center" prop="address" label="时间"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">名下会员卡({{data.cardNum}})</span>
          <el-table height="calc(100vh - 477px)" :data="cardData" style="width: 100%">
            <el-table-column align="center" prop="date" label="卡号"></el-table-column>
            <el-table-column align="center" prop="name" label="卡余额"></el-table-column>
            <el-table-column align="center" prop="address" label="卡类型"></el-table-column>
            <el-table-column align="center" prop="address" label="卡状态"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      testUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      laundryData: [],
      shopData: [],
      integralData: [],
      cardData: []
    };
  },
  created() {
    this.data = JSON.parse(this.$route.query.data);
    console.log(this.data);
  },
  methods: {}
};
</script>

<style scoped>
#user-details {
  overflow-y: auto;
}
.details-page {
  padding: 10px;
}
.details-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  word-break: break-all;
  padding: 20px;
  margin-bottom: 20px;
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
/* 订单表 */
.table-box-border {
  height: calc(100vh - 477px);
  overflow-y: auto;
}
.table-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 8px;
  background-color: #f7f8fc;
}
.table-icon {
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 2500px;
  margin-right: 7px;
}
.table-icon img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.table-item {
  padding: 0px 7px;
  border-left: 1px solid #cdeff1;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;
  max-width: 150px;
}
.table-user {
  padding: 4.5px 7px;
  border-left: 1px solid #cdeff1;
}
.data-none {
  height: calc(100vh - 487px);
  line-height: calc(100vh - 487px);
  font-size: 14px;
  color: #909399;
}
</style>