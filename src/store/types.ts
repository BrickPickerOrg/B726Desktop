import { playingState } from './playing/types';
import { lyricState } from './lyric/types';
import { downloaderState } from './downloader/types';

export interface RootState {
  playing: playingState;
  lyric: lyricState;
  downloader: downloaderState;
}
