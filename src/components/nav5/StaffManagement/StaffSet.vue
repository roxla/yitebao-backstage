<template>
  <div class="staff-set">
    <div class="set-info-box">
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>姓名
        </div>
        <div ref="input" class="set-info-input">
          <input
            v-model="name"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入姓名"
            type="text"
          />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>手机号
        </div>
        <div ref="input" class="set-info-input">
          <input
            v-model="tel"
            @focus="changeColor"
            @blur="reChange"
            placeholder="请输入手机号"
            type="text"
          />
        </div>
      </div>
      <div v-show="JSON.stringify(data) == '{}'" class="set-info">
        <div class="set-info-title">
          <span>*</span>密码
        </div>
        <div ref="input" class="set-info-input">
          <input v-model="pw" @focus="changeColor" @blur="reChange" placeholder="请输入密码" type="text" />
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>性别
        </div>
        <div style="text-align: left;">
          <el-select v-model="sex" class="search-select" placeholder="请选择性别">
            <el-option label="女" :value="1"></el-option>
            <el-option label="男" :value="0"></el-option>
          </el-select>
        </div>
      </div>
      <div class="set-info">
        <div class="set-info-title">
          <span>*</span>住址
        </div>
        <div class="address-box">
          <el-input @focus="getMap" v-model="address" id="userAddress" class="search-set-input"></el-input>
        </div>
      </div>
      <div v-show="JSON.stringify(data) != '{}'" class="set-info">
        <div class="set-info-title">
          <span style="margin-left: 7.8px;"></span>详细地址
        </div>
        <div class="address-text">{{userAddr}}</div>
      </div>
    </div>
    <div class="set-authority-box">
      <p class="authority-title">
        <span>*</span>权限设置
      </p>
      <div class="authority-item-box">
        <el-checkbox
          class="set-authority-all"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox
            class="set-authority-item"
            v-for="city in cities"
            :label="city"
            :key="city.index"
          >{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="set-button-box">
      <el-button @click="postStaffData" type="success">
        <span style="padding: 0px 20px;">确 认</span>
      </el-button>
      <div style="padding: 0px 30px;"></div>
      <el-button @click="go('/main/staffmanagement')" type="info">
        <span style="padding: 0px 20px;">取 消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import RimFramework from "@/common/rim-framework.vue";
export default {
  components: {
    RimFramework
  },
  data() {
    return {
      data: {},
      // input
      sex: "",
      name: "",
      tel: "",
      pw: "",
      userAddr: "",
      address: "",
      district: "",
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false
    };
  },
  created() {
    this.axios.get("/static/Json/staffSetList.json").then(res => {
      this.cities = res.data;
    });
  },
  mounted() {
    if (!!this.$route.query.item) {
      let data = JSON.parse(this.$route.query.item);
      this.data = data;
      console.log(data);
      this.sex = data.sex;
      this.name = data.bwName;
      this.tel = data.phone;
      this.address = data.detailsAddress;
      if (data.detailsAddress == data.province) {
        this.userAddr = data.detailsAddress;
      } else if (data.detailsAddress == data.city) {
        this.userAddr = data.province + data.detailsAddress;
      } else if (data.detailsAddress == data.district) {
        this.userAddr = data.province + data.city + data.detailsAddress;
      } else {
        this.userAddr = data.province + data.city + data.district + data.detailsAddress;
      }
    }
  },
  methods: {
    // 选中input边框变色
    changeColor(e) {
      e.path[1].style.borderColor = "#1ABC9C";
    },
    reChange(e) {
      e.path[1].style.borderColor = "black";
    },
    // 多选框方法
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    go(url) {
      this.$router.push({ path: url });
    },
    postStaffData() {
      let pwd = false;
      if (!this.data.workerNo) {
        if (!!this.pw) {
          pwd = true;
        }
      } else {
        pwd = true;
      }
      if (
        !!this.tel &&
        !!this.name &&
        !!pwd &&
        !!JSON.stringify(this.sex) &&
        !!this.address
      ) {
        let port;
        let obj = {
          phone: this.tel,
          bwName: this.name,
          sex: this.sex,
          detailsAddress: this.address
        };
        if (!!this.district) {
          obj.province = this.district.split("省")[0] + "省";
          if (!!this.district.split("省")[1]) {
            obj.city = this.district.split("省")[1].split("市")[0] + "市";
            if (!!this.district.split("省")[1].split("市")[1]) {
              obj.district =
                this.district
                  .split("省")[1]
                  .split("市")[1]
                  .split("区")[0] + "区";
            }
          }
        }
        if (!!this.data.workerNo) {
          port = "worker/updateWorker";
          // obj.workerNo = this.data.workerNo;
        } else {
          port = "worker/addWorker";
          obj.pwd = this.pw;
        }
        let upData = this.$axios.upData(port, obj);
        upData.then(res => {
          if (res.data.status == 200) {
            if (!!this.data.workerNo) {
              this.$message.success("修改成功");
            } else {
              this.$message.success("添加成功");
            }
            this.$router.push({ path: "/main/staffmanagement" });
          } else if (res.data.status == 588) {
            this.$message.error(res.data.msg);
            this.checkLogin();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("有必填项未填写，请检查");
      }
    },
    getMap() {
      let that = this;
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "userAddress"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.address = e.poi.name;
          that.district = e.poi.district;
        }
      });
    }
  }
};
</script>

<style scoped>
.staff-set {
  background: white;
}
/* 员工信息设置位 */
.set-info-box {
  padding: 20px 10px 20px 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
}
/* 员工信息输入框 */
.set-info {
  width: 33%;
  margin-bottom: 20px;
}
.set-info-title {
  text-align: left;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  margin-bottom: 10px;
}
.set-info-title span {
  color: red;
  font-size: 20px;
}
.set-info-input {
  display: flex;
  justify-content: flex-start;
  margin-left: 7px;
  padding: 10px 10px;
  width: 80%;
  border: 2px solid black;
  border-radius: 3px;
}
.set-info-input input {
  width: 100%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
  margin: 0px;
}
.set-info-input input::placeholder {
  color: #999999;
}
.search-select {
  width: 88%;
  margin-left: 7px;
}
/* 权限设置位 */
.set-authority-box {
  padding: 0px 10px 20px 50px;
  text-align: left;
}
/* 权限设置标题 */
.authority-title {
  margin: 0px 0px 15px;
  font-size: 20px;
  font-weight: 700;
}
.authority-title span {
  color: red;
  font-size: 20px;
}
/* 权限设置项 */
.authority-item-box {
  width: 95%;
  border: 2px solid #cccccc;
  border-radius: 5px;
  text-align: left;
  padding: 20px 0px 0px 20px;
}
.set-authority-all {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
}
.set-authority-item {
  font-weight: 700;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  margin-bottom: 20px;
  margin-right: 40px;
  /* width: 10%; */
}
.set-button-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-box {
  margin-left: 7px;
  width: 88%;
}
.address-text{
  text-align: left;
  margin-left: 7px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  color: #a7a7a7;
}
</style>