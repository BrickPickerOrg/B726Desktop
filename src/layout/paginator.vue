<!-- @format -->

<template>
  <div class="paginator-wrapper">
    <button
      class="paginator-btn iconfont-back"
      :disabled="prevDisabled"
      @click="changePage(currentPage - 1)"
    ></button>
    <button
      class="paginator-btn paginator-count-btn"
      :checked="currentPage === count"
      v-show="count <= 7"
      v-for="count in totalPage"
      :key="count"
      @click="changePage(count)"
    >
      {{ count }}
    </button>
    <span class="omit-text" v-show="totalPage > 8">···</span>
    <button
      class="paginator-btn paginator-count-btn"
      :checked="currentPage === totalPage"
      v-show="totalPage > 7"
      @click="changePage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="nextDisabled"
      class="paginator-btn iconfont-go"
      @click="changePage(currentPage + 1)"
    ></button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    page: {
      type: [Number, String],
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const totalPage = computed(() => props.totalPage);
    const currentPage = ref<number>(parseInt(props.page.toString()));

    const prevDisabled = computed(() => currentPage.value === 1);
    const nextDisabled = computed(() => currentPage.value === totalPage.value);

    const changePage = (page: number) => {
      if (page === 0) return;
      if (page === totalPage.value + 1) return;
      emit('changePage', page);
      currentPage.value = page;
    };

    watch(totalPage, () => {
      changePage(1);
    });

    return {
      totalPage,
      currentPage,
      prevDisabled,
      nextDisabled,
      changePage
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.paginator-wrapper {
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  .paginator-btn {
    width: 30px;
    height: 30px;
    outline: none;
    border: 1px solid rgba($font-second-color, 0.2);
    background-color: transparent;
    color: $font-second-color;
    margin: 0 3px;
    border-radius: 50%;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: $primary-color;
      color: $body-bg;
    }

    &:disabled {
      cursor: default;
      color: rgba($font-second-color, 0.4);

      &:hover {
        background-color: transparent;
        color: rgba($font-second-color, 0.4);
      }
    }

    &.paginator-count-btn {
      border: none;
      &:hover {
        background-color: transparent;
        color: $primary-color;
      }

      &[checked='true'] {
        color: $primary-color;
      }
    }
  }

  .omit-text {
    display: inline-block;
    font-size: 12px;
    color: $font-second-color;
  }
}
</style>
