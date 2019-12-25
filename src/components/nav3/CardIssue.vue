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
                <el-select class="search-select" v-model="cardValue" placeholder="请选择卡类型">
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
        <tab title="发卡详情">发卡详情</tab>
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
import tabs from "@/common/tabs/tabs-framework.vue";
import tab from "@/common/tabs/tab-framework.vue";
import RimFramework from "@/common/rim-framework.vue";
import DialogFramework from "@/common/dialog-framework.vue";
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
      showPage: true,
      startNum: "",
      endNum: "",
      options: [],
      cardValue: "",
      dialogVisible1: false
    };
  },
  created() {
    this.getCardType();
  },
  methods: {
    getCardType() {
      let port = "cardType/getCardTypeList";
      let upData = this.$axios.upData(port);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          let list = [];
          for (let i = 0; i < data.length; i++) {
            list.push({ label: data[i].typeName, value: data[i].typeName });
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
        if(parseInt(this.startNum) < parseInt(this.endNum)){
          this.dialogVisible1 = true;
        }
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
.search-select {
  width: 88%;
}
.item-footer {
  margin: 0px 10px;
  padding: 10px 0px;
  border-top: 1px solid rgba(142, 142, 142, 0.3);
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
.dialog-success {
  background: #02bda6;
  border-color: #02bda6;
  color: #fff;
}
.dialog-success:focus,
.dialog-success:hover {
  background: #02bda6;
  border-color: #02bda6;
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