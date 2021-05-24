<template>
  <img
    class="cover-img"
    :src="defineSrc"
    :alt="defineAlt"
    :onerror="errorScript"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: ["src", "alt"],

  setup(props) {
    const defaultUrl =
      "https://data.quanziapp.com/files/sBAKxwj/FEF818C9-51CF-430C-AE8A-4EE9A4C47CD1.png";
    const errorScript = `this.src='${defaultUrl}'`;
    const defineSrc = computed(() => (props.src ? props.src : defaultUrl));
    const defineAlt = computed(() => (props.alt ? props.alt : "网络错误"));

    return {
      errorScript,
      defineSrc,
      defineAlt,
    };
  },
});
</script>

<style lang="scss" scoped>
.cover-img {
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
</style>
