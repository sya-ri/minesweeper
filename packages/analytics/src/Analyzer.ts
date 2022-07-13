import Board from 'minesweeper-core/dist/Board'
import Solver from 'minesweeper-core/dist/solver/Solver'
import AnalyzeResult from './AnalyzeResult'

export default class Analyzer {
  private readonly generateBoard: () => Board

  constructor(generateBoard: () => Board) {
    this.generateBoard = generateBoard
  }

  /**
   * Generate a new board and analyze the results
   */
  public run(): AnalyzeResult {
    const board = this.generateBoard()
    return {
      tiles: board.flatTiles.length,
      unopenedTiles: Analyzer.solve(board),
      zeroBombTiles: board.flatTiles.filter(({ x, y }) => board.countAroundBomb(x, y) === 0).length,
      eightBombTiles: board.flatTiles.filter(({ x, y }) => board.getAroundTiles(x, y).every((t) => t.isBomb)).length
    }
  }

  /**
   * Solve until no longer solve
   *
   * @see AnalyzeResult#unopenedTiles
   */
  private static solve(board: Board): number {
    const solver = new Solver(board)
    while (solver.solve()) {
      // nope
    }
    return board.flatTiles.filter((tile) => !tile.isOpen && !tile.isBomb).length
  }

  /**
   * Iteratively analyze and returns the average result
   *
   * @see Analyzer#run
   */
  public runAverage(loopCount: number): AnalyzeResult {
    const sumResult = Array.from({ length: loopCount })
      .map(() => this.run())
      .reduce((previousValue, currentValue) => {
        // Calculate the sum to calculate the average.
        // However, don't need to calculate the average as all the AnalyzeResult#tiles are the same.
        return {
          tiles: currentValue.tiles,
          unopenedTiles: previousValue.unopenedTiles + currentValue.unopenedTiles,
          zeroBombTiles: previousValue.zeroBombTiles + currentValue.zeroBombTiles,
          eightBombTiles: previousValue.eightBombTiles + currentValue.eightBombTiles
        }
      })
    return {
      tiles: sumResult.tiles,
      unopenedTiles: sumResult.unopenedTiles / loopCount,
      zeroBombTiles: sumResult.zeroBombTiles / loopCount,
      eightBombTiles: sumResult.eightBombTiles / loopCount
    }
  }
}
