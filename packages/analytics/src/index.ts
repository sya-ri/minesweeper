import Board from 'minesweeper-core/dist/Board'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import TilesGenerator from 'minesweeper-core/dist/generator/tile/TilesGenerator'
import RandomWithSimplexNoiseTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomWithSimplexNoiseTilesGenerator'
import Analyzer from './Analyzer'

const analyze = (name: string, loopCount: number, tilesGenerator: () => TilesGenerator) => {
  const analyzer = new Analyzer(() => {
    const board = new Board(tilesGenerator())
    board.openTile(Math.floor(board.width / 2), Math.floor(board.height / 2))
    return board
  })
  const result = analyzer.runAverage(loopCount)
  return {
    name,
    score: Analyzer.getScore(result),
    ...result
  }
}

const run = async () => {
  const loopCount = 100
  const width = 30
  const height = 16
  const numberOfBomb = 99
  const results = [
    analyze('RandomTilesGenerator', loopCount, () => new RandomTilesGenerator(width, height, numberOfBomb, true))
  ]
  ;[0.05, 0.1, 0.5, 1, 5, 10, 15, 20].forEach((step) => {
    ;[5, 10, 50, 100, 150, 200].forEach((numberOfBlanks) => {
      results.push(
        analyze(
          `RandomWithSimplexNoiseTilesGenerator(${step}, ${numberOfBlanks})`,
          loopCount,
          () => new RandomWithSimplexNoiseTilesGenerator(width, height, numberOfBomb, step, numberOfBlanks, true)
        )
      )
    })
  })
  results.sort((a, b) => b.score - a.score)
  results.forEach(({ name, score, tiles, unopenedTiles, zeroBombTiles, eightBombTiles }, index) => {
    console.info(`${index + 1}. ${name}:`)
    console.info(`  Score: ${score.toFixed(5)}`)
    console.info(`  Unopened tiles: ${unopenedTiles} (${((unopenedTiles / tiles) * 100).toFixed(2)}%)`)
    console.info(`  Tiles with no bombs around: ${zeroBombTiles}`)
    console.info(`  Tiles with only bombs around: ${eightBombTiles}`)
  })
}

run().catch((err) => console.error(err))
