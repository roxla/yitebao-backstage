<template>
  <div id="card-set">
    <div v-show="showPage" class="card-page">
      <div class="card-button-box">
        <div ref="input" class="search-input">
          <input
            v-model="cardName"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入卡类型名称"
            type="text"
          />
        </div>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="getCardData" type="primary" class="card-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="go('cardtypeset/cardset')" type="primary" class="card-plus">
          <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
        </el-button>
      </div>
      <div
        :style="{padding:cardList.length>0?'':'10px'}"
        @scroll.passive="handleScroll($event,getCardData)"
        class="card-info-box"
      >
        <div class="card-box-none" v-show="cardList.length<=0">暂无卡类型</div>
        <div class="card-box" v-for="(item,index) in cardList" :key="index">
          <div class="card-item-box">
            <div class="card-item-title">
              <div @click="go('cardtypeset/cardset',item)" class="card-item-edit">编辑</div>
              <div @click="cardDel(item)" class="card-item-del">删除</div>
            </div>
            <div class="card-item-main">
              <div class="card-item-img">
                <img :src="item.cardTypeImg" />
              </div>
              <div class="card-item-text">
                <div class="card-text-title">{{item.typeName}}</div>
                <div class="card-item-info">
                  <div class="card-info-title">折扣率：</div>
                  <div class="card-info-text">
                    <p
                      style="margin: 0px;;max-width: 46px;overflow: hidden;text-overflow: ellipsis;"
                    >{{item.cardDiscount}}</p>折
                  </div>
                </div>
                <div class="card-item-info">
                  <div class="card-info-title">销售价格：</div>
                  <div class="card-info-text">
                    <p
                      style="margin: 0px;;max-width: 46px;overflow: hidden;text-overflow: ellipsis;"
                    >{{item.price}}</p>元
                  </div>
                </div>
                <div class="card-item-info">
                  <div class="card-info-title">赠送金额：</div>
                  <div class="card-info-text">
                    <p
                      style="margin: 0px;;max-width: 46px;overflow: hidden;text-overflow: ellipsis;"
                    >{{item.given}}</p>元
                  </div>
                </div>
                <div class="card-item-info">
                  <div class="card-info-title">有效期天数：</div>
                  <div class="card-info-text">
                    <p
                      style="margin: 0px;;max-width: 46px;overflow: hidden;text-overflow: ellipsis;"
                    >{{item.validityDays}}</p>天
                  </div>
                </div>
                <div class="card-item-type">
                  <div class="type-text">{{item.isBoonType}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-show="!showPage" />
    <DialogFramework top="35vh" title="确认退出？" :visible.sync="dialogVisible" width="30%">
      <div style="padding: 15px 0px;font-size: 14px;">
        <div>卡类型名称：{{delName}}</div>
        <div>此操作无法撤销，请确认是否删除该卡类型</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" class="dialog-close">
          <i class="el-icon-circle-close el-icon--left"></i>取消
        </el-button>
        <el-button @click="del" size="small" class="dialog-danger">
          <i class="el-icon-circle-check el-icon--left"></i>确定
        </el-button>
      </span>
    </DialogFramework>
  </div>
</template>

<script>
import DialogFramework from "@/common/dialog-framework.vue";
const pageSize = 24; //一页显示多少行
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      showPage: true,
      cardName: "",
      currentPage: 1,
      pageSize: pageSize,
      isList: true,
      cardList: [],
      dialogVisible: false,
      delName: "",
      delNo: ""
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/cardtypeset") {
          this.showPage = true;
          this.isList = true;
          this.getCardData();
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
    go(url, data) {
      if (!!data) {
        let item = JSON.stringify(data);
        this.$router.push({
          path: url,
          query: {
            item
          }
        });
      } else {
        this.$router.push({ path: url });
      }
    },
    getCardData() {
      // this.axios.get("/static/Json/cardList.json").then(res => {
      //   this.cardList = res.data;
      // });
      let port = "handlers/cardType/getCardTypeList";
      let obj = {
        typeName: this.cardName
      };
      let pages = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      let upData = this.$axios.upData(port, obj, pages);
      upData.then(res => {
        console.log(res);
        if (res.data.status == 200) {
          let data = res.data.data.list;
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              data[i].cardDiscount = parseFloat(data[i].cardDiscount) / 10;
              if (!data[i].cardTypeImg) {
                data[i].cardTypeImg = "./static/img/zhanwei.jpg";
              }
              if (!!data[i].isBoon) {
                data[i].isBoonType = "团洗";
              } else {
                data[i].isBoonType = "非团";
              }
              this.cardList.push(data[i]);
            }
            this.currentPage = this.currentPage += 1;
          }
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 下拉检测
    handleScroll(e, func) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (scrollBottom === 0) {
        if (!!this.isList) {
          func();
        }
      }
    },
    cardDel(data) {
      this.delNo = data.cardTypeNo;
      this.delName = data.typeName;
      this.dialogVisible = true;
    },
    del() {
      let port = "handlers/cardType/deleteCardType";
      let obj = {
        cardTypeNo: this.delNo
      };
      let specialData = this.$axios.specialData(port, obj);
      specialData.then(res => {
        if (res.data.status == 200) {
          this.getCardData();
          this.$message.success("删除成功");
          this.dialogVisible = false;
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
#card-set {
  overflow-y: auto;
}
.card-page {
  padding: 10px;
}
/* 按钮存放位置 */
.search-input {
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
  width: 40%;
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
.card-button-box,
.card-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.card-button-box {
  margin-bottom: 40px;
  padding: 10px;
}
.card-info-box {
  padding: 15px 0px 0px 10px;
  max-height: calc(100vh - 195px);
  overflow-y: auto;
}
/* 添加按钮 */
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
/* 卡类型 */
.card-box {
  width: calc((100% - 30px) / 3);
  margin-right: 10px;
  padding-bottom: 15px;
}
.card-box-none {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
.card-item-box {
  border: 1px solid #d7d7d7;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
}
/* 卡类型头部 */
.card-item-title {
  padding-bottom: 3%;
  background-color: #eaeaea;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.card-item-edit,
.card-item-del {
  padding: 6px 16px;
  color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid #d7d7d7;
  font-size: 14px;
  border-top: 0px;
}
.card-item-edit:hover,
.card-item-del:hover {
  cursor: pointer;
}
.card-item-edit {
  margin-right: 5px;
  background-color: #23c8ad;
}
.card-item-del {
  background-color: #e8934f;
  border-right: 0px;
}
/* 卡类型主体 */
.card-item-main {
  display: flex;
  background-color: #4342c8;
}
.card-item-img {
  position: relative;
  width: 40%;
  height: 0px;
  padding-bottom: 27%;
  background-color: #4342c8;
}
.card-item-img img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
}
/* 卡类型文本 */
.card-item-text {
  width: 60%;
  position: relative;
}
.card-text-title {
  color: white;
  font-size: 15px;
  margin-bottom: 3px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  width: 90%;
}
.card-item-info {
  display: flex;
  align-items: flex-start;
  color: white;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
}
.card-info-title {
  width: 50%;
  text-align: right;
}
.card-info-text {
  display: flex;
  align-items: center;
}
.card-item-type {
  width: 38px;
  height: 38px;
  position: absolute;
  font-size: 14px;
  right: 0px;
  bottom: 0px;
  color: #bf0a0a;
  background: #eaeaea;
  border-top-left-radius: 2500px;
}
.type-text {
  position: absolute;
  top: 13px;
  left: 8px;
}
/* 弹窗按钮 */
.dialog-danger {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.dialog-danger:focus,
.dialog-danger:hover {
  background: #f88b8b;
  border-color: #f88b8b;
  color: #fff;
}
.dialog-close {
  background: #c9c9c9;
  border-color: #c9c9c9;
  color: #fff;
}
.dialog-close:focus,
.dialog-close:hover {
  background: #c9c9c9;
  border-color: #c9c9c9;
  color: #fff;
}
</style>