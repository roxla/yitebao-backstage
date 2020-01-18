<template>
  <div id="card-issue">
    <div v-show="showPage" class="card-page">
      <tabs v-model="active">
        <tab title="批量发卡">
          <div class="item-main">
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                批量发卡起始号
              </div>
              <div class="item-input-box">
                <RimFramework
                  v-model="startNum"
                  padding="10px"
                  type="number"
                  placeholder="请输入起始号"
                  marginLeft="0px"
                  width="80%"
                  :isRadius="true"
                />
              </div>
            </div>
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                批量发卡终止号
              </div>
              <div class="item-input-box">
                <RimFramework
                  v-model="endNum"
                  padding="10px"
                  type="number"
                  placeholder="请输入终止号"
                  marginLeft="0px"
                  width="80%"
                  :isRadius="true"
                />
              </div>
            </div>
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                发行单位
              </div>
              <div class="item-input-box">
                <RimFramework
                  padding="10px"
                  placeholder="请输入发行单位"
                  marginLeft="0px"
                  width="80%"
                  :isRadius="true"
                />
              </div>
            </div>
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                充值金额
              </div>
              <div class="item-input-box">
                <RimFramework
                  padding="10px"
                  type="number"
                  placeholder="请输入充值金额"
                  marginLeft="0px"
                  width="80%"
                  :isRadius="true"
                />
              </div>
            </div>
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                获赠金额
              </div>
              <div class="item-input-box">
                <RimFramework
                  padding="10px"
                  type="number"
                  placeholder="请输入获赠金额"
                  marginLeft="0px"
                  width="80%"
                  :isRadius="true"
                />
              </div>
            </div>
            <div class="item-box">
              <div class="item-title-text">
                <span>*</span>
                发行卡类型
              </div>
              <div style="display: flex;" class="item-input-box">
                <el-select
                  style="width: 88%;"
                  class="search-select"
                  v-model="cardValue"
                  placeholder="请选择卡类型"
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
          <div class="item-footer">
            <el-button @click="checkData()" type="primary" class="card-plus">确认发行</el-button>
          </div>
        </tab>
        <tab title="发卡详情">
          <div class="item-search-box">
            <el-date-picker
              class="search-date"
              :editable="false"
              v-model="timeValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="发行时间起"
              end-placeholder="发行时间止"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
            <div style="width: 10px;"></div>
            <el-select class="search-select" v-model="userValue" placeholder="请选择发行员工">
              <el-option label="全部员工" value></el-option>
              <el-option
                v-for="item in userOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div style="width: 10px;"></div>
            <el-input class="search-set-input" placeholder="请输入发行单位" v-model="shopValue"></el-input>
            <div style="width: 10px;"></div>
            <el-select class="search-select" v-model="isUse" placeholder="是否使用">
              <el-option label="全部状态" value></el-option>
              <el-option label="已使用" :value="true"></el-option>
              <el-option label="未使用" :value="false"></el-option>
            </el-select>
            <div style="width: 10px;"></div>
            <el-button @click="getCardData()" type="primary" class="card-plus">
              <i class="el-icon-search el-icon--left"></i>搜索
            </el-button>
          </div>
          <div class="item-table-box">
            <el-table height="calc(100vh - 283px)" border :data="tableData" style="width: 100%">
              <el-table-column prop="date" align="center" show-overflow-tooltip label="发行时间"></el-table-column>
              <el-table-column prop="name" align="center" show-overflow-tooltip label="发行员工"></el-table-column>
              <el-table-column prop="address" align="center" show-overflow-tooltip label="发行单位名称"></el-table-column>
              <el-table-column prop="date" align="center" show-overflow-tooltip label="卡号"></el-table-column>
              <el-table-column prop="name" align="center" show-overflow-tooltip label="发行卡类型"></el-table-column>
              <el-table-column prop="address" align="center" show-overflow-tooltip label="充值额"></el-table-column>
              <el-table-column prop="address" align="center" show-overflow-tooltip label="赠送额"></el-table-column>
              <el-table-column prop="address" align="center" show-overflow-tooltip label="是否使用"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    @click="getRowData(scope.$index, scope.row)"
                    size="mini"
                  >导出数据</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="padding: 5px 0px;">
              <el-pagination
                :current-page.sync="currentPage"
                @current-change="getCardData"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </tab>
      </tabs>
    </div>
    <DialogFramework top="35vh" title="确定批量发卡" :visible.sync="dialogVisible1" width="30%">
      <div class="dialog-box">
        <div class="dialog-item">发行卡号： -</div>
        <div class="dialog-item">发行总量：张</div>
        <div class="dialog-item">
          卡内储值金额：
          <span></span>元（充值元赠送元）
        </div>
        <div class="dialog-item">卡使用密码：请查询发行记录，导出查看</div>
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
const pageSize = 15; //一页显示多少行
import tabs from "@/common/tabs/tabs-framework.vue";
import tab from "@/common/tabs/tab-framework.vue";
import RimFramework from "@/common/rim-framework.vue";
import DialogFramework from "@/common/dialog-framework.vue";
import Blob from "@/excel/Blob.js";
import Export2Excel from "@/excel/Export2Excel";
export default {
  components: {
    RimFramework,
    DialogFramework,
    tabs,
    tab
  },
  data() {
    return {
      active: 0,
      total: 0, //总条数，根据接口获取数据长度
      currentPage: 1, //当前页数
      pageSize: pageSize,
      showPage: true,
      startNum: "",
      endNum: "",
      options: [],
      cardValue: "",
      timeValue: [],
      userOptions: [],
      userValue: "",
      shopValue: "",
      isUse: "",
      tableData: [],
      dialogVisible1: false
    };
  },
  created() {
    this.getStaffData();
    this.getCardType();
  },
  methods: {
    getCardType() {
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
    checkData() {
      if (!!cardValue || !!this.startNum || this.endNum) {
        if (parseInt(this.startNum) < parseInt(this.endNum)) {
          this.dialogVisible1 = true;
        }
      }
    },
    getStaffData() {
      let port = "handlers/worker/getWorkerList";
      let upData = this.$axios.upData(port);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data.list;
          console.log(data);
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      })
      this.userOptions;
    },
    getCardData() {},
    export2Excel(index, data) {
      if (200) {
        require.ensure([], () => {
          const { export_json_to_excel } = require("../../excel/Export2Excel");
          const tHeader = [
            "券编号",
            "券名称",
            "购买时间",
            "兑换时间",
            "金额",
            "状态"
          ]; // 上面设置Excel的表格第一行的标题
          const filterVal = [
            "cashCouponRecordNo",
            "cashCouponName",
            "purchasingDate",
            "useDate",
            "cashCouponMoney",
            "isEmploy"
          ]; // 上面的index、phone_Num、school_Name是tableData里对象的属性
          const list = this.tableData; //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          const fileName = "核销报表";
          export_json_to_excel(tHeader, data, fileName);
        });
      }
    }
  }
};
</script>

<style scoped>
#card-issue {
  overflow: auto;
}
.item-main {
  padding: 0px 20px 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item-box {
  width: calc((100% - 40px) / 3);
  margin-bottom: 20px;
}
.item-title-text {
  text-align: left;
  font-size: 15px;
  margin-bottom: 5px;
  color: #8e8e8e;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
.item-title-text span {
  color: red;
}
.item-footer {
  margin: 0px 10px;
  padding: 10px 0px;
  border-top: 1px solid rgba(142, 142, 142, 0.3);
}
/* 搜索框 */
.item-search-box {
  display: flex;
  padding: 0px 20px 10px;
  align-items: center;
}
.search-set-input {
  width: 20%;
}
.search-select {
  width: 15%;
}
.search-date {
  width: 36%;
}
.item-table-box {
  padding: 10px 20px 0px;
}
/* 按钮 */
.card-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.card-plus:focus,
.card-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 弹窗内容 */
.dialog-box {
  text-align: left;
  font-size: 14px;
}
.dialog-item {
  margin-bottom: 10px;
}
.dialog-item span {
  font-size: 16px;
  font-weight: bold;
}
</style>