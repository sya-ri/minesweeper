import Board from '../Board'
import Solver from '../solver/Solver'
import { TilePosition } from '../Tile'

export default class BombSwapper {
  private readonly board: Board

  constructor(board: Board) {
    this.board = board.clone()
  }

  public swap() {
    // TODO
    this.solve()
    console.info(this.unsolvedTiles)
  }

  private get unsolvedTiles(): Map<number, TilePosition[]> | null {
    if (this.board.isSolved) return null
    const tiles = this.board.flatTiles
      .map((tile) => {
        const aroundTiles = this.board.getAroundTiles(tile.x, tile.y)
        const bombCount = this.board.countAroundBomb(tile.x, tile.y)
        const unopenedCount = aroundTiles.filter((at) => !at.isOpen).length
        return { tile, bombCount, unopenedCount }
      })
      .filter(({ tile, bombCount, unopenedCount }) => {
        return !tile.isBomb && tile.isOpen && bombCount !== unopenedCount
      })
      .map(({ tile, bombCount, unopenedCount }) => {
        return { key: unopenedCount - bombCount, value: tile.position }
      })
    return new Map(
      Array.from(
        tiles.reduce((map, { key, value }) => {
          const list = map.get(key)
          if (list) list.push(value)
          else map.set(key, [value])
          return map
        }, new Map())
      )
    )
  }

  private solve() {
    const solver = new Solver(this.board)
    while (solver.solve()) {
      // nope
    }
  }
}
