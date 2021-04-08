<template>
  <div class="home-container">
    <div class="home-title">
      <span class="title">发现更多宝藏歌单</span>
      <span class="more" @click.stop="viewPlaylistSquare">更多<i class="iconfont-go"></i></span>
    </div>
    <PlaylistItems :items="homeData.playlist" :occupy="occupy"></PlaylistItems>
    <div class="home-song-items-wrap">
      <div class="song-items-wrap-left">
        <div class="img-box" v-for="img in homeData.songsImgBox" :key="img"><img :src="img" /></div>
        <div class="img-mask">
          <div class="title">新歌速递</div>
          <div class="play-all-btn" @click.stop="playAll">播放全部</div>
        </div>
      </div>
      <div class="song-items-wrap-right">
        <div class="song-item" v-for="song in homeData.songs" :key="song.id">
          <div class="cover-wrap">
            <mg-image :src="song.cover" alt="" class="cover-img" />
          </div>
          <div class="info">
            <p class="song-name">
              <mg-text :text="song.songName" />
            </p>
            <p class="singer-text">
              <mg-text :text="getSingersName(song.singers)" />
            </p>
          </div>
          <div class="options">
            <div class="btn iconfont-play-single" @click.stop="playCheckMusic(song)"></div>
            <div class="btn iconfont-heart-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-title">
      <span class="title">新专辑抢先听</span>
    </div>
    <div class="album-items-wrap">
      <div class="album-wrap" v-for="album in homeData.albums" :key="album.id">
        <Album :album="album"></Album>
      </div>
    </div>
    <div class="home-title">
      <span class="title">数字专辑</span>
    </div>
    <div class="album-items-wrap">
      <div class="album-wrap" v-for="digital in homeData.digital" :key="digital.id">
        <Album :album="digital" digital></Album>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useApi from '@/plugins/api';
import usePlayerFn from '@/plugins/player';
import PlaylistItems from '@/views/playlist_items.vue';
import Album from '@/views/album_item.vue';

export default defineComponent({
  components: {
    PlaylistItems,
    Album
  },

  setup() {
    const { getSingersName, playCheckMusic, playAllList } = usePlayerFn();
    const { miGuMusicHomeApi } = useApi();
    const $router = useRouter();
    let occupy = ref<boolean>(true);
    let homeData = ref<any>({});

    const miGuMusicHome = async () => {
      occupy.value = true;
      const homeDataRes: any = await miGuMusicHomeApi();
      occupy.value = false;
      homeData.value = homeDataRes.data;
      homeData.value.playlist.splice(10, 12)
    };

    const viewPlaylistSquare = () => {
      $router.push({
        path: `/playlist`
      });
    };

    const playAll = () => {
      playAllList(homeData.value.songs)
    }

    miGuMusicHome();

    return {
      occupy,
      homeData,
      getSingersName,
      playCheckMusic,
      viewPlaylistSquare,
      playAll
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.home-container {
  height: 528px;
  padding: 15px;
  overflow-x: hidden;
  box-sizing: border-box;

  .home-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px;

    .title {
      font-size: 18px;
      color: $font-color;
    }

    .more {
      font-size: 14px;
      color: $font-second-color;
      cursor: pointer;

      &:hover {
        color: $font-color;
      }
    }
  }

  .home-song-items-wrap {
    display: flex;
    flex-flow: row wrap;
    margin: 20px 0 40px;

    .song-items-wrap-left {
      position: relative;
      padding: 8px;
      width: 220px;
      overflow: hidden;
      background-image: linear-gradient(135deg, $primary-color, lighten($primary-color, 30%));

      .img-box {
        display: inline-block;
        width: 110px;
        height: 110px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img-mask {
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
        background-color: rgba(46, 42, 42, 0.8);

        .title {
          color: lighten($primary-color, 30%);
          font-size: 27px;
          position: absolute;
          top: 13px;
          left: 15px;
        }

        .play-all-btn {
          position: absolute;
          right: 15px;
          bottom: 13px;
          background-color: rgba(lighten($primary-color, 10%), 0.9);
          color: $body-bg;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 30px;
        }
      }
    }

    .song-items-wrap-right {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    }

    .song-item {
      position: relative;
      display: inline-block;
      padding: 10px;
      margin: 6px 0;
      width: 47%;
      background-color: $card-color;
      border-radius: 5px;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      overflow: hidden;

      .cover-wrap {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        overflow: hidden;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        color: $font-color;
        padding: 0 3px;
        margin-left: 5px;

        .song-name {
          font-size: 13px;
        }

        .singer-text {
          font-size: 12px;
          color: $font-second-color;
        }
      }

      .options {
        position: absolute;
        top: 0;
        left: 65px;
        right: 0;
        bottom: 0;
        padding-left: 60px;
        color: $font-color;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        background-image: linear-gradient(90deg, $card-color, rgba($font-second-color, 1));
        opacity: 0;
        transition: all 300ms;

        .btn {
          width: 40px;
          height: 40px;
          background: rgba($card-color, 0.4);
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-size: 24px;
          transition: all 500ms;
          cursor: pointer;

          &:hover {
            background-color: $primary-color;
            color: $body-bg;
          }
        }
      }

      &:hover {
        .options {
          opacity: 1;
        }
      }
    }
  }

  .album-items-wrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 20px 0 40px;
  }
}
</style>
