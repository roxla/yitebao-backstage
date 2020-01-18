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
        <div class="tabs__item">
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
  padding: 0px 5px;
}
.tab:first-of-type {
  padding-left: 0px;
}
.tab:last-of-type {
  padding-right: 0px;
}
.tab span {
  width: 100%;
  font-size: 13px;
}
.tabs {
  position: relative;
}
.tabs__nav {
  display: flex;
  user-select: none;
  position: relative;
  background-color: #fff;
  height: 100%;
  box-sizing: content-box;
  padding: 0px 10px 10px;
}
.tabs__item{
  width: 121px;
  position: relative;
  border-radius: 2500px;
  border: 3px solid #26CAAC;
  padding: 5px 0px;
  cursor: pointer;
  box-shadow: 0px 0px 6px rgb(185,208,254);
  cursor: pointer;
}
.tab--active .tabs__item {
  background-color: #1C9781;
  color: white;
}
</style>