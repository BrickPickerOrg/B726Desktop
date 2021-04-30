export interface downloaderState {
  // 下载列表
  downloads: Array<{id: string, name: string, totalBytes: number, progress: number}>;
}
