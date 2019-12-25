<template>
  <div id="merchant-management">
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
        <div ref="input" class="search-input">
          <input
            v-model="merchantNum"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入商户编号"
            type="text"
          />
        </div>
        <el-date-picker
          class="search-date"
          :editable="false"
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开店时间起"
          end-placeholder="开店时间止"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-select class="search-select" v-model="typeValue" placeholder="请选择营业状态">
          <el-option label="全部状态" value></el-option>
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="search-select" v-model="merchantValue" placeholder="请选择商户">
          <el-option label="全部商家" value></el-option>
          <el-option
            v-for="item in merchantOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getMerchantData()" type="primary" class="merchant-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="card-info-box">
        <el-table height="calc(100vh - 275px)" :data="merchantList" style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="商家编号" prop="businessNo"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="商家名称" prop="businessName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="营业状态" prop="operatingText"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="商家类型"
            prop="businessTypeText"
          ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="开店时间" prop="openTime"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="getRowData(scope.$index, scope.row)" size="mini">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 5px 0px;">
          <el-pagination
            :current-page.sync="currentPage"
            @current-change="getMerchantData"
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
      merchantName: "",
      merchantNum: "",
      typeOptions: [],
      typeValue: "",
      merchantOptions: [],
      merchantValue: "",
      timeValue: [],
      merchantList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/merchantmanagement") {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  mounted() {
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
    getMerchantData() {
      let port = "business/getBusinessListClose";
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
            if(data[i].businessState == 504){
              data[i].isState = true;
            }else{
              data[i].isState = false;
            }
            switch (data[i].businessState) {
              case 100:
                data[i].businessText = "未审核";
                break;
              case 105:
                data[i].businessText = "未支付保证金";
                break;
              case 200:
                data[i].businessText = "通过审核";
                break;
              case 500:
                data[i].businessText = "未通过审核";
                break;
              case 504:
                data[i].businessText = "已冻结";
                break;
            }
            switch (data[i].operatingState) {
              case 210:
                data[i].operatingText = "营业";
                break;
              case 215:
                data[i].operatingText = "休息";
                break;
              case 205:
                data[i].operatingText = "停业";
                break;
            }
            switch (data[i].businessType) {
              case 1:
                data[i].businessTypeText = "商城商家";
                break;
              case 2:
                data[i].businessTypeText = "洗护商家";
                break;
            }
            if (!data[i].homeBg) {
              data[i].homeBg = "./static/img/zhanwei.jpg";
            }
            if (!data[i].logo) {
              data[i].logo = "./static/img/zhanwei.jpg";
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
    getRowData(index, data) {
      this.$router.push({
        path: "merchantmanagement/merchantdetails",
        query: {
          data
        }
      });
    }
  }
};
</script>

<style scoped>
#merchant-management {
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
  padding: 0px 10px 10px;
}
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 18%;
  border: 2px solid black;
  border-radius: 3px;
  margin-right: 10px;
  margin-top: 10px;
}
.search-select {
  width: 18%;
  margin-right: 10px;
  margin-top: 10px;
}
.search-select:last-of-type {
  margin-right: 20px;
}
.search-date {
  width: 36%;
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
.merchant-plus {
  background: #1abc9c;
  border-color: #1abc9c;
  margin-top: 10px;
}
.merchant-plus:focus,
.merchant-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 主体内容 */
.card-info-box {
  padding: 15px 0px 0px 10px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
}
</style>
