export interface BenchmarksRequestParams {
  coin: string
}

export type BenchmarksResponseData = Record<string, Benchmark>

export interface Benchmark {
  name: string
  short: string
  deviceType: string
  brandID: string
  hashrate: string
  power: string
  efficiency: number
}
