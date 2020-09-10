/** @format */

export interface playingState {
  platform: string;
  playState: boolean;
  name: string;
  id: string;
  cid: string;
  singerId: string[];
  singer: string;
  albumName?: string;
  albumId?: string;
  picUrl?: string;
  url?: string;
  lyric: Record<string, string>;
}
