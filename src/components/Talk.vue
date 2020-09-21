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
            clearable
          ></el-autocomplete>
          <el-button @click="searchItem" size="small" type="success" class="talk-button">搜索</el-button>
        </div>
        <div class="talk-user-list">
          <!--  @contextmenu.prevent 鼠标右键事件-->
          <div
            @click="linkTalk(item,index)"
            @contextmenu.prevent="test()"
            v-for="(item,index) in showList"
            :key="index"
            :class="{'talk-user-active': active === index}"
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
      <aside v-show="userList.length <= 0" class="talk-aside aside-blank">
        <div>暂无会话</div>
      </aside>
      <article v-show="active !== null" class="talk-article">
        <div class="talk-window-box">
          <div class="talk-info-header">
            <div class="talk-info-name">{{talk_name}}</div>
            <div class="talk-info-button">
              <div @click="info1 = true" class="button-item">
                <svg-icon id="info-user" icon-class="data"></svg-icon>
              </div>
              <div @click="info2 = true" class="button-item">
                <svg-icon id="info-order" icon-class="order"></svg-icon>
              </div>
            </div>
          </div>
          <div class="talk-info-window">
            <div class="talk-main-window">
              <!-- 消息 -->
              <div class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
                <!-- 用户消息 -->
                <div v-if="row.type=='user'">
                  <!-- 自己发出的消息 -->
                  <div class="my" v-if="row.msg.userinfo.uid==myuid">
                    <!-- 左-消息 -->
                    <div class="my-left">
                      <!-- 文字消息 -->
                      <div v-if="row.msg.type=='text'" class="my-bubble">123123</div>
                      <!-- 图片消息 -->
                      <div v-if="row.msg.type=='img'" class="my-bubble bubble-img">
                        <img
                          :src="row.msg.content.url"
                          :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"
                        />
                      </div>
                    </div>
                    <!-- 右-头像 -->
                    <div class="my-right">
                      <el-avatar :src="row.msg.userinfo.face" :size="45"></el-avatar>
                    </div>
                  </div>
                  <!-- 别人发出的消息 -->
                  <div class="other" v-if="row.msg.userinfo.uid!=myuid">
                    <!-- 左-头像 -->
                    <div class="other-left">
                      <el-avatar :src="row.msg.userinfo.face" :size="45"></el-avatar>
                    </div>
                    <!-- 右-消息 -->
                    <div class="other-right">
                      <div v-if="row.msg.type=='text'" class="other-bubble">啊啊啊啊啊啊</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="talk-input-box">
              <transition name="slide-top">
                <div v-show="!hideFont" class="change-font-box">
                  <div class="change-font-border">1</div>
                </div>
              </transition>
              <div class="talk-tool-box">
                <div class="talk-tool-item">
                  <svg-icon @click="hideFont = !hideFont" id="tool-font" icon-class="font"></svg-icon>
                </div>
                <div class="talk-tool-item">
                  <svg-icon id="tool-emj" icon-class="Big-Smile"></svg-icon>
                  <!-- 表情 -->
                  <!-- <swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
                    <swiper-item v-for="(page,pid) in emojiList" :key="pid">
                      <view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
                        <image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
                      </view>
                    </swiper-item>
                  </swiper>-->
                </div>
                <div class="talk-tool-item">
                  <svg-icon id="tool-photo" icon-class="picture"></svg-icon>
                </div>
              </div>
              <textarea @keyup.ctrl.13="sendInfo" v-focus v-model="textMsg"></textarea>
              <div class="talk-button-box">
                <el-button @click="sendInfo" type="success" class="talk-button">发 送</el-button>
              </div>
            </div>
            <transition name="slide-right">
              <div @click="info1 = false" v-show="info1" class="user-info-box">
                <div class="talk-user-info">资料</div>
              </div>
            </transition>
            <transition name="slide-right">
              <div @click="info2 = false" v-show="info2" class="user-info-box">
                <div class="talk-user-info">订单</div>
              </div>
            </transition>
          </div>
        </div>
      </article>
      <article v-show="active === null" class="talk-article article-blank">
        <div>
          <img src="../../static/img/talk/u55.png" alt="no_talk" />
        </div>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
      userName: sessionStorage.getItem("userName"),
      myuid: Number(sessionStorage.getItem("userUid")),
      search: "",
      active: null,
      userList: [],
      showList: [],
      userInfo: {},
      // 显示
      talk_name: "",
      // 输入
      msgList: [],
      //表情定义
      hideFont: true,
      hideEmoji: true,
      emojiList: [
        [
          { url: "100.gif", alt: "[微笑]" },
          { url: "101.gif", alt: "[伤心]" },
          { url: "102.gif", alt: "[美女]" },
          { url: "103.gif", alt: "[发呆]" },
          { url: "104.gif", alt: "[墨镜]" },
          { url: "105.gif", alt: "[哭]" },
          { url: "106.gif", alt: "[羞]" },
          { url: "107.gif", alt: "[哑]" },
          { url: "108.gif", alt: "[睡]" },
          { url: "109.gif", alt: "[哭]" },
          { url: "110.gif", alt: "[囧]" },
          { url: "111.gif", alt: "[怒]" },
          { url: "112.gif", alt: "[调皮]" },
          { url: "113.gif", alt: "[笑]" },
          { url: "114.gif", alt: "[惊讶]" },
          { url: "115.gif", alt: "[难过]" },
          { url: "116.gif", alt: "[酷]" },
          { url: "117.gif", alt: "[汗]" },
          { url: "118.gif", alt: "[抓狂]" },
          { url: "119.gif", alt: "[吐]" },
          { url: "120.gif", alt: "[笑]" },
          { url: "121.gif", alt: "[快乐]" },
          { url: "122.gif", alt: "[奇]" },
          { url: "123.gif", alt: "[傲]" },
        ],
        [
          { url: "124.gif", alt: "[饿]" },
          { url: "125.gif", alt: "[累]" },
          { url: "126.gif", alt: "[吓]" },
          { url: "127.gif", alt: "[汗]" },
          { url: "128.gif", alt: "[高兴]" },
          { url: "129.gif", alt: "[闲]" },
          { url: "130.gif", alt: "[努力]" },
          { url: "131.gif", alt: "[骂]" },
          { url: "132.gif", alt: "[疑问]" },
          { url: "133.gif", alt: "[秘密]" },
          { url: "134.gif", alt: "[乱]" },
          { url: "135.gif", alt: "[疯]" },
          { url: "136.gif", alt: "[哀]" },
          { url: "137.gif", alt: "[鬼]" },
          { url: "138.gif", alt: "[打击]" },
          { url: "139.gif", alt: "[bye]" },
          { url: "140.gif", alt: "[汗]" },
          { url: "141.gif", alt: "[抠]" },
          { url: "142.gif", alt: "[鼓掌]" },
          { url: "143.gif", alt: "[糟糕]" },
          { url: "144.gif", alt: "[恶搞]" },
          { url: "145.gif", alt: "[什么]" },
          { url: "146.gif", alt: "[什么]" },
          { url: "147.gif", alt: "[累]" },
        ],
        [
          { url: "148.gif", alt: "[看]" },
          { url: "149.gif", alt: "[难过]" },
          { url: "150.gif", alt: "[难过]" },
          { url: "151.gif", alt: "[坏]" },
          { url: "152.gif", alt: "[亲]" },
          { url: "153.gif", alt: "[吓]" },
          { url: "154.gif", alt: "[可怜]" },
          { url: "155.gif", alt: "[刀]" },
          { url: "156.gif", alt: "[水果]" },
          { url: "157.gif", alt: "[酒]" },
          { url: "158.gif", alt: "[篮球]" },
          { url: "159.gif", alt: "[乒乓]" },
          { url: "160.gif", alt: "[咖啡]" },
          { url: "161.gif", alt: "[美食]" },
          { url: "162.gif", alt: "[动物]" },
          { url: "163.gif", alt: "[鲜花]" },
          { url: "164.gif", alt: "[枯]" },
          { url: "165.gif", alt: "[唇]" },
          { url: "166.gif", alt: "[爱]" },
          { url: "167.gif", alt: "[分手]" },
          { url: "168.gif", alt: "[生日]" },
          { url: "169.gif", alt: "[电]" },
          { url: "170.gif", alt: "[炸弹]" },
          { url: "171.gif", alt: "[刀子]" },
        ],
        [
          { url: "172.gif", alt: "[足球]" },
          { url: "173.gif", alt: "[瓢虫]" },
          { url: "174.gif", alt: "[翔]" },
          { url: "175.gif", alt: "[月亮]" },
          { url: "176.gif", alt: "[太阳]" },
          { url: "177.gif", alt: "[礼物]" },
          { url: "178.gif", alt: "[抱抱]" },
          { url: "179.gif", alt: "[拇指]" },
          { url: "180.gif", alt: "[贬低]" },
          { url: "181.gif", alt: "[握手]" },
          { url: "182.gif", alt: "[剪刀手]" },
          { url: "183.gif", alt: "[抱拳]" },
          { url: "184.gif", alt: "[勾引]" },
          { url: "185.gif", alt: "[拳头]" },
          { url: "186.gif", alt: "[小拇指]" },
          { url: "187.gif", alt: "[拇指八]" },
          { url: "188.gif", alt: "[食指]" },
          { url: "189.gif", alt: "[ok]" },
          { url: "190.gif", alt: "[情侣]" },
          { url: "191.gif", alt: "[爱心]" },
          { url: "192.gif", alt: "[蹦哒]" },
          { url: "193.gif", alt: "[颤抖]" },
          { url: "194.gif", alt: "[怄气]" },
          { url: "195.gif", alt: "[跳舞]" },
        ],
        [
          { url: "196.gif", alt: "[发呆]" },
          { url: "197.gif", alt: "[背着]" },
          { url: "198.gif", alt: "[伸手]" },
          { url: "199.gif", alt: "[耍帅]" },
          { url: "200.png", alt: "[微笑]" },
          { url: "201.png", alt: "[生病]" },
          { url: "202.png", alt: "[哭泣]" },
          { url: "203.png", alt: "[吐舌]" },
          { url: "204.png", alt: "[迷糊]" },
          { url: "205.png", alt: "[瞪眼]" },
          { url: "206.png", alt: "[恐怖]" },
          { url: "207.png", alt: "[忧愁]" },
          { url: "208.png", alt: "[眨眉]" },
          { url: "209.png", alt: "[闭眼]" },
          { url: "210.png", alt: "[鄙视]" },
          { url: "211.png", alt: "[阴暗]" },
          { url: "212.png", alt: "[小鬼]" },
          { url: "213.png", alt: "[礼物]" },
          { url: "214.png", alt: "[拜佛]" },
          { url: "215.png", alt: "[力量]" },
          { url: "216.png", alt: "[金钱]" },
          { url: "217.png", alt: "[蛋糕]" },
          { url: "218.png", alt: "[彩带]" },
          { url: "219.png", alt: "[礼物]" },
        ],
      ],
      textMsg: "",
      // 信息
      info1: false,
      info2: false,
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
  created() {
    this.height = window.innerHeight;
    this.getUserList();
  },
  methods: {
    test() {},
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
      return (restaurant) => {
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
      this.axios.get("./static/Json/talk.json").then((res) => {
        let data = res.data;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push({
            value: data[i].tel,
            time: data[i].time,
            img: data[i].img,
            talk: data[i].talk,
            name: data[i].name,
          });
        }
        this.userList = arr;
        this.showList = arr;
      });
    },
    linkTalk(data, index) {
      this.active = index;
      this.talk_name = data.name;
      let list = [
        {
          type: "user",
          msg: {
            id: 1,
            type: "text",
            time: "12:56",
            userinfo: {
              uid: 1,
              username: "测试",
              face: "/static/img/talk/face/face_11.jpg",
            },
            content: { text: "为什么温度会相差那么大？" },
          },
        },
        {
          type: "user",
          msg: {
            id: 2,
            type: "text",
            time: "12:57",
            userinfo: {
              uid: -1,
              username: "哈哈123",
              face: "/static/img/talk/face/face_2.jpg",
            },
            content: {
              text:
                "这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。",
            },
          },
        },
      ];
      // 获取消息中的图片,并处理显示尺寸
      // for (let i = 0; i < list.length; i++) {
      //   if (list[i].type == "user" && list[i].msg.type == "img") {
      //     list[i].msg.content = this.setPicSize(list[i].msg.content);
      //     this.msgImgList.push(list[i].msg.content.url);
      //   }
      // }
      this.msgList = list;
      // 滚动到底部
    },
    // 接受消息(筛选处理)
    screenMsg(msg) {
      //从长连接处转发给这个方法，进行筛选处理
    },
    //触发滑动到顶部(加载历史信息记录)
    loadHistory(e) {
      let list = [
        {
          type: "user",
          msg: {
            id: 1,
            type: "text",
            time: "12:56",
            userinfo: {
              uid: -1,
              username: "哈哈123",
              face: "/static/img/face.jpg",
            },
            content: { text: "为什么温度会相差那么大？" },
          },
        },
        {
          type: "user",
          msg: {
            id: 2,
            type: "text",
            time: "12:57",
            userinfo: {
              uid: 1,
              username: "测试",
              face: "/static/img/im/face/face_2.jpg",
            },
            content: {
              text:
                "这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。",
            },
          },
        },
        {
          type: "user",
          msg: {
            id: 3,
            type: "voice",
            time: "12:59",
            userinfo: {
              uid: 1,
              username: "测试",
              face: "/static/img/im/face/face_2.jpg",
            },
            content: { url: "/static/voice/1.mp3", length: "00:06" },
          },
        },
        {
          type: "user",
          msg: {
            id: 4,
            type: "voice",
            time: "13:05",
            userinfo: {
              uid: -1,
              username: "哈哈123",
              face: "/static/img/face.jpg",
            },
            content: { url: "/static/voice/2.mp3", length: "00:06" },
          },
        },
      ];
    },
    //处理图片尺寸
    setPicSize(content) {},
    // 选择图片发送
    chooseImage() {},
    // 选择表情
    chooseEmoji() {
      this.hideMore = true;
    },
    //添加表情
    addEmoji(em) {
      this.textMsg += em.alt;
    },
    // 发送消息
    sendInfo() {
      if (!this.textMsg) {
        return;
      }
      let content = this.replaceEmoji(this.textMsg);
      let msg = { text: content };
      this.sendMsg(msg, "text");
      this.textMsg = ""; //清空输入框
    },
    //替换表情符号为图片
    replaceEmoji(str) {
      let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
        console.log("item: " + item);
        for (let i = 0; i < this.emojiList.length; i++) {
          let row = this.emojiList[i];
          for (let j = 0; j < row.length; j++) {
            let EM = row[j];
            if (EM.alt == item) {
              //在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
              //比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
              let onlinePath = "";
              let imgstr =
                '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
              console.log("imgstr: " + imgstr);
              return imgstr;
            }
          }
        }
      });
      return (
        '<div style="display: flex;align-items: center;word-wrap:break-word;">' +
        replacedStr +
        "</div>"
      );
    },
    // 发送消息
    sendMsg(content, type) {
      //实际应用中，此处应该提交长连接，模板仅做本地处理。
      var nowDate = new Date();
    },
    // 添加文字消息到列表
    addTextMsg(msg) {
      this.msgList.push(msg);
    },
    // 添加图片消息到列表
    addImgMsg(msg) {
      msg.msg.content = this.setPicSize(msg.msg.content);
      this.msgImgList.push(msg.msg.content.url);
      this.msgList.push(msg);
    },
    addRedEnvelopeMsg(msg) {
      this.msgList.push(msg);
    },
  },
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
  justify-content: space-between;
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
  height: calc(100% - 50px);
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
  width: calc(100% - 312px);
}
.talk-window-box {
  height: 100%;
  width: 100%;
}
.talk-info-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c5c5c6;
}
.talk-info-name {
  text-align: left;
  padding-left: 15px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  font-weight: 700;
}
.talk-info-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.button-item {
  margin-right: 15px;
  width: 28px;
  height: 28px;
}
.button-item:hover {
  background-color: #f9f9f9;
}
#info-user,
#info-order {
  width: 24px;
  height: 24px;
}
/* 聊天显示窗口 */
.talk-info-window {
  height: calc(100% - 41px);
}
.talk-main-window {
  height: calc(100% - 201px);
  padding: 0 15px;
}
.row {
  padding: 10px 0;
}
.my {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.other {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.my-left {
  display: flex;
  align-items: flex-start;
  text-align: left;
  width: 100% - 60px;
  margin-right: 5px;
}
.other-right {
  display: flex;
  align-items: flex-start;
  text-align: left;
  width: 100% - 60px;
  margin-left: 5px;
}
.my-bubble,
.other-bubble {
  max-width: 100%;
  min-height: 45px;
  display: flex;
  align-items: center;
  word-break: break-word;
  border-radius: 5px;
  /* TODO */
  padding: 0px 8px;
  font-family: "楷体_GB2312";
}
.my-bubble {
  background-color: #2683f5;
  color: white;
}
.other-bubble {
  background-color: #eeeeee;
}
.my-left::after {
  content: "";
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 10px solid #2683f5;
  border-bottom: 8px solid transparent;
  margin-top: 14px;
}
.other-right::before {
  content: "";
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 10px solid #eeeeee;
  border-bottom: 8px solid transparent;
  margin-top: 14px;
}
.bubble-img {
  padding: 5px 0px;
}
/* 用户资料 */
.user-info-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10000;
  bottom: 0px;
  right: 0px;
}
.talk-user-info {
  width: 280px;
  height: calc(100% - 7% - 41px);
  position: absolute;
  bottom: 0px;
  right: 0px;
  box-shadow: 0px 5px 8px 3px rgba(0, 0, 0, 0.3);
  background-color: white;
}
/* 动画 */
.slide-right-enter-active {
  transition: all 0.3s linear;
}
.slide-right-leave-active {
  transition: all 0.3s linear;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(280px);
}
.slide-top-enter-active {
  transition: all 0.3s linear;
}
.slide-top-leave-active {
  transition: all 0.3s linear;
}
.slide-top-enter,
.slide-top-leave-to {
  transform: translatey(40px);
}
/* 聊天输入 */
.talk-input-box {
  border-top: 1px solid #c5c5c6;
  height: 200px;
  padding: 0px 10px;
}
.change-font-box {
  position: absolute;
  height: 40px;
  width: calc(100% - 312px);
  right: 0px;
  bottom: 200px;
  z-index: 10000;
  border-top: 1px solid #c5c5c6;
}
.change-font-border{
  width: calc(100% - 20px);
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px;
}
.talk-tool-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px 5px 10px;
}
.talk-tool-item {
  margin-right: 15px;
  padding: 3px;
}
.talk-tool-item:hover {
  background-color: #eeeeee;
}
#tool-font {
  width: 18px;
  height: 18px;
}
#tool-emj,
#tool-photo {
  width: 22px;
  height: 22px;
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
.article-blank {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}
.aside-blank {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  color: #999999;
}
</style>