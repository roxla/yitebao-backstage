<template>
  <div id="app-index-set">
    <div v-show="showPage" class="app-index-page">
      <div class="app-info-box">
        <div class="app-title-box">
          <div class="app-info-title">
            轮播图设置
            <span>(最多5张)</span>
          </div>
          <div class="app-title-button">
            <el-button :disabled="imgList.length>=5" type="primary" class="app-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
        <div class="app-info-main">
          <div v-show="imgList.length<=0" class="app-info-none">暂无轮播图</div>
          <div v-for="(item,index) in imgList" :key="index" class="item-box">
            <div class="app-item-box">
              <div class="app-item-title">
                <div @click="go()" class="app-item-edit">编辑</div>
                <div @click="imgDel" class="app-item-del">删除</div>
              </div>
              <div class="img-item-box">
                <img :src="item.img" />
              </div>
              <div class="img-item-footer">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-info-box">
        <div class="app-title-box">
          <div class="app-info-title">
            商品推荐设置
            <span>(最多99个)</span>
          </div>
          <div class="app-title-button">
            <el-button :disabled="shopList.length>=99" type="primary" class="app-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
        <div class="app-info-main">
          <div v-show="shopList.length<=0" class="app-info-none">暂无商品推荐</div>
          <div v-for="(item,index) in shopList" :key="index" class="item-box">
            <div class="app-item-box">
              <div class="app-item-title">
                <div @click="go()" class="app-item-edit">编辑</div>
                <div @click="imgDel" class="app-item-del">删除</div>
              </div>
              <div class="shop-item-main">
                <div class="shop-item-img">
                  <img :src="item.img" />
                </div>
                <div class="shop-item-text">
                  <div style="width: 100%;">
                    <div class="shop-text-title">{{item.name}}</div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">商品售价：</div>
                      <div class="shop-info-text">{{item.price.toFixed(2)}} 元</div>
                    </div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">总销售量：</div>
                      <div class="shop-info-text">{{item.cost.toFixed(2)}} 元</div>
                    </div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">新品否：</div>
                      <div class="shop-info-text">{{item.isNew}}</div>
                    </div>
                    <div class="shop-item-rank">
                      <div class="rank-text">
                        <div>
                          <span>1</span>/30
                        </div>
                        <div>排名</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-info-box">
        <div class="app-title-box">
          <div class="app-info-title">
            推荐商家设置
            <span>(最多99个)</span>
          </div>
          <div class="app-title-button">
            <el-button :disabled="businessList.length>=99" type="primary" class="app-plus">
              <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
            </el-button>
          </div>
        </div>
        <div class="app-info-main" @scroll.passive="handleScroll($event,imgDel)">
          <div v-show="businessList.length<=0" class="app-info-none">暂无推荐商家</div>
          <div v-for="(item,index) in businessList" :key="index" class="item-box">
            <div class="app-item-box">
              <div class="app-item-title">
                <div @click="go()" class="app-item-edit">编辑</div>
                <div @click="imgDel" class="app-item-del">删除</div>
              </div>
              <div class="shop-item-main">
                <div class="shop-item-img">
                  <img :src="item.img" />
                </div>
                <div class="shop-item-text">
                  <div style="width: 100%;">
                    <div class="shop-text-title">{{item.name}}</div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">人均单价：</div>
                      <div class="shop-info-text">{{item.price.toFixed(2)}} 元</div>
                    </div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">月销售量：</div>
                      <div class="shop-info-text">{{item.cost.toFixed(2)}} 元</div>
                    </div>
                    <div class="shop-item-info">
                      <div class="shop-info-title">位置：</div>
                      <div class="shop-info-text">{{item.loc}}</div>
                    </div>
                    <div class="shop-item-rank">
                      <div class="rank-text">
                        <div>
                          <span>1</span>/30
                        </div>
                        <div>排名</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-show="!showPage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: true,
      imgList: [],
      shopList: [],
      businessList: []
    };
  },
  created() {
    this.getImgData();
    this.getShopData();
    this.getBusinessData();
  },
  methods: {
    // 跳转
    go(url) {
      this.$router.push({ path: url });
    },
    getImgData() {
      this.axios.get("/static/Json/appindex.json").then(res => {
        this.imgList = res.data.imgList;
      });
    },
    getShopData() {
      this.axios.get("/static/Json/appindex.json").then(res => {
        this.shopList = res.data.shopList;
      });
    },
    getBusinessData() {
      this.axios.get("/static/Json/appindex.json").then(res => {
        this.businessList = res.data.business;
      });
    },
    imgDel() {
      console.log(123);
    },
    // 下拉检测
    handleScroll(e,func) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if(scrollBottom === 0){
        console.log(1);
        func();
      }
    }
  }
};
</script>

<style scoped>
#app-index-set {
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.app-index-page {
  padding: 10px;
}
.app-info-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
}
/* 首页设置标题 */
.app-title-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.app-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.app-plus:focus,
.app-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
.app-plus:disabled {
  background: #7cedd7;
  border-color: #7cedd7;
  color: #fff;
}
.app-info-title {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #1abc9c;
  border-left: 4px solid #f5bc10;
  padding-left: 15px;
}
.app-info-title span {
  color: black;
  font-size: 14px;
  margin-left: 10px;
}
/* 首页设置主体 */
.app-info-main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;
}
.app-info-none {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
.item-box {
  width: calc((100% - 20px) / 3);
  margin-right: 10px;
  padding-top: 15px;
}
.item-box:nth-of-type(1),
.item-box:nth-of-type(2),
.item-box:nth-of-type(3) {
  padding-top: 0px;
}
.item-box:nth-of-type(3n + 1) {
  margin-right: 0px;
}
/* 通用头部 */
.app-item-box {
  border: 1px solid #d7d7d7;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
}
.app-item-title {
  padding-bottom: 3%;
  background-color: #eaeaea;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.app-item-edit,
.app-item-del {
  padding: 6px 16px;
  color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid #d7d7d7;
  font-size: 14px;
  border-top: 0px;
}
.app-item-edit:hover,
.app-item-del:hover {
  cursor: pointer;
}
.app-item-edit {
  margin-right: 5px;
  background-color: #23c8ad;
}
.app-item-del {
  background-color: #e8934f;
  border-right: 0px;
}
/* 轮播图 */
.img-item-box {
  width: 100%;
  height: 0px;
  padding-bottom: 45%;
  position: relative;
}
.img-item-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
.img-item-footer {
  font-size: 14px;
  padding: 5px;
  text-align: left;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  background: #eaeaea;
}
/* 商品&商家 */
.shop-item-main {
  display: flex;
  background-color: #44a854;
}
.shop-item-img {
  position: relative;
  width: 40%;
  height: 0px;
  padding-bottom: 35%;
  overflow: hidden;
}
.shop-item-img img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
}
.shop-item-text {
  width: 60%;
  position: relative;
  display: flex;
  align-items: center;
}
.shop-text-title {
  color: white;
  font-size: 17px;
  margin: 5px 0px 7px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  width: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shop-item-info {
  display: flex;
  align-items: flex-start;
  color: white;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  margin: 3px 0px;
}
.shop-info-title {
  width: 38%;
  text-align: right;
}
.shop-info-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
.shop-item-rank {
  width: 45px;
  height: 45px;
  position: absolute;
  font-size: 12px;
  right: 7px;
  bottom: 30px;
  background: white;
  border-radius: 2500px;
}
.rank-text {
  position: absolute;
  top: 5px;
  left: 9px;
}
.rank-text span {
  font-size: 17px;
  font-weight: 500;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
</style>