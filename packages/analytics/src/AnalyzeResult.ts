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
   * Number of tiles with bombs around
   */
  bombTiles: [number, number, number, number, number, number, number, number, number]

  /**
   * Number of largest blanks
   */
  largestBlanks: number
}

export default AnalyzeResult
