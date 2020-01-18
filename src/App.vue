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
/* couponSet */
.coupon-end-time .el-input__inner {
  border: 2px solid black;
  padding: 5px 30px;
}
/* card-management */
.search-select .el-input__inner {
  border: 2px solid black !important;
  height: 41px !important;
  line-height: 41px !important;
}
.el-select.search-select:hover,
.search-select .el-input__inner,
.search-select .el-input__inner:hover {
  border-color: black !important;
}
.search-select .el-input__inner:focus,
.search-select .el-input.is-focus .el-input__inner {
  border-color: #1abc9c !important;
}
.search-date {
  border: 2px solid black !important;
  height: 41px !important;
  line-height: 41px !important;
}
.search-date:hover {
  border-color: black !important;
}
.search-date.is-active,
.search-date.is-active:hover {
  border-color: #1abc9c !important;
}
/* cardSet */
.avatar-uploader .el-upload{
  width: 100%;
  height: 100%;
}
/* userDetails & cardDetails */
.card-details-tabs .el-tabs__content{
  padding-bottom: 0px;
}
.user-details-tabs .el-tabs__content{
  padding: 0px 10px;
}
/* setImgList */
.search-set-input input{
  border: 2px solid black;
}
.search-set-input input:hover{
  border-color: black;
}
.search-set-input input:focus{
  border-color: #1abc9c;
}
.search-set-input input{
  color: #999999;
}
</style>
