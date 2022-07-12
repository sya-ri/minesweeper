import Board from 'minesweeper-core/dist/Board'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import TilesGenerator from 'minesweeper-core/dist/generator/tile/TilesGenerator'
import RandomWithSimplexNoiseTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomWithSimplexNoiseTilesGenerator'
import * as fs from 'fs'
import * as path from 'path'
import Analyzer from './Analyzer'
import AnalyzeResult from './AnalyzeResult'

const analyze = (
  name: string,
  loopCount: number,
  tilesGenerator: () => TilesGenerator,
  handleResult: (name: string, result: AnalyzeResult) => void
) => {
  const analyzer = new Analyzer(() => {
    const board = new Board(tilesGenerator())
    board.openTile(Math.floor(board.width / 2), Math.floor(board.height / 2))
    return board
  })
  handleResult(name, analyzer.runAverage(loopCount))
}

const run = async () => {
  const loopCount = 100
  const width = 30
  const height = 16
  const numberOfBomb = 99
  const resultFilePath = path.join('dist', 'result.csv')
  fs.writeFileSync(resultFilePath, `${['name', 'unopenedTiles', 'zeroBombTiles', 'eightBombTiles'].join()}\n`)
  const handleResult = (name: string, result: AnalyzeResult) => {
    const output = [
      name,
      result.unopenedTiles / result.tiles,
      result.zeroBombTiles / result.tiles,
      result.eightBombTiles / result.tiles
    ].join()
    fs.appendFileSync(resultFilePath, `${output}\n`)
  }
  analyze(
    'RandomTilesGenerator',
    loopCount,
    () => new RandomTilesGenerator(width, height, numberOfBomb, true),
    handleResult
  )
  ;[0.01, 0.05, 0.1, 0.5, 1, 5, 10, 15, 20, 25].forEach((step) => {
    ;[5, 10, 25, 50, 100, 150, 200].forEach((numberOfBlanks) => {
      analyze(
        `RandomWithSimplexNoiseTilesGenerator(${step}:${numberOfBlanks})`,
        loopCount,
        () => new RandomWithSimplexNoiseTilesGenerator(width, height, numberOfBomb, step, numberOfBlanks, true),
        handleResult
      )
    })
  })
}

run().catch((err) => console.error(err))
