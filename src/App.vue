<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
/* elementui样式修改 */
/* login */
.lost-pw {
  padding: 6px 0px 0px;
}
/* main */
.el-breadcrumb__inner {
  font-size: 15px;
}
.user-el-drop {
  margin-top: 2px !important;
  padding: 5px 0px;
  width: 109px;
}
/* couponSet */
.coupon-end-time .el-input__inner {
  border: 2px solid black;
  padding: 5px 30px;
}
/* card-management */
.search-select .el-input__inner {
  border: 2px solid black;
  height: 41px;
  line-height: 41px;
}
.el-select.search-select:hover,
.search-select .el-input__inner,
.search-select .el-input__inner:hover {
  border-color: black;
}
.search-select .el-input__inner:focus,
.search-select .el-input.is-focus .el-input__inner {
  border-color: #1abc9c;
}
.search-date {
  border: 2px solid black;
  height: 41px;
  line-height: 41px;
}
.search-date:hover {
  border-color: black;
}
.search-date.is-active,
.search-date.is-active:hover {
  border-color: #1abc9c;
}
/* cardSet */
.avatar-uploader .el-upload{
  width: 100%;
  height: 100%;
}
/* userDetails & cardDetails */
.card-details-tabs .el-tabs__content,
.user-details-tabs .el-tabs__content{
  padding-bottom: 0px;
}
</style>
