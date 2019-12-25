<template>
  <div id="shop-management">
    <div v-show="showPage" class="management-page">
      <div class="management-button-box">
        <div ref="input" class="search-input">
          <input
            v-model="manageName"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入商户名称"
            type="text"
          />
        </div>
        <el-button @click="getManageData()" type="primary" class="management-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
        <el-button type="primary" class="management-plus">
          <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
        </el-button>
      </div>
      <div class="management-info-box">
        <el-table height="calc(100vh - 222px)" :data="manageList" style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="商品图片">
            <template slot-scope="scope">
              <img class="management-img" :src="scope.row.img" alt="img">
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商品名称" prop="businessName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商家名称" prop="operatingText"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="售价" prop="openTime">
            <template slot-scope="scope">
              <div class="manage-cash">￥{{scope.row.cash}}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="销售量" prop="openTime"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="审核状态" prop="openTime">
            <template slot-scope="scope">
              <div :style="{'background':scope.row.color}" class="manage-state">{{scope.row.stateText}}</div>
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
      pageSize: pageSize,
      showPage: true,
      manageName:"",
      manageList: [
        {
          img:"./static/img/zhanwei.jpg",
          state:0,
          stateText:"审核中",
          color:"#FFBA42"
        }
      ]
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/shopmanagement") {
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
    handleCurrentChange(val) {
      
    },
    getManageData(){

    },
    getRowData(index, row){
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
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 30%;
  border: 2px solid black;
  border-radius: 3px;
  margin-right: 10px;
  margin-top: 10px;
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
.management-img{
  width: 80%;
  border-radius: 6px;
}
.manage-state{
  color: white;
  width: 70%;
  margin: auto;
  border-radius: 2500px;
  font-size: 14px;
}
</style>