<template>
  <div :style="{height: height+'px'}" id="Talk">
    <header id="talk-header">
      <div class="talk-icon">
        <img src="../../static/img/talk/20200214105249.png" alt="talk" />
      </div>
      <div class="talk-name">{{userName}}</div>
    </header>
    <main id="talk-main">
      <aside v-show="userList.length > 0" class="talk-aside">
        <div class="list-search-box">
          <el-autocomplete
            :fetch-suggestions="keyWord"
            v-model="search"
            class="talk-list-search"
            :trigger-on-focus="false"
            placeholder="请输入姓名或手机号"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button @click="searchItem" size="small" type="success" class="talk-button">搜索</el-button>
        </div>
        <div class="talk-user-list">
          <div
            @click="linkTalk(item,index)"
            v-for="(item,index) in showList"
            :key="index"
            :class="{'talk-user-active': active == index}"
            class="talk-user-box"
          >
            <el-avatar :src="item.img" :size="50"></el-avatar>
            <div class="talk-user-right">
              <div class="talk-user-item">
                <div class="talk-user-name">{{item.name}}</div>
                <div class="talk-user-time">{{item.time | talktime}}</div>
              </div>
              <div class="talk-user-message">{{item.talk}}</div>
            </div>
          </div>
        </div>
      </aside>
      <aside v-show="userList.length <= 0" class="talk-aside"></aside>
      <article v-show="userList.length > 0" class="talk-article">
        <div class="talk-window-box">
          <div class="talk-info-window">
            <div class="talk-info-name">{{talk_name}}</div>
            <div></div>
          </div>
          <div class="talk-user-info">信息</div>
        </div>
        <div class="talk-input-box">
          <div class="talk-tool-box">
            <div class="talk-tool-item">
              <svg-icon id="tool-emj" icon-class="Big-Smile"></svg-icon>
            </div>
            <div class="talk-tool-item">
              <svg-icon id="tool-photo" icon-class="picture"></svg-icon>
            </div>
          </div>
          <textarea @keyup.ctrl.13="sendInfo" v-focus v-model="my_talk"></textarea>
          <div class="talk-button-box">
            <el-button @click="sendInfo" type="success" class="talk-button">发 送</el-button>
          </div>
        </div>
      </article>
      <article v-show="userList.length <= 0" class="talk-article"></article>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
      userName: sessionStorage.getItem("userName"),
      search: "",
      active: 0,
      userList: [],
      showList: [],
      userInfo: {},
      // 显示
      talk_name: "",
      // 输入
      my_talk: ""
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.height = window.innerHeight;
    this.getUserList();
  },
  methods: {
    // input搜索
    keyWord(queryString, cb) {
      let restaurants = this.userList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      this.userInfo = item;
    },
    searchName(arr) {
      return arr.name.indexOf(this.search) === 0;
    },
    searchItem() {
      let arr = this.userList;
      let array = [];
      if (!this.userInfo.value) {
        array = arr.filter(this.searchName);
      } else {
        array.push(this.userInfo);
      }
      this.userInfo = {};
      this.showList = array;
    },
    // 通信
    getUserList() {
      this.axios.get("./static/Json/talk.json").then(res => {
        let data = res.data;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push({
            value: data[i].tel,
            time: data[i].time,
            img: data[i].img,
            talk: data[i].talk,
            name: data[i].name
          });
        }
        this.userList = arr;
        this.showList = arr;
      });
    },
    linkTalk(data, index) {
      this.active = index;
      this.talk_name = data.name;
    },
    sendInfo() {
      console.log("ok");
    }
  }
};
</script>

<style scoped>
#talk-header {
  background-color: #1b2421;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 7%;
}
.talk-icon {
  height: 70%;
  padding: 0.5%;
}
.talk-icon img {
  height: 100%;
  object-fit: contain;
}
.talk-name {
  color: white;
  font-weight: 700;
  font-size: 0.9em;
}
/* 聊天主体 */
#talk-main {
  display: flex;
  height: 93%;
  width: 100%;
}
/* 侧边栏 */
.talk-aside {
  width: 310px;
  height: 100%;
  background-color: #f9f9f9;
}
.list-search-box {
  display: flex;
  padding-bottom: 10px;
}
.talk-list-search {
  width: calc(100% - 56px);
}
/* 聊天列表 */
.talk-user-list {
  /* height: calc(100% - 10px); */
  overflow-y: scroll;
}
.talk-user-box {
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.talk-user-box:hover {
  background-color: #c5c5c6;
  cursor: pointer;
}
.talk-user-active {
  background-color: #c5c5c6;
}
.talk-user-right {
  width: calc(100% - 58px);
}
.talk-user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.talk-user-name {
  width: 180px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
}
.talk-user-time {
  text-align: right;
  font-size: 14px;
  color: #797979;
}
.talk-user-message {
  width: 85%;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  color: #797979;
}
/* 按钮 */
.talk-button {
  background-color: #9933ff;
  border-color: #9933ff;
}
.talk-button:hover {
  background-color: #ae5eff;
  border-color: #ae5eff;
}
.talk-button:active {
  background-color: #9933ff;
  border-color: #9933ff;
}
/* 聊天窗 */
.talk-article {
  width: calc(100% - 310px);
}
.talk-window-box {
  display: flex;
  height: calc(100% - 201px);
}
.talk-info-window {
  width: 100%;
}
.talk-info-name {
}
/* 用户资料 */
.talk-user-info {
  width: 280px;
  border-left: 1px solid #c5c5c6;
}
/* 聊天输入 */
.talk-input-box {
  border-top: 1px solid #c5c5c6;
  height: 200px;
  padding: 0px 40px;
}
.talk-tool-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px 5px;
}
.talk-tool-item {
  margin-right: 20px;
}
#tool-emj,
#tool-photo {
  width: 24px;
  height: 24px;
}
.talk-input-box textarea {
  width: 100%;
  padding: 0px;
  resize: none;
  border: 0px;
  outline: none;
  font-size: 18px;
  height: calc(100% - 95px);
}
.talk-button-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>