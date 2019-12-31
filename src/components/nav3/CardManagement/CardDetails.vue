<template>
  <div id="card-details">
    <div class="details-page">
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
              <div class="details-info-right">114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户姓名:</div>
              <div class="details-info-right">野兽先辈</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户电话:</div>
              <div class="details-info-right">py交易</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">消费总额:</div>
              <div class="details-info-right">114514114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">积分数:</div>
              <div class="details-info-right">{{}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">用户所在地:</div>
              <div class="details-info-right">114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">注册时间:</div>
              <div class="details-info-right">审核中</div>
            </div>
          </div>
        </div>
        <div style="padding-top: 10px;" class="details-info-box">
          <div class="details-title-box">
            <div class="details-info-title">
              会员卡信息
              <span></span>
            </div>
            <div class="app-title-button">
              <el-button type="primary" class="card-disable">卡冻结</el-button>
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
              <div class="details-info-right">114514114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡折扣率:</div>
              <div class="details-info-right">{{cardData.cardDiscount}}</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡充值总额:</div>
              <div class="details-info-right">114514</div>
            </div>
            <div class="details-info-item">
              <div class="details-info-left">卡消费总额:</div>
              <div class="details-info-right">审核中</div>
            </div>
          </div>
        </div>
      </div>
      <div class="details-bottom-box">
        <el-tabs class="card-details-tabs" type="border-card">
          <el-tab-pane label="卡操作记录">
            <el-table height="calc(100vh - 535px)" :data="setData" style="width: 100%">
              <el-table-column align="center" prop="name" show-overflow-tooltip label="单号"></el-table-column>
              <el-table-column align="center" prop="name" show-overflow-tooltip label="时间"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="类型"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="金额"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="方式"></el-table-column>
              <el-table-column align="center" prop="address" show-overflow-tooltip label="单号"></el-table-column>
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
                @current-change="setChange"
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
    </div>
  </div>
</template>

<script>
const pageSize = 15; //一页显示多少行
export default {
  data() {
    return {
      cardData: {},
      pageSize: pageSize,
      setData: [],
      setTotal: 0, //总条数，根据接口获取数据长度
      setPage: 1, //当前页数
      changeData: [],
      changeTotal: 0,
      changePage: 1
    };
  },
  mounted() {
    this.cardData = JSON.parse(this.$route.query.data);
    console.log(this.cardData);
  },
  methods: {
    // 卡操作分页方法
    setChange() {},
    changeBeetle() {},
    getRowData(index, row) {
      console.log(row);
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