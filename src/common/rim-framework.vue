<template>
  <div
    :style="{padding:padding,marginLeft:marginLeft,width:width,borderColor:borderColor,borderStyle:borderStyle,borderWidth:borderWidth}"
    ref="input"
    class="set-info-input"
    :class="isRadius?'input-radius':''"
  >
    <input
      style="width: 100%;"
      v-if="type !== 'textarea'"
      :value="value"
      :disabled="disabled"
      @focus="changeColor"
      @blur="reChange"
      @input="handleInput"
      type="text"
      :placeholder="placeholder"
      :maxlength="type === 'number'?15:''"
    />
    <textarea
      v-if="type === 'textarea'"
      :value="value"
      :disabled="disabled"
      @focus="changeColor"
      @blur="reChange"
      @input="handleInput"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: this.value
    };
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    isRadius: {
      type: Boolean,
      default: false
    },
    marginLeft: {
      type: String,
      default: "7px"
    },
    padding: {
      type: String,
      default: "5px 10px"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "50%"
    },
    borderStyle: {
      type: String,
      default: "solid"
    },
    borderWidth: {
      type: String,
      default: "2px"
    },
    borderColor: {
      type: String,
      default: "black"
    },
    color: {
      type: String,
      default: "#1ABC9C"
    },
    placeholder: {
      type: String,
      default: ""
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  methods: {
    changeColor() {
      this.$refs.input.style.borderColor = this.color;
    },
    reChange() {
      this.$refs.input.style.borderColor = this.borderColor;
      let value = event.target.value;
      if (!!value) {
        if (value.indexOf(".") == value.length - 1) {
          event.target.value = event.target.value + "00";
        }
      }
    },
    handleInput(event) {
      if (this.type == "number") {
        let numReg = /^(\d*)(\.\d{0,2})?$/;
        let value = event.target.value;
        if (numReg.test(value)) {
          if (value.indexOf(".") == 0) {
            event.target.value = "0" + event.target.value;
          }
        } else {
          event.target.value = "";
        }
        this.$emit("input", event.target.value);
      } else {
        let value = event.target.value;
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
.set-info-input {
  display: flex;
  justify-content: flex-start;
  
  margin-bottom: 10px;
}
.set-info-input:last-of-type {
  margin-bottom: 0px;
}
.input-radius {
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
.set-info-input textarea {
  width: 100%;
  margin: 8px 10px 8px 0px;
  border: 0px;
  box-sizing: border-box;
  outline: 0;
  color: #999999;
  margin: 0px;
}
.set-info-input textarea::placeholder {
  color: #999999;
}
</style>