<template>
  <div id="merchant-application">
    <div v-show="showPage" class="merchant-page">
      <div class="merchant-button-box">
        <div ref="input" class="search-input">
          <input
            v-model="merchantName"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入商户名称"
            type="text"
          />
        </div>
        <div style="padding: 0px 5px;"></div>
        <div ref="input" class="search-input">
          <input
            v-model="merchantNum"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入商户编号"
            type="text"
          />
        </div>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="getMerchantData()" type="primary" class="merchant-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="card-info-box">
        <el-table height="calc(100vh - 222px)" :data="merchantList" style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="申请时间" prop="createdTime"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="申请商户号" prop="userTel"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商户名称" prop="name"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="提现金额" prop="merchantType"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="状态" prop="money"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="收款账号" prop="money"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="getRowData(scope.$index, scope.row)" size="mini">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 5px 0px;">
          <el-pagination
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            :page-size="15"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, //总条数，根据接口获取数据长度
      currentPage: 1, //当前页数
      showPage: true,
      merchantName: "",
      merchantNum: "",
      merchantList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/merchantreminderapplication") {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  created() {
    this.getMerchantData();
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.path[1].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.path[1].style.borderColor = "black";
    },
    // 分页方法
    handleCurrentChange(val) {
      this.getCardData(val);
    },
    getMerchantData() {
      let obj = {
        item1: this.cardName,
        item2: this.cardNum,
        item3: this.cardValue,
        item4: "",
        item5: ""
      };
      this.axios.get("./static/Json/merchantApplication.json").then(res => {
        this.merchantList = res.data.data;
        this.total = res.data.total;
      });
    },
    getRowData(index, row) {
      this.$router.push({
        path: "merchantreminderapplication/withdrawdetails",
        query: {
          row
        }
      });
    }
  }
};
</script>

<style scoped>
#merchant-application {
  overflow-y: auto;
}
.merchant-page {
  padding: 10px;
}
/* 按钮存放位置 */
.merchant-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  padding: 10px;
}
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 20%;
  border: 2px solid black;
  border-radius: 3px;
}
.search-input input {
  width: 100%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
  margin: 0px;
}
.search-input input::placeholder {
  color: #999999;
}
/* 添加按钮 */
.merchant-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.merchant-plus:focus,
.merchant-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/*  */
.card-info-box {
  padding: 15px 0px 0px 10px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
}
</style>
