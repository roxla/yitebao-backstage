<template>
  <div class="hello">
    <div class="login-right">
      <div style="width: 530px; display: flex;">
        <transition name="slide-left">
          <div v-show="show3" class="login-right-main">
            <div class="main-title">衣特宝总后台</div>
            <div style="margin-top: 90px;" class="main-input-box">
              <div class="main-input">
                <svg-icon class="main-input-icon" icon-class="u79"></svg-icon>
                <input placeholder="请输入手机号" type="text" />
              </div>
              <div class="main-input">
                <svg-icon class="main-input-icon" icon-class="u80"></svg-icon>
                <input placeholder="请输入登录密码" type="text" />
              </div>
              <div class="main-button">
                <button>立即登陆</button>
              </div>
            </div>
            <div class="lost-pw-box">
              <el-button @click="show3 = !show3" class="lost-pw" type="text">忘记密码？</el-button>
            </div>
          </div>
        </transition>
        <transition name="slide-right">
          <div v-show="!show3" class="login-right-main">
            <div class="main-title">衣特宝总后台2</div>
            <div style="margin-top: 90px;" class="main-input-box">
              <div class="main-input">
                <svg-icon class="main-input-icon" icon-class="u79"></svg-icon>
                <input placeholder="请输入手机号" type="text" />
              </div>
              <div class="main-input">
                <svg-icon class="main-input-icon" icon-class="u80"></svg-icon>
                <input placeholder="请输入登录密码" type="text" />
              </div>
              <div class="main-button">
                <button>立即登陆</button>
              </div>
            </div>
            <div class="lost-pw-box">
              <el-button @click="show3 = !show3" class="lost-pw" type="text">忘记密码？</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show3:true
    };
  }
};
</script>

<style scoped>
.hello{
  height: 100vh;
}
/* 登录窗口右 */
.login-right{
  background-image: url('../../static/img/login/u74.png');
  background-repeat:no-repeat;
  background-size:contain;
  width: 390px;
  height: 387px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.login-right-main{
  width: 390px;
  height: 387px;
}
/* 登录标题 */
.main-title {
  color: #d3d1fe;
  margin: 25px 0px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 26px;
  letter-spacing: 6px;
}
/* 登录输入框 */
.main-input-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.main-input {
  width: 70%;
  border: 3px solid #d3d1fe;
  border-radius: 2500px;
  overflow: hidden;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
.main-input input {
  width: 80%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
}
.main-input input::placeholder {
  color: #999999;
}
.main-input-icon {
  font-size: 25px;
  margin: 0px 6px 0px 10px;
}
/* 登录按钮 */
.main-button {
  width: 70%;
}
.main-button button {
  width: 100%;
  color: white;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  background: linear-gradient(to right, #aad9ff, #b8b5fd);
  border: 0px;
}
/* 忘记密码 */
.lost-pw-box {
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
}
/* 动画左 */
.slide-left-enter {
  transform: translateX(-100%);
}
.slide-left-enter-active {
  transition: transform 0.5s cubic-bezier(0.6, 0.3, 1.0, 1.0);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave {
  transform: translateX(0);
}
.slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.6, 0.3, 1.0, 1.0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
/* 动画右 */
.slide-right-enter {
  transform: translateX(100%);
}
.slide-right-enter-active {
  transition: transform 0.5s cubic-bezier(0.6, 0.3, 1.0, 1.0);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave {
  transform: translateX(100%);
}
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.6, 0.3, 1.0, 1.0);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
