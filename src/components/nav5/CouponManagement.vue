<template>
  <div id="coupon">
    <div v-show="showPage" class="coupon-page">
      <div class="coupon-button-box">
        <div ref="input" class="search-input">
          <input @focus="changeColor" @blur="reChange" placeholder="请输入优惠券名称" type="text" />
        </div>
        <div style="padding: 0px 15px;"></div>
        <el-button type="primary" class="coupon-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
        <div style="padding: 0px 15px;"></div>
        <el-button
          @click="go('/main/couponmanagement/couponset')"
          type="primary"
          class="coupon-plus"
        >
          <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
        </el-button>
      </div>
      <div :style="{padding:couponList.length>0?'':'10px'}" class="coupon-info-box">
        <!-- 
          isStaff:员工与优惠券切换 传值 boolean 可选 默认员工， 
          cardInfo:优惠券内容 传值 object 必须:{cost:优惠券金额,text:优惠券说明,name:优惠券名称,shop:是否为指定商品可用,user:是否为指定用户可领取,day:有效期天数}
          staffurl:员工设置url 传值 string 必须
          staffdata:员工编辑数据 传值 object 必须
        -->
        <div class="coupon-box-none" v-show="couponList.length<=0">暂无优惠券</div>
        <div class="coupon-box" v-for="(item,index) in couponList" :key="index">
          <CardFramework :isStaff="false" :cardInfo="item" />
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
      couponList: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/main/couponmanagement") {
          this.showPage = true;
          this.getCouponData();
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
    getCouponData() {
      let port = "http://192.168.1.109:3001/coupon/getCouponList";
      let testData = this.$axios.testData(port);
      testData.then(res => {
        if (res.data.status == 200) {
          this.couponList = res.data.data;
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
#coupon {
  overflow-y: auto;
}
.coupon-page {
  padding: 10px;
}
/* 按钮存放位置 & 员工信息存放 */
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
.coupon-button-box,
.coupon-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.coupon-button-box {
  margin-bottom: 40px;
  padding: 10px;
}
.coupon-info-box {
  padding: 15px 0px 0px 10px;
  max-height: calc(100vh - 195px);
  overflow-y: auto;
}
/* 添加按钮 */
.coupon-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.coupon-plus:focus,
.coupon-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
/* 优惠券 */
.coupon-box {
  width: calc(100% / 3);
  padding-bottom: 15px;
}
.coupon-box-none {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
</style>