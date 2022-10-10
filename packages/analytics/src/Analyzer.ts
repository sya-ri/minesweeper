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
    const bombCountTiles = board.flatTiles.map(({ x, y }) => board.countAroundBomb(x, y))
    return {
      tiles: board.flatTiles.length,
      unopenedTiles: Analyzer.solve(board),
      bombTiles: [
        bombCountTiles.filter((b) => b === 0).length,
        bombCountTiles.filter((b) => b === 1).length,
        bombCountTiles.filter((b) => b === 2).length,
        bombCountTiles.filter((b) => b === 3).length,
        bombCountTiles.filter((b) => b === 4).length,
        bombCountTiles.filter((b) => b === 5).length,
        bombCountTiles.filter((b) => b === 6).length,
        bombCountTiles.filter((b) => b === 7).length,
        bombCountTiles.filter((b) => b === 8).length
      ],
      largestBlanks: Analyzer.largestBlanks(board)
    }
  }

  private static largestBlanks(board: Board): number {
    const blankTiles = board.flatTiles
      .filter((t) => !t.isBomb)
      .filter(({ x, y }) => board.countAroundBomb(x, y) === 0)
      .map((t) => t.position)
    const blanksList = Object.fromEntries(blankTiles.map((t) => t.y * board.width + t.x).map((id) => [id, [id]]))
    blankTiles.forEach((t) => {
      // Scan adjacent blanks
      // ---
      // -xo
      // ooo
      const id = t.y * board.width + t.x
      const blanks = blanksList[id]
      if (blanks) {
        ;[
          [1, 0],
          [-1, 1],
          [0, 1],
          [1, 1]
        ].forEach(([padX, padY]) => {
          const adjacentId = (t.y + padY) * board.width + t.x + padX
          const adjacentBlanks = blanksList[adjacentId]
          if (adjacentBlanks && !blanks.includes(adjacentId) && !adjacentBlanks.includes(id)) {
            const mergeBlanks = [...new Set([...blanks, ...adjacentBlanks])]
            blanksList[id] = mergeBlanks
            blanksList[adjacentId] = mergeBlanks
          }
        })
      }
    })
    return Math.max(...Object.values(blanksList).map((list) => list.length))
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
          bombTiles: [
            previousValue.bombTiles[0] + currentValue.bombTiles[0],
            previousValue.bombTiles[1] + currentValue.bombTiles[1],
            previousValue.bombTiles[2] + currentValue.bombTiles[2],
            previousValue.bombTiles[3] + currentValue.bombTiles[3],
            previousValue.bombTiles[4] + currentValue.bombTiles[4],
            previousValue.bombTiles[5] + currentValue.bombTiles[5],
            previousValue.bombTiles[6] + currentValue.bombTiles[6],
            previousValue.bombTiles[7] + currentValue.bombTiles[7],
            previousValue.bombTiles[8] + currentValue.bombTiles[8]
          ],
          largestBlanks: previousValue.largestBlanks + currentValue.largestBlanks
        }
      })
    return {
      tiles: sumResult.tiles,
      unopenedTiles: sumResult.unopenedTiles / loopCount,
      bombTiles: [
        sumResult.bombTiles[0] / loopCount,
        sumResult.bombTiles[1] / loopCount,
        sumResult.bombTiles[2] / loopCount,
        sumResult.bombTiles[3] / loopCount,
        sumResult.bombTiles[4] / loopCount,
        sumResult.bombTiles[5] / loopCount,
        sumResult.bombTiles[6] / loopCount,
        sumResult.bombTiles[7] / loopCount,
        sumResult.bombTiles[8] / loopCount
      ],
      largestBlanks: sumResult.largestBlanks / loopCount
    }
  }
}
