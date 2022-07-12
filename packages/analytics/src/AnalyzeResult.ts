type AnalyzeResult = {
  /**
   * タイル数
   */
  tiles: number

  /**
   * 開かれなかったタイル数
   */
  unopenedTiles: number

  /**
   * 周囲に爆弾がないタイルの数
   */
  zeroBombTiles: number

  /**
   * 周囲を爆弾に囲まれているタイルの数
   */
  eightBombTiles: number
}

export default AnalyzeResult
