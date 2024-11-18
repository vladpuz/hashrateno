/* RequestParams */

export interface BenchmarksRequestParams {
  coin: string
}

/* ResponseData */

export interface Benchmark {
  name: string
  short: string
  hashrate: number
  power: number
  efficiency: number
}

export type BenchmarksResponseData = Benchmark[]
