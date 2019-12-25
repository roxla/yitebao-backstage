<template>
  <div class="tabs">
    <div class="tabs__nav">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        ref="tabs"
        @click="onClick(index)"
        class="tab"
        :style="getTabStyle(tab, index)"
        :class="{'tab--active': index === curActive,}"
      >
        <div class="pentagon">
          <span>{{tab.title}}</span>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "tabs",
  model: {
    prop: "active"
  },
  props: {
    color: String,
    lineWidth: {
      type: Number,
      default: null
    },
    lineHeight: {
      type: Number,
      default: 3
    },
    duration: {
      type: Number,
      default: 0.3
    },
    active: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      tabs: [],
      curActive: null
    };
  },
  computed: {},
  watch: {
    active(val) {
      if (val !== this.curActive) {
        this.correctActive(val);
      }
    },
    tabs() {
      this.correctActive(this.curActive || this.active);
    }
  },
  mounted() {
    this.correctActive(this.active);
    this.isFirstLoaded = true;
    this.$nextTick(() => {
      this.isFirstLoaded = false;
    });
  },
  methods: {
    onClick(index) {
      const { title } = this.tabs[index];
      this.setCurActive(index);
      this.$emit("click", index, title);
    },
    setActive() {},
    correctActive(active) {
      active = +active;
      // console.log(active, 'active');
      const exist = this.tabs.some(tab => tab.index === active);
      const defaultActive = (this.tabs[0] || {}).index || 0;
      this.setCurActive(exist ? active : defaultActive);
    },
    setCurActive(active) {
      if (active !== this.curActive) {
        // console.log(this.curActive);
        if (this.curActive !== null) {
          this.$emit("change", active, this.tabs[active].title);
        }
        this.curActive = active;
      }
    },
    getTabStyle(tab, index) {
      if (index === this.curActive) {
        return {
          color: this.color,
          fontWeight: "bold"
        };
      }
    }
  }
};
</script>

<style scoped>
.tab {
  font-size: 16px;
  padding: 0px 15px;
}
.tab:first-of-type {
  padding-left: 0px;
}
.tab:last-of-type {
  padding-right: 0px;
}
.tab span {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 20px;
  color: white;
  font-size: 13px;
}
.tab--active span {
  font-weight: bold;
  top: 25px;
  font-size: 18px;
}
.tab--active .pentagon {
  border-color: #1abc9c;
  width: 92px;
  border-width: 0px 0px 50px;
  top: -20px;
}
.tab--active .pentagon::before {
  top: 50px;
  left: 0px;
  border-width: 35px 46px 0px 46px;
  border-color: #1abc9c transparent transparent;
}
.tabs {
  position: relative;
  margin: 30px 10px 10px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.35);
}
.tabs__nav {
  display: flex;
  user-select: none;
  position: relative;
  background-color: #fff;
  height: 100%;
  box-sizing: content-box;
  padding: 0px 10px 30px;
}
/* 五边形 */
.pentagon {
  width: 72px;
  position: relative;
  border-width: 0px 0px 40px;
  border-style: solid;
  border-color: #001d3e;
}
.pentagon::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 40px;
  left: 0px;
  border-width: 25px 36px 0px 36px;
  border-style: solid;
  border-color: #001d3e transparent transparent;
}
</style>