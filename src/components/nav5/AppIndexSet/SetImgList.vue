<template>
  <div id="set-img-list">
    <div class="img-list-title">轮播图名称和图片设置</div>
    <div class="img-main">
      <div class="img-item-box">
        <div class="img-item-title">
          <span>*</span>轮播图名称：
        </div>
        <div class="img-item-text">
          <el-input class="search-set-input" placeholder="请输入轮播图名称" v-model="imgName"></el-input>
        </div>
      </div>
      <div class="img-item-box">
        <div class="img-item-title">轮播图APP页面选择：</div>
        <div class="img-item-text">
          <el-select
            @change="indexSelect"
            filterable
            v-model="indexValue"
            class="search-select"
            placeholder="请选择页面"
          >
            <el-option label="无" value></el-option>
            <el-option
              v-for="item in indexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="img-item-box">
        <div class="img-item-title">轮播图链接商铺选择：</div>
        <div class="img-item-text">
          <el-select
            filterable
            :disabled="!isOutLink"
            v-model="shopValue"
            class="search-select"
            placeholder="请选择商铺"
          >
            <el-option label="无" value></el-option>
            <el-option
              v-for="item in shopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="img-item-box">
        <div class="img-item-title">轮播图外部链接地址：</div>
        <div class="img-item-text">
          <el-input
            class="search-set-input"
            placeholder="请输入链接地址"
            v-model="imgLink"
            :disabled="isOutLink"
          ></el-input>
        </div>
      </div>
      <div class="img-item-box">
        <div class="img-item-title">
          <span>*</span>上传轮播图：
        </div>
        <div class="img-item-text" style="margin-left: 0px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="img-footer">
      <el-button @click="postImgData" type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button @click="go('/main/appindexset')" type="info">
        <span style="padding: 0px 20px;">取 消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      imgName: "",
      imgLink: "",
      imageUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      isOutLink: false,
      indexValue: "",
      indexOptions: [],
      shopValue: "",
      shopOptions: []
    };
  },
  created() {
    this.getShopList();
    this.getPageList();
  },
  mounted() {
    if (!!this.$route.query.item) {
      let data = JSON.parse(this.$route.query.item);
      this.data = data;
      this.imgName = data.name;
      this.imageUrl = data.img;
    }
  },
  methods: {
    go(url) {
      this.$router.push({ path: url });
    },
    getShopList() {
      let port = "business/getBusinessListClose";
      let obj = {};
      let upData = this.$axios.upData(port, obj);
      upData.then(res => {
        if (res.data.status == 200) {
          let data = res.data.data;
          let list = [];
          for (let i = 0; i < data.length; i++) {
            if (!data[i].businessName) {
              data[i].businessName = data[i].businessNo;
            }
            list.push({
              label: data[i].businessName,
              value: data[i].businessNo
            });
          }
          this.shopOptions = list;
        } else if (res.data.status == 588) {
          this.$message.error(res.data.msg);
          this.checkLogin();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getPageList() {
      this.axios.get("/static/Json/pageSelect.json").then(res => {
        this.indexOptions = res.data;
      });
    },
    indexSelect() {
      if (!!this.indexValue) {
        this.isOutLink = true;
      } else {
        this.isOutLink = false;
      }
    },
    postImgData() {
      if (!!this.imgName && !!imageUrl) {
        let url = "";
        if (!!this.indexValue) {
          if (!!this.shopValue) {
            url = this.indexValue + "?businessNo=" + this.shopValue;
          } else {
            url = this.indexValue;
          }
        } else {
          url = this.imgLink;
        }
        let obj = {
          item1: this.imgName,
          item2: this.imageUrl,
          item3: url
        };
      } else {
        this.$message.warning("有必填项未填写，请检查");
      }
    }
  }
};
</script>

<style scoped>
#set-img-list {
  margin-left: 25px;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.img-list-title {
  margin: 20px 10px 15px 0px;
  padding: 13px 25px;
  text-align: left;
  background-color: #f2f2f2;
  font-size: 14px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
/* 轮播图设置主体 */
.img-main {
  margin-right: 10px;
}
/* 轮播图设置子项 */
.img-item-box {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.img-item-box:last-of-type {
  margin-bottom: 0px;
}
/* 轮播图设置子项标题 */
.img-item-title {
  width: 20%;
  text-align: right;
  font-size: 14px;
}
.img-item-title span {
  font-size: 16px;
  color: red;
}
/* 轮播图设置子项内容 */
.img-item-text {
  width: 87%;
  margin-left: 10px;
  text-align: left;
}
.search-set-input,
.search-select {
  width: 35%;
}
.avatar-uploader {
  text-align: left;
  margin-left: 10px;
  border: 1px dashed #d9d9d9;
  width: 120px;
  height: 120px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 轮播图按钮设置 */
.img-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px 20px;
}
</style>