import { playingState } from './playing/types';
import { downloaderState } from './downloader/types';

export interface RootState {
  playing: playingState;
  downloader: downloaderState;
}
