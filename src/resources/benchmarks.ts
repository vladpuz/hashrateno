/* RequestParams */

export interface BenchmarksRequestParams {
  coin: string
}

/* ResponseData */

export interface Benchmark {
  name: string
  short: string
  deviceType: string
  brandID: string
  hashrate: string
  power: string
  efficiency: number
}

export type BenchmarksResponseData = Record<string, Benchmark>
