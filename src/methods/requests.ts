/** @format */

import { service } from '@/plugins/request';

const useRequests = () => {
  // 搜索咪咕音乐
  const queryMiGuMusicByKeyword = (keyword = '', page = 1, pageSize = 10) => {
    return new Promise((resolve, reject) => {
      service
        .req({
          url: 'http://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do',
          data: {
            '&ua': 'Android_migu',
            text: keyword,
            pageNo: page,
            pageSize: pageSize,
            version: '5.0.1',
            searchSwitch:
              '{song: 1,album: 0,singer: 0,tagSong: 0,mvSong: 0,songlist: 0,bestShow: 1}'
          }
        })
        .then((res: any) => {
          const { result, totalCount } = res.songResultData;
          const formatResult = result.map((item: any) => {
            return {
              platform: 'migu',
              name: item['name'],
              id: item['id'],
              lyricId: item['copyrightId'],
              url: `http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&copyrightId=0&contentId=${item.contentId}&resourceType=2&channel=0`,
              albumId: item['albums'] ? item['albums'][0]['id'] : '',
              albumName: item['albums'] ? item['albums'][0]['name'] : '',
              picUrl: item['imgItems'][0]['img'],
              singers: item['singers'],
              lyricUrl: item['lyricUrl']
            };
          });
          resolve({
            data: formatResult,
            totalCount
          });
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const getLyric = async (cid: string) => {
    let result = { data: {} };
    try {
      result = await service.req({
        url: '/lyric',
        data: {
          cid: cid
        }
      });
    } catch (error) {}

    return result.data;
  };

  return {
    queryMiGuMusicByKeyword,
    getLyric
  };
};

export default useRequests;
