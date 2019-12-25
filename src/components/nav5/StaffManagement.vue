<template>
  <div id="staff">
    <div v-show="showPage" class="staff-page">
      <div class="staff-button-box">
        <el-button @click="go('/main/staffmanagement/staffset')" type="primary" class="staff-plus">
          <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
        </el-button>
      </div>
      <div :style="{padding:staffList.length>0?'':'10px'}" class="staff-info-box">
        <!-- 
          isStaff:员工与优惠券切换 传值 boolean 可选 默认员工， 
          staffInfo:
          staffurl:员工设置url 传值 string 必须
          staffdata:员工编辑数据 传值 object 必须
        -->
        <div class="staff-box-none" v-show="staffList.length<=0">暂无员工</div>
        <div v-for="(item,index) in staffList" :key="index" class="staff-box">
          <CardFramework :staffInfo="item" />
        </div>
      </div>
    </div>
    <router-view v-show="!showPage" />
  </div>
</template>

<script>
import CardFramework from "@/common/card-framework.vue";
export default {
  components: {
    CardFramework
  },
  data() {
    return {
      showPage: true,
      staffList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/staffmanagement") {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      },
      immediate: true
    }
  },
  created() {
    this.getStaffData();
  },
  methods: {
    go(url) {
      this.$router.push({ path: url });
    },
    getStaffData() {
      let port = "worker/getWorkerList";
      let upData = this.$axios.upData(port);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].sex == "0") {
              data[i].sex = "男";
            } else {
              data[i].sex = "女";
            }
            this.staffList = data;
          }
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
dl,
dd {
  margin: 0px;
}
#staff {
  overflow-y: auto;
}
.staff-page {
  padding: 20px;
}
/* 按钮存放位置 & 员工信息存放 */
.staff-button-box,
.staff-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.staff-button-box {
  margin-bottom: 40px;
  padding: 10px;
}
.staff-info-box {
  padding: 15px 0px 0px 10px;
  max-height: calc(100vh - 214px);
  overflow-y: auto;
}
/* 添加按钮 */
.staff-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.staff-plus:focus,
.staff-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 员工 */
.staff-box {
  width: calc(100% / 3);
  padding-bottom: 15px;
}
.staff-box-none {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
</style>
