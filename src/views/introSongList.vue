<template>
  <div class="intro-songlist-container">
    <div class="tab-header">
      <div class="tab" :class="tabIndex === 0 ? 'active' : ''" @click.stop="switchTab(0)">歌曲</div>
      <div class="tab" :class="tabIndex === 1 ? 'active' : ''" @click.stop="switchTab(1)">简介</div>
    </div>
    <div class="content">
      <transition name="fade">
        <div class="songlist-content" v-show="tabIndex === 0">
          <SongList :musicList="ownSongListData" :hideList="['cover']"></SongList>
        </div>
      </transition>
      <transition name="fade">
        <div class="intro-content" v-show="tabIndex === 1" v-html="ownIntro"></div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SongList from '@/views/songList.vue';

export default defineComponent({
  props: {
    songList: {
      type: Object,
      default: () => {}
    },
    intro: {
      type: String,
      default: ''
    }
  },

  components: {
    SongList
  },

  setup(props) {
    const ownSongListData = computed(() => props.songList);
    const ownIntro = computed(() => props.intro.replace(/\n/g, '<br>'));
    const tabIndex = ref(0);

    const switchTab = (index: number) => {
      tabIndex.value = index;
    };

    return {
      ownSongListData,
      ownIntro,
      tabIndex,
      switchTab
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.intro-songlist-container {
  .tab-header {
    display: flex;
    flex-flow: row nowrap;
    padding: 0 10px;
    margin-bottom: 15px;

    .tab {
      color: $font-second-color;
      font-size: 16px;
      font-weight: 500;
      width: 100px;
      padding: 15px;
      text-align: center;
      position: relative;
      cursor: pointer;
      transition: all 200ms;

      &::after {
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 4px;
        background-color: $primary-color;
        border-radius: 6px;
        transition: all 200ms;
      }

      &.active {
        color: $primary-color;

        &::after {
          width: 80px;
        }
      }
    }
  }

  .intro-content {
    padding: 5px 20px;
    font-size: 14px;
    line-height: 2em;
    color: rgba($font-color, 0.7);
    font-weight: 500;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
</style>
