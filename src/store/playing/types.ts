export interface playingState {
  platform: string;
  playState: boolean;
  name: string;
  id: string;
  cid: string;
  singer: Array<{id:string, name:string}>;
  albumName?: string;
  albumId?: string;
  cover?: string;
  url?: string;
  lyric: Record<string, string>;
}
