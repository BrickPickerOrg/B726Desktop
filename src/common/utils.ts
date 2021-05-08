export default class Utils {
  // 格式化歌曲时间
  public static formatSeconds(value: number): string {
    const secondsNumber = parseInt(value.toString());
    const h =
      Math.floor(secondsNumber / 3600) < 10
        ? '0' + Math.floor(secondsNumber / 3600)
        : Math.floor(secondsNumber / 3600);
    const m =
      Math.floor((secondsNumber / 60) % 60) < 10
        ? '0' + Math.floor((secondsNumber / 60) % 60)
        : Math.floor((secondsNumber / 60) % 60);
    const s =
      Math.floor(secondsNumber % 60) < 10
        ? '0' + Math.floor(secondsNumber % 60)
        : Math.floor(secondsNumber % 60);
    // const result = `${h}:${m}:${s}`;
    const result = `${m}:${s}`;
    return result;
  }
}
