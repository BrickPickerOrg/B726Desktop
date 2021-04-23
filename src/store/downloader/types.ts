export interface downloaderState {
  downloads: Array<{id: string, name: string, totalBytes: number, progress: number}>;
  downloadUrl?: string;
}
