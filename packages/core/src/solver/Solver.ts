import Board from '../Board'

export default class Solver {
  private board: Board

  constructor(board: Board) {
    this.board = board
  }

  /**
   * Solve the board. Returns true if there are changes in the board.
   */
  public solve() {
    let changed = false
    this.board.flatTiles.forEach((t) => {
      if (t.isOpen) {
        const aroundTiles = this.board.getAroundTiles(t.x, t.y)
        const bombCount = this.board.countAroundBomb(t.x, t.y)
        const unopenedCount = aroundTiles.filter((at) => !at.isOpen).length
        const flagCount = aroundTiles.filter((at) => at.hasFlag).length
        if (bombCount === unopenedCount) {
          // If the number of unopened tiles and bombs equals, flag each tile.
          aroundTiles.forEach((at) => {
            if (!at.hasFlag && !at.isOpen) {
              changed = true
              this.board.toggleFlag(at.x, at.y)
            }
          })
        }
        if (bombCount === flagCount) {
          // If the number of bombs and flags equals, open all other tiles.
          aroundTiles.forEach((at) => {
            if (!at.hasFlag && !at.isOpen) {
              changed = true
              this.board.openTile(at.x, at.y)
            }
          })
        }
      }
    })
    return changed
  }
}
