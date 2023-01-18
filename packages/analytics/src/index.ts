import Board from 'minesweeper-core/dist/Board'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import TilesGenerator from 'minesweeper-core/dist/generator/tile/TilesGenerator'
import RandomWithSimplexNoiseTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomWithSimplexNoiseTilesGenerator'
import * as fs from 'fs'
import * as path from 'path'
import Analyzer from './Analyzer'
import AnalyzeResult from './AnalyzeResult'

const analyze = (
  step: number,
  candidate: number,
  loopCount: number,
  tilesGenerator: () => TilesGenerator,
  handleResult: (step: number, candidate: number, result: AnalyzeResult) => void
) => {
  const analyzer = new Analyzer(() => {
    const board = new Board(tilesGenerator())
    // Open the center tile to be able to run Solver.
    board.openTile(Math.floor(board.width / 2), Math.floor(board.height / 2))
    return board
  })
  handleResult(step, candidate, analyzer.runAverage(loopCount))
}

const run = async () => {
  const loopCount = 100
  const width = 30
  const height = 16
  const numberOfBomb = 99
  const resultFilePath = path.join('dist', 'result.csv')
  fs.writeFileSync(
    resultFilePath,
    `${[
      'step',
      'candidate',
      'unopenedTiles',
      'bombTiles[0]',
      'bombTiles[1]',
      'bombTiles[2]',
      'bombTiles[3]',
      'bombTiles[4]',
      'bombTiles[5]',
      'bombTiles[6]',
      'bombTiles[7]',
      'bombTiles[8]',
      'largestBlanks'
    ].join()}\n`
  )
  const handleResult = (step: number, candidate: number, result: AnalyzeResult) => {
    const output = [
      step,
      candidate,
      result.unopenedTiles / result.tiles,
      result.bombTiles[0] / result.tiles,
      result.bombTiles[1] / result.tiles,
      result.bombTiles[2] / result.tiles,
      result.bombTiles[3] / result.tiles,
      result.bombTiles[4] / result.tiles,
      result.bombTiles[5] / result.tiles,
      result.bombTiles[6] / result.tiles,
      result.bombTiles[7] / result.tiles,
      result.bombTiles[8] / result.tiles,
      result.largestBlanks / result.tiles
    ].join()
    fs.appendFileSync(resultFilePath, `${output}\n`)
  }
  analyze(0, 0, loopCount, () => new RandomTilesGenerator(width, height, numberOfBomb, true), handleResult)
  ;[0.001, 0.05, 0.01, 0.05, 0.1, 0.5, 1].forEach((step) => {
    ;[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach((candidate) => {
      analyze(
        step,
        candidate,
        loopCount,
        () => new RandomWithSimplexNoiseTilesGenerator(width, height, numberOfBomb, step, candidate, true),
        handleResult
      )
    })
  })
}

run().catch((err) => console.error(err))
