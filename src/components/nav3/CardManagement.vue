<template>
  <div id="card-management">
    <div v-show="showPage" class="card-page">
      <div class="card-button-box">
        <div ref="input" class="search-input">
          <input
            v-model="userName"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入会员卡名称"
            type="text"
          />
        </div>
        <div ref="input" class="search-input">
          <input
            v-model="cardNum"
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
        <el-select class="search-select" v-model="cardValue" placeholder="请选择卡类型">
          <el-option label="全部卡类型" value></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getCardData()" type="primary" class="card-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
      <div class="card-info-box">
        <el-table height="calc(100vh - 222px)" :data="cardList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="会员卡编号:">
                  <span>{{ props.row.cardNo }}</span>
                </el-form-item>
                <el-form-item label="会员卡名称:">
                  <span>{{ props.row.cardTypeName }}</span>
                </el-form-item>
                <el-form-item label="会员卡折扣:">
                  <span>{{ props.row.cardDiscount }}%</span>
                </el-form-item>
                <el-form-item label="会员卡状态:">
                  <span>{{ props.row.cardStateText }}</span>
                </el-form-item>
                <el-form-item label="是否为团洗卡:">
                  <span>{{ props.row.isBoonText }}</span>
                </el-form-item>
                <el-form-item label="会员卡余额:">
                  <span>{{ props.row.cardBalance.toFixed(2) }}</span>
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
          <el-table-column show-overflow-tooltip align="center" label="会员卡编号" prop="cardNo"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="会员卡名称" prop="cardTypeName"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="创建时间" prop="createTime"></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="会员卡状态" prop="cardStateText"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">详情</el-button>
              <el-popconfirm
                icon="el-icon-info"
                title="确认冻结该卡？"
                @onConfirm="cardDelete(scope.$index, scope.row)"
              >
                <el-button
                  v-show="!scope.row.isCardState"
                  size="mini"
                  type="warning"
                  slot="reference"
                >冻结</el-button>
              </el-popconfirm>
              <el-popconfirm
                icon="el-icon-info"
                title="确认解冻该卡？"
                @onConfirm="cardDelete(scope.$index, scope.row)"
              >
                <el-button
                  v-show="scope.row.isCardState"
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
            @current-change="getCardData"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
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
      userName: "",
      cardNum: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      cardValue: "",
      timeValue: [],
      cardList: []
    };
  },
  created() {
    this.getCardData();
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/cardmanagement") {
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
    go(url) {
      this.$router.push({ path: url });
    },
    getCardData() {
      let port = "cardManage/getCardList";
      let obj = {};
      let pages = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      // let obj = {
      //   item1: this.cardName,
      //   item2: this.cardNum,
      //   item3: this.cardValue,
      //   item4: "",
      //   item5: ""
      // };
      // if (!!val) {
      //   obj.item6 = val;
      // } else {
      //   obj.item6 = this.currentPage;
      // }
      // if (this.timeValue.length == 2) {
      //   obj.item4 = this.timeValue[0];
      //   obj.item5 = this.timeValue[1];
      // }
      let upData = this.$axios.upData(port, obj, pages);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            switch (data[i].cardState) {
              case 0:
                data[i].cardStateText = "正常";
                break;
              case 1:
                data[i].cardStateText = "过期";
                break;
              case 2:
                data[i].cardStateText = "冻结";
                break;
            }
            if (data[i].cardState == 2) {
              data[i].isCardState = true;
            } else {
              data[i].isCardState = false;
            }
            if (data[i].isBoon) {
              data[i].isBoonText = "团洗卡";
            } else {
              data[i].isBoonText = "非团洗卡";
            }
          }
          console.log(data);
          this.cardList = data;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // this.axios.get("/static/Json/cardmanagement.json").then(res => {
      //   this.cardList = res.data.cardList;
      //   this.total = res.data.total;
      // });
    },
    cardDelete(index, data) {
      let cardState;
      if (!!data.isCardState) {
        cardState = 0; //解冻
      } else {
        cardState = 2; //冻结
      }
      let obj = {
        cardNo: data.cardNo,
        cardState: cardState
      };
      let port = "cardManage/carSetState";
      let specialData = this.$axios.specialData(port, obj);
      specialData.then(res => {
        if (res.data.status == 200) {
          if(!!data.isCardState){
            this.$message.success("解冻成功");
          }else{
            this.$message.success("冻结成功");
          }
          this.getCardData();
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
#card-management {
  overflow-y: auto;
}
.card-page {
  padding: 10px;
}
/* 按钮存放位置 */
.card-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
  padding: 0px 10px 10px;
}
.card-info-box {
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
.card-plus {
  background: #1abc9c;
  border-color: #1abc9c;
  margin-top: 10px;
}
.card-plus:focus,
.card-plus:hover {
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