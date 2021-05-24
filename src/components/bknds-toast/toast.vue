<template>
  <div class="toast-wrap">
    {{ msg }}
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  
  setup(props) {
    const msg = ref("");
    watch(() => props.message, (newVal) => {
      msg.value = newVal;
    })
    return {
      msg
    }
  }
}
</script>

<style scoped>
.toast-wrap {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 15px;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
</style>
