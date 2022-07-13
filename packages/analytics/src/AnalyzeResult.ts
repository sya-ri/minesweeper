type AnalyzeResult = {
  /**
   * Number of tiles on the board
   */
  tiles: number

  /**
   * Number of tiles that couldn't be opened using Solver
   */
  unopenedTiles: number

  /**
   * Number of tiles with no bombs around (tiles whose countAroundBomb equals 0)
   */
  zeroBombTiles: number

  /**
   * Number of tiles that have only bombs around (tiles whose countAroundBomb equals the size of getAroundTiles)
   */
  eightBombTiles: number
}

export default AnalyzeResult
