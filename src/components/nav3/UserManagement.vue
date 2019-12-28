<template>
  <div id="user-management">
    <div v-show="showPage" class="user-page">
      <div class="user-button-box">
        <div ref="input" class="search-input">
          <input
            v-model="userNum"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入会员卡编号"
            type="text"
          />
        </div>
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
        <el-select class="search-select" v-model="userValue" placeholder="请选择卡类型">
          <el-option label="全部卡类型" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getuserData()" type="primary" class="user-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="user-info-box">
        <el-table height="calc(100vh - 222px)" :data="userList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="会员卡编号:">
                  <span>{{ props.row.userNo }}</span>
                </el-form-item>
                <el-form-item label="卡类型名称:">
                  <span>{{ props.row.userTypeName }}</span>
                </el-form-item>
                <el-form-item label="会员卡折扣:">
                  <span>{{ props.row.userDiscount }}%</span>
                </el-form-item>
                <el-form-item label="会员卡状态:">
                  <span>{{ props.row.userStateText }}</span>
                </el-form-item>
                <el-form-item label="是否为团洗卡:">
                  <span>{{ props.row.isBoonText }}</span>
                </el-form-item>
                <el-form-item label="会员卡余额:">
                  <span>{{ props.row.userBalance.toFixed(2) }}</span>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="结束时间:">
                  <span>{{ props.row.endTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="会员卡编号" prop="userNo"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="会员卡名称" prop="userTypeName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="创建时间" prop="createTime"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="会员卡状态" prop="userStateText"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="go()" type="primary" size="mini">详情</el-button>
              <el-popconfirm
                icon="el-icon-info"
                title="确认冻结该卡？"
                @onConfirm="userDelete(scope.$index, scope.row)"
              >
                <el-button
                  v-show="!scope.row.isuserState"
                  size="mini"
                  type="warning"
                  slot="reference"
                >冻结</el-button>
              </el-popconfirm>
              <el-popconfirm
                icon="el-icon-info"
                title="确认解冻该卡？"
                @onConfirm="userDelete(scope.$index, scope.row)"
              >
                <el-button
                  v-show="scope.row.isuserState"
                  size="mini"
                  type="warning"
                  slot="reference"
                >解冻</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 5px 0px;">
          <el-pagination
            :current-page.sync="currentPage"
            @current-change="getuserData"
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
      userNum: "",
      options: [],
      userValue: "",
      timeValue: [],
      userList: []
    };
  },
  created() {
    this.getuserData();
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/usermanagement") {
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
    // 跳转
    go(url, row) {
      let data = JSON.stringify(row);
      this.$router.push({
        path: url,
        query: {
          data
        }
      });
    },
    getuserData() {
      
    },
    userDelete() {
    
    }
  }
};
</script>

<style scoped>
#user-management {
  overflow-y: auto;
}
.user-page {
  padding: 10px;
}
/* 按钮存放位置 */
.user-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  padding: 0px 10px 10px;
}
.user-info-box {
  padding: 15px 0px 0px 10px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
}
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 15%;
  border: 2px solid black;
  border-radius: 3px;
  margin-top: 10px;
  margin-right: 10px;
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
/* 添加按钮 */
.user-plus {
  background: #1abc9c;
  border-color: #1abc9c;
  margin-top: 10px;
}
.user-plus:focus,
.user-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 会员卡表格 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
</style>