<template>
  <div id="shop-management">
    <div v-show="showPage" class="management-page">
      <div class="management-button-box">
        <el-date-picker
          class="search-date"
          :editable="false"
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-input class="search-set-input" v-model="shopName" placeholder="请输入商品名称"></el-input>
        <el-input class="search-set-input" v-model="business" placeholder="请输入商家名称"></el-input>
        <el-select class="search-select" v-model="typeValue" placeholder="请选择审核状态">
          <el-option label="全部状态" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getManageData()" type="primary" class="management-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="management-info-box">
        <el-table height="calc(100vh - 222px)" :data="manageList" style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="商品图片">
            <template slot-scope="scope">
              <img class="management-img" :src="scope.row.commLogo" alt="img" />
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商品名称" prop="commName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商家名称" prop="businessName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="售价">
            <template slot-scope="scope">
              <div class="manage-cash">￥{{scope.row.price}}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="销售量" prop="num"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="审核状态">
            <template slot-scope="scope">
              <div
                :style="{'background':scope.row.state.color}"
                class="manage-state"
              >{{scope.row.state.stateName}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
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
    <router-view v-show="!showPage" />
  </div>
</template>

<script>
const pageSize = 15; //一页显示多少行
export default {
  data() {
    return {
      total: 0, //总条数，根据接口获取数据长度
      currentPage: 1, //当前页数
      pageSize,
      showPage: true,
      timeValue: [],
      shopName: "",
      business: "",
      typeValue: "",
      options: [],
      manageList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/shopmanagement") {
          this.getManageData();
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.path[1].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.path[1].style.borderColor = "black";
    },
    handleCurrentChange(val) {},
    getManageData() {
      let port = "mall/commManage/viewCommodityAudit";
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
            if (!data[i].commLogo) {
              data[i].commLogo = "./static/img/zhanwei.jpg";
            }
            switch (data[i].state.stateNo) {
              case 0:
                data[i].state.color = "#FFBA42";
                break;
              case 1:
                data[i].state.color = "#5AD48A";
                break;
              case 2:
                data[i].state.color = "#EF7171";
                break;
            }
          }
          this.manageList = data;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getRowData(index, row) {
      let data = JSON.stringify(row);
      this.$router.push({
        path: "shopmanagement/merchandiseedit",
        query: {
          data
        }
      });
    }
  }
};
</script>

<style scoped>
#shop-management {
  overflow-y: auto;
}
.management-page {
  padding: 10px;
}
/* 按钮存放位置 */
.management-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  padding: 0px 10px 10px;
}
.search-select {
  width: 14%;
  margin-top: 10px;
  margin-right: 10px;
}
.search-date {
  width: 36%;
  margin-top: 10px;
  margin-right: 10px;
}
.search-set-input {
  width: 18%;
  margin-top: 10px;
  margin-right: 10px;
}
/* 添加按钮 */
.management-plus {
  background: #1abc9c;
  border-color: #1abc9c;
  margin-top: 10px;
}
.management-plus:focus,
.management-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 主体内容 */
.management-info-box {
  padding: 15px 0px 0px 10px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
}
.management-img {
  width: 80%;
  border-radius: 6px;
}
.manage-state {
  color: white;
  width: 70%;
  margin: auto;
  border-radius: 2500px;
  font-size: 14px;
}
.manage-cash {
  color: #a30014;
  font-weight: 700;
}
</style>