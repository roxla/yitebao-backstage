<template>
  <div id="merchant-application">
    <div v-show="showPage" class="merchant-page">
      <div class="merchant-button-box">
        <el-select class="search-select" v-model="typeValue" placeholder="请选择申请状态">
          <el-option label="全部状态" value></el-option>
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="padding: 0px 5px;"></div>
        <el-select class="search-select" v-model="merchantValue" placeholder="请选择商户">
          <el-option label="全部商户" value></el-option>
          <el-option
            v-for="item in merchantOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="getMerchantData()" type="primary" class="merchant-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="card-info-box">
        <el-table height="calc(100vh - 222px)" :data="merchantList" style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="申请时间" prop="submissionTime"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="联系电话" prop="userTel"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="商家名称"
            prop="businessAudits.businessName"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="商家类型"
            prop="businessAudits.typeText"
          ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="保证金" prop="money"></el-table-column>
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
            :page-size="pageSize"
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
const pageSize = 15; //一页显示多少行
export default {
  data() {
    return {
      total: 0, //总条数，根据接口获取数据长度
      currentPage: 1, //当前页数
      pageSize: pageSize,
      showPage: true,
      typeOptions: [],
      typeValue: "",
      merchantOptions: [],
      merchantValue: "",
      merchantList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/merchantapplication") {
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
    // 分页方法
    handleCurrentChange(val) {
      this.getCardData(val);
    },
    getMerchantData() {
      let port = "handlers/businessReview/getBusinessReviewList";
      let obj = {};
      let pages = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      let upData = this.$axios.upData(port, obj, pages);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            switch (data[i].businessAudits.businessType) {
              case 1:
                data[i].businessAudits.typeText = "商城商家";
                break;
              case 2:
                data[i].businessAudits.typeText = "洗护商家";
                break;
            }
            if (data[i].isReview) {
              data[i].isReviewText = "已审核";
            } else {
              data[i].isReviewText = "未审核";
            }
          }
          this.merchantList = data;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // let obj = {
      //   item1: this.cardName,
      //   item2: this.cardNum,
      //   item3: this.cardValue,
      //   item4: "",
      //   item5: ""
      // };
      // this.axios.get("/static/Json/merchantApplication.json").then(res => {
      //   this.merchantList = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    getRowData(index, row) {
      let data = JSON.stringify(row);
      this.$router.push({
        path: "merchantapplication/applicationdetails",
        query: {
          data
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
