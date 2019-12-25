<template>
  <div id="Main">
    <!-- 
      logoImg:logo地址 传值 String 可选，
      userName:用户名 传值 String 可选，
      menuList:menu数据列表 传值 Array 必需，
      getTitle:获取跳转路径和路由名称 接收，
      logoExit:退出图标 传值 String 可选，
      logoPw:修改密码图标 传值 String 可选，
      diaLog:获取用户菜单选项 接收
    -->
    <MenuFramework @getData="getTitle" @diaLog="diaLog" :userName="userName" :menuItem="menuList" />
    <div style="width: 100%">
      <div class="title">
        <svg-icon id="title-icon" icon-class="u297"></svg-icon>
        <div class="title-text">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item,index) in currentPath"
              :key="index"
              :to="{ path: item.path }"
            >{{item.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <router-view style="padding-top: 5px;" />
    </div>
    <!-- 弹窗 -->
    <DialogFramework top="32vh" title="修改密码" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <RimFramework
          placeholder="请输入原密码"
          v-model="oldPw"
          marginLeft="0px"
          width="93%"
          :isRadius="true"
        />
        <RimFramework
          placeholder="请输入新密码"
          v-model="newPw"
          marginLeft="0px"
          width="93%"
          :isRadius="true"
        />
        <RimFramework
          placeholder="请再次输入新密码"
          v-model="resPw"
          marginLeft="0px"
          width="93%"
          :isRadius="true"
        />
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
    <DialogFramework top="35vh" title="确认退出？" :visible.sync="dialogVisible2" width="30%">
      <div style="padding: 15px 0px;font-size: 14px;">
        <span>此操作无法撤销，请确认是否退出该账号</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="small" class="dialog-close">
          <i class="el-icon-circle-close el-icon--left"></i>取消
        </el-button>
        <el-button @click="logOut" size="small" class="dialog-danger">
          <i class="el-icon-switch-button el-icon--left"></i>退出
        </el-button>
      </span>
    </DialogFramework>
  </div>
</template>

<script>
import MenuFramework from "@/common/menu-framework.vue";
import DialogFramework from "@/common/dialog-framework.vue";
import RimFramework from "@/common/rim-framework.vue";
export default {
  components: {
    MenuFramework,
    DialogFramework,
    RimFramework
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.currentPath = [];
        for (let i = 1; i < this.$route.matched.length; i++) {
          this.currentPath.push(this.$route.matched[i]);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      // 用户名
      userInfo: {},
      userName: "",
      // 路由列表
      currentPath: [],
      // 用户菜单弹窗
      dialogVisible1: false,
      oldPw: "",
      newPw: "",
      resPw: "",
      dialogVisible2: false,
      // menu数据列表
      menuList: [
        {
          // 菜单名称
          name: "主页",
          // 菜单url
          page: "/main/index"
        },
        {
          name: "商户",
          itemMenu: [
            // 子菜单项
            {
              // 子菜单名称
              name: "商户开店申请",
              // 子菜单url
              page: "/main/merchantapplication"
            },
            {
              name: "商户提现申请",
              page: "/main/merchantreminderapplication"
            },
            {
              name: "商家管理",
              page: "/main/merchantmanagement"
            },
            {
              name: "商品管理",
              page: "/main/shopmanagement"
            },
            {
              name: "订单管理",
              page: "/main/ordermanagement"
            }
          ]
        },
        {
          name: "用户",
          itemMenu: [
            {
              name: "用户管理",
              page: "/main/usermanagement"
            },
            {
              name: "会员卡管理",
              page: "/main/cardmanagement"
            },
            {
              name: "批量发卡",
              page: "/main/cardissue"
            }
          ]
        },
        {
          name: "报表",
          itemMenu: [
            {
              name: "总入账"
            },
            {
              name: "用户统计"
            },
            {
              name: "办卡统计"
            },
            {
              name: "卡综合统计",
              page: "/main/cardcomprehensivestatistics"
            },
            {
              name: "商品销售统计"
            },
            {
              name: "洗护销售统计"
            },
            {
              name: "积分统计"
            },
            {
              name: "客户消费统计"
            }
          ]
        },
        {
          name: "设置",
          itemMenu: [
            {
              name: "首页设置",
              page: "/main/appindexset"
            },
            {
              name: "卡类型管理",
              page: "/main/cardtypeset"
            },
            {
              name: "优惠券管理",
              page: "/main/couponmanagement"
            },
            {
              name: "短信模板"
            },
            {
              name: "员工管理",
              page: "/main/staffmanagement"
            }
          ]
        },
        {
          name: "积分",
          itemMenu: [
            {
              name: "积分商品"
            },
            {
              name: "积分商品分类"
            },
            {
              name: "兑换订单管理"
            }
          ]
        },
        {
          name: "其他",
          itemMenu: [
            {
              name: "基本信息设置"
            },
            {
              name: "关于我们"
            },
            {
              name: "反馈信息"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getUserName();
  },
  methods: {
    getUserName() {
      let port = "worker/getLoginData";
      if (!this.userName) {
        let upData = this.$axios.upData(port);
        upData.then(res => {
          if (res.data.status == 200) {
            // console.log(res);
            this.userInfo = res.data.data;
            this.userName = res.data.data.bwName;
          } else if (res.data.status == 588) {
            this.$message.error(res.data.msg);
            this.checkLogin();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      };
      // this.axios.get("/static/Json/menuList.json").then(res => {
      //   this.userName = res.data.name;
      // });
    },
    getTitle(data) {
      if (!!data.page) {
        if (
          location.href.split("#")[1] != data.page &&
          !location.href.split(data.page)[1]
        ) {
          this.$router.push({ path: data.page });
        }
      }
    },
    diaLog(data) {
      if (data == "pw") {
        this.dialogVisible1 = true;
      } else if (data == "exit") {
        this.dialogVisible2 = true;
      }
    },
    logOut() {
      this.dialogVisible2 = false;
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
#Main {
  display: flex;
}
/* 头部 */
.title {
  width: 100%;
  background-color: #f2f2f2;
  height: 54px;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
  z-index: 10;
}
#title-icon {
  width: 39px;
  height: 39px;
}
.title-text {
  margin-left: 10px;
  border-left: 3px solid #00e6e6;
  padding-left: 10px;
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
</style>
