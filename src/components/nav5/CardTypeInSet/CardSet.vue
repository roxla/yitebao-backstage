<template>
  <div id="card-set">
    <div class="card-title">卡类型金额折扣和使用规则</div>
    <div class="card-main">
      <div class="card-item-box">
        <div class="card-item-title">
          <span>*</span>卡类型名称：
        </div>
        <div class="card-item-text">
          <RimFramework
            placeholder="请输入卡类型名称"
            v-model="cardName"
            marginLeft="10px"
            width="30%"
            :isRadius="true"
          />
        </div>
      </div>
      <div class="card-item-box">
        <div class="card-item-title">
          <span>*</span>卡类型图标：
        </div>
        <div class="card-item-text">
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
      <div style="align-items: flex-start;" class="card-item-box">
        <div class="card-item-title">
          <span>*</span>会员卡类型：
        </div>
        <div style="margin-left: 12px;" class="card-item-text">
          <div class="card-item-radio">
            <div style="margin-bottom: 5px;">
              <el-radio v-model="isBoon" :label="true">团体卡</el-radio>
            </div>
            <div>
              <el-radio v-model="isBoon" :label="false">非团体卡</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="card-item-box" style="margin-bottom: 0px;">
        <div class="card-item-title">
          <span>*</span>折扣率：
        </div>
        <div class="card-item-text">
          <div class="card-item-info">
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                placeholder="请输入折扣"
                v-model="discount"
                marginLeft="4px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>折</div>
          </div>
        </div>
      </div>
      <div class="discount-tips">只能输入数字，范围为1~10</div>
      <div class="card-item-box">
        <div class="card-item-title">
          <span>*</span>销售价格：
        </div>
        <div class="card-item-text">
          <div class="card-item-info">
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                placeholder="请输入价格"
                v-model="price"
                marginLeft="4px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>元</div>
          </div>
        </div>
      </div>
      <div class="card-item-box">
        <div class="card-item-title">
          <span>*</span>赠送金额：
        </div>
        <div class="card-item-text">
          <div class="card-item-info">
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                placeholder="请输入金额"
                v-model="givecash"
                marginLeft="4px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>元</div>
          </div>
        </div>
      </div>
      <div class="card-item-box">
        <div class="card-item-title">
          <span>*</span>有效期天数：
        </div>
        <div class="card-item-text">
          <div class="card-item-info">
            <div style="margin-left: 9px;">购卡当日起</div>
            <div style="width: 15%;margin: 0px 6px;">
              <RimFramework
                type="number"
                v-model="day"
                placeholder="请输入时间"
                marginLeft="0px"
                width="80%"
                :isRadius="true"
              />
            </div>
            <div>天内可用</div>
          </div>
        </div>
      </div>
      <div style="align-items: flex-start;" class="card-item-box">
        <div class="card-item-title">
          <span>*</span>卡类型说明：
        </div>
        <div class="card-item-text editor-item">
          <editor-bar v-model="detail" :isClear="isClear"></editor-bar>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <el-button @click="postCard" type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button @click="go('/main/cardtypeset')" type="info">
        <span style="padding: 0px 20px;">取 消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import RimFramework from "@/common/rim-framework.vue";
import EditorBar from "@/common/wangenduit.vue";
export default {
  components: {
    RimFramework,
    EditorBar
  },
  data() {
    return {
      cardName: "",
      imageUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      discount: "",
      price: "",
      givecash: "",
      day: "",
      isBoon: "",
      isClear: false,
      detail: ""
    };
  },
  mounted(){
    if(!!this.$route.query.item){
      let data = JSON.parse(this.$route.query.item);
      console.log(data);
      this.cardName = data.cardTypeName;
      this.imageUrl = data.cardTypeImg;
      this.isBoon = data.isBoon;
      this.discount = data.cardDiscount;
      this.price = data.price;
      this.givecash = data.given;
      this.day = data.validityDays;
    }
  },
  methods: {
    // 跳转
    go(url) {
      this.$router.push({ path: url });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    postCard() {
      if (
        !!this.cardName &&
        !!this.imageUrl &&
        !!this.price &&
        !!this.givecash &&
        !!this.day &&
        !!this.isBoon
      ) {
        if (!this.discount || this.discount < 1 || this.discount > 10) {
          this.$message.warning("折扣率填写错误");
        } else {
          console.log(Math.floor(parseFloat(this.discount) * 10));
        }
      } else {
        this.$message.warning("有必填项未填写，请检查并填写");
      }
    }
  }
};
</script>

<style scoped>
#card-set {
  background: white;
  margin-left: 25px;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.card-title {
  margin: 20px 10px 10px 0px;
  padding: 13px 25px;
  text-align: left;
  background-color: #f2f2f2;
  font-size: 14px;
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
/* 卡类型设置主体 */
.card-main {
  margin-right: 10px;
}
/* 卡类型设置子项 */
.card-item-box {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.card-item-box:last-of-type {
  margin-bottom: 0px;
}
/* 卡类型设置子项标题 */
.card-item-title {
  width: 15%;
  text-align: right;
  font-size: 14px;
}
.card-item-title span {
  font-size: 16px;
  color: red;
}
/* 卡类型设置子项内容 */
.card-item-text {
  width: 87%;
}
.card-item-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.card-item-radio {
  text-align: left;
  margin-bottom: 10px;
}
.discount-tips {
  margin: 5px 0px 15px calc(15% + 5px);
  text-align: left;
  color: red;
  font-size: 13px;
}
.upimg {
  width: 120px;
  height: 120px;
  line-height: 120px;
  /* border: 1px dashed #c4c4c4; */
  border-radius: 5px;
}
.upimg img {
  width: 100%;
  height: 100%;
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
.avatar{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-item-radio {
  text-align: left;
  margin-bottom: 10px;
}
.card-item-radio:last-of-type {
  margin-bottom: 0px;
}
/* 卡类型按钮 */
.card-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px 20px;
}
/* 编辑器 */
.editor-item{
  width: 72%;
  margin-left: 10px;
}
</style>