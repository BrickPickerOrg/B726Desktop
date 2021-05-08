<template>
  <div class="search-wrapper">
    <input
      class="search-input"
      placeholder="搜索音乐"
      type="text"
      v-model="keyword"
      @keydown.enter="queryMusic"
    />
    <a class="search-submit-btn iconfont-search" href="javascript:;" @click="queryMusic"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const $router = useRouter();
    const $route = useRoute();
    const keyword = ref($route.query.keyword || '');
    const queryMusic = () => {
      $router.push(`/search?keyword=${keyword.value.toString()}`);
    };

    return {
      keyword,
      queryMusic
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.search-wrapper {
  background-color: rgba($border-color, 0.5);
  padding: 5px 10px;
  border-radius: 2px;
  overflow: hidden;
  margin-left: 20px;

  .search-input {
    position: relative;
    top: -2px;
    width: 240px;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    color: $font-color;
    margin-left: 10px;

    &::placeholder {
      color: $font-second-color;
    }
  }

  .search-submit-btn {
    color: $font-color;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
