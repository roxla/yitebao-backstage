<template>
  <div>
    <div class="user-page" v-show="showPage">
      <div class="user-button-box">
        <el-input class="search-set-input" placeholder></el-input>
        <div style="padding: 0px 5px;"></div>
        <el-date-picker
          class="search-date"
          v-model="timeValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <div style="padding: 0px 15px;"></div>
        <el-button @click="getUserData()" type="primary" class="card-plus">
          <i class="el-icon-search el-icon--left"></i>搜索
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().toLocaleDateString());
              start.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timeValue: []
    };
  },
  computed: {
    timeDefaultStart() {
      let date = new Date(new Date().toLocaleDateString());
      return date;
    },
    timeDefaultEnd() {
      let date = new Date();
      return date;
    }
  },
  mounted() {
    this.timeValue = [this.timeDefaultStart, this.timeDefaultEnd];
  },
  methods: {
    getUserData() {
      console.log(this.timeValue);
    }
  }
};
</script>

<style scoped>
.user-page {
  padding: 10px;
}
.user-button-box {
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
}
.search-set-input {
  width: 20%;
}
.search-select {
  width: 35%;
}
.search-date {
  width: 36%;
}
/* 按钮设置 */
.card-plus {
  background: #1abc9c;
  border-color: #1abc9c;
}
.card-plus:focus,
.card-plus:hover {
  background: #1fdcb6;
  border-color: #1fdcb6;
  color: #fff;
}
.card-plus:disabled {
  background: #7cedd7;
  border-color: #7cedd7;
  color: #fff;
}
</style>