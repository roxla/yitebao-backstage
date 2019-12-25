<template>
  <div id="FrameWork">
    <div class="menu">
      <div class="logo-box">
        <img class="logo" :src="logoImg" />
        <el-dropdown trigger="click">
          <div class="user-name">
            <span>{{userName}}</span>
          </div>
          <el-dropdown-menu class="user-el-drop" slot="dropdown">
            <el-dropdown-item
              class="user-drop"
              style="border-bottom: 1px solid #888; padding-bottom: 5px;"
            >
              <div class="user-drop-box" @click="userDrop('pw')">
                <img class="pw-logo" :src="logoPw" />
                <p class="ico-text">修改密码</p>
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="user-drop" style="padding-top: 5px;">
              <div class="user-drop-box" @click="userDrop('exit')">
                <img class="exit-logo" :src="logoExit" />
                <p class="ico-text">退出登录</p>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="menu-box">
        <div
          class="menu-item-box"
          @click="menuChange(item,index)"
          :class="activeItem==index?'active':''"
          v-for="(item,index) in menuItem"
          :key="index"
        >
          <div class="icon-img-box">
            <img class="icon-img-ring" src="../../static/img/u104.svg" />
            <img class="icon-img-dot" src="../../static/img/u105.svg" />
          </div>
          <div class="menu-item-text">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 可隐藏菜单 -->
    <div class="menu-hide" v-show="showMenu">
      <div class="menu-hide-title">
        <div class="hide-name">{{menuName}}</div>
        <div class="hide-button-box" @click="showMenu = false">
          <svg-icon class="hide-button" icon-class="u70"></svg-icon>
        </div>
      </div>
      <div
        @click="hideChange(item,index)"
        v-for="(item,index) in hideMenuList"
        :key="index"
        :class="hideActive==index?'hide-active':''"
        class="menu-hide-box"
      >
        <div class="menu-hide-item">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 0,
      showMenu: false,
      // 隐藏菜单
      hideActive: 0,
      menuName: "",
      hideMenuList: []
    };
  },
  watch: {
    menuName: {
      handler: function(val, oldVal) {
        if (!!oldVal && val != oldVal) {
          // 菜单跳转后子菜单选中重置
          this.hideActive = 0;
          sessionStorage.setItem("hideActive", 0);
        }
        if (!!sessionStorage.getItem("active")) {
          // 解决刷新页面后会重定向到主页
          let index = sessionStorage.getItem("active"); //读取刷新前menu的index值
          this.$emit("getData", this.menuItem[index]); //向父组件传递刷新前的menu数据
          this.activeItem = index;
          if (
            !!this.menuItem[index].itemMenu &&
            this.menuItem[index].itemMenu.length > 0
          ) {
            this.menuName = this.menuItem[index].name;
            this.hideMenuList = this.menuItem[index].itemMenu;
            if (!!sessionStorage.getItem("hideActive")) {
              let hideIndex = sessionStorage.getItem("hideActive");
              this.hideActive = hideIndex;
              this.$emit("getData", this.menuItem[index].itemMenu[hideIndex]);
            }
            this.showMenu = true;
          } else {
            this.showMenu = false;
          }
        } else {
          // 进入页面的处理
          this.$emit("getData", this.menuItem[0]);
        }
      },
      immediate: true
    }
  },
  props: {
    userName: {
      type: String,
      default: "管理员"
    },
    logoExit: {
      type: String,
      default: "./static/img/main/u70.png"
    },
    logoPw: {
      type: String,
      default: "./static/img/main/u73.png"
    },
    logoImg: {
      type: String,
      default: "./static/img/main/u55.png"
    },
    menuItem: {
      type: Array,
      default: [],
      required: true
    }
  },
  methods: {
    menuChange(data, index) {
      this.activeItem = index;
      sessionStorage.setItem("active", index); //记录刷新前menu的index值
      this.menuName = data.name;
      if (!!data.itemMenu && data.itemMenu.length > 0) {
        this.hideMenuList = data.itemMenu;
        if (this.hideActive == 0) {
          this.$emit("getData", data.itemMenu[0]);
        }
        this.showMenu = true;
      } else {
        this.showMenu = false;
        this.$emit("getData", data);
      }
    },
    hideChange(data, index) {
      this.hideActive = index;
      sessionStorage.setItem("hideActive", index);
      this.$emit("getData", data);
    },
    userDrop(data) {
      this.$emit("diaLog", data);
    }
  }
};
</script>

<style scoped>
#FrameWork {
  display: flex;
}
.menu {
  background-color: #001c22;
  height: 100vh;
  width: 122px;
}
/* logo */
.logo-box {
  padding: 18px 18px;
  position: relative;
}
.logo {
  width: 82px;
  height: 82px;
}
/* 用户名 */
.user-name {
  text-align: center;
  color: white;
  font-family: "Arial Negreta", "Arial";
  font-weight: 700;
  font-size: 14px;
  position: relative;
  bottom: 12px;
}
.user-name:hover {
  cursor: pointer;
}
.user-name span {
  border-bottom: 2px dashed #f5bc10;
  padding: 0px 0px 5px;
}
/* 用户菜单 */
.user-drop {
  padding: 0px 15px 0px 10px;
  height: 30px;
}
.user-drop-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ico-text {
  margin: 0px;
  text-align: center;
  line-height: 30px;
}
.pw-logo {
  width: 20px;
  height: 20px;
}
.exit-logo {
  width: 15px;
  height: 15px;
  margin-left: 3px;
}
/* 菜单子项 */
.menu-box {
  margin-top: 75px;
}
.menu-item-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;
}
.menu-item-box:hover {
  cursor: pointer;
}
.menu-item-text {
  color: white;
  font-family: "黑体";
  font-weight: 700;
  font-size: 14px;
  margin-left: 7px;
}
.active {
  background: linear-gradient(to right, #19b294, #32e1be);
  border-left: 3px solid #db9e00;
}
.active .menu-item-text {
  font-size: 16px;
  color: black;
}
.active .icon-img-dot {
  left: 5px;
  top: 5px;
}
/* 可隐藏菜单 */
.menu-hide {
  height: 100vh;
  width: 120px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 999;
}
.menu-hide-title {
  height: 54px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  border-top-right-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
}
/* 可隐藏菜单头部 */
.hide-name {
  font-size: 15px;
  padding-left: 10px;
  font-weight: 700;
  font-style: normal;
  color: #18b193;
}
.hide-button-box:hover {
  cursor: pointer;
}
.hide-button {
  font-size: 25px;
}
/* 可隐藏菜单子项 */
.menu-hide-box:hover {
  cursor: pointer;
}
.menu-hide-item {
  padding: 15px 0px;
  font-size: 14px;
  font-style: normal;
}
.hide-active {
  border-right: 4px solid #f2af00;
  background: #fcf8d6;
  color: #06918c;
  font-weight: 700;
}
/* 图标 */
.icon-img-box {
  position: relative;
  width: 16px;
  height: 16px;
}
.icon-img-ring {
  width: 16px;
  height: 16px;
}
.icon-img-dot {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 7px;
  height: 7px;
}
</style>
