<template>
  <transition name="dialog-fade">
    <div
      v-show="visible"
      @click.self="handleWrapperClick"
      class="my-dialog__wrapper"
      style="z-index: 2001;"
    >
      <div
        :key="key"
        :class="['my-dialog', { 'my-is-fullscreen': fullscreen, 'my-dialog--center': center }, customClass]"
        :style="style"
      >
        <div class="my-dialog__header">
          <slot name="title">
            <span class="my-dialog__title">{{ title }}</span>
            <div @click="handleClose" class="my-dialog__headerbtn">
              <svg-icon class="title-icon" icon-class="u38"></svg-icon>
            </div>
          </slot>
        </div>
        <div class="my-dialog__body">
          <slot></slot>
        </div>
        <div class="my-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      closed: false,
      key: 0
    };
  },
  props: {
    title: {
      type: String,
      default: "弹窗标题"
    },
    visible: Boolean,
    width: String, // Dialog 的宽度
    fullscreen: {
      // 是否为全屏 Dialog
      type: Boolean,
      default: false
    },
    top: {
      // Dialog CSS 中的 margin-top 值
      type: String,
      default: "15vh"
    },
    beforeClose: Function,
    center: {
      // 是否对头部和底部采用居中布局
      type: Boolean,
      default: false
    },
    customClass: {
      // Dialog 的自定义类名
      type: String,
      default: ""
    },
    closeOnClickModal: {
      // 是否可以通过点击 modal 关闭 Dialog
      type: Boolean,
      default: true
    }
  },
  computed: {
    style() {
      let style = {};
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
      }
      return style;
    }
  },
  methods: {
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    }
  }
};
</script>

<style scoped>
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
@-webkit-keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
.my-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  padding: 0px 20px 10px;
}
.my-dialog.is-fullscreen {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  overflow: auto;
}
.my-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
}
.my-dialog__header {
  padding: 5px 0px;
  text-align: left;
  border-bottom: 1px dashed #02bda6;
}
.my-dialog__title {
  font-size: 14px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  color: #02bda6;
}
.my-dialog__headerbtn {
  background-color: #02bda6;
  position: absolute;
  padding: 3px 13px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  top: 0px;
  right: 20px;
}
.my-dialog__headerbtn:hover {
  background-color: #d97676;
  cursor: pointer;
}
.title-icon {
  font-size: 14px;
}
.my-dialog__body {
  width: 100%;
  padding: 10px 0px;
  word-break:break-all;
  box-sizing: border-box;
}
.my-dialog__footer {
  border-top: 1px dashed #02bda6;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 10px;
}
.my-dialog--center {
  text-align: center;
}
.my-dialog--center .my-dialog__body {
  text-align: initial;
  padding: 5px 0px 10px;
}
.my-dialog--center .my-dialog__footer {
  text-align: inherit;
}
</style>