/* RequestParams */

export interface CoinsRequestParams {
  coin: string
}

/* ResponseData */

export interface Coin {
  coin: string
  name: string
  algo: string
  usdPrice: string
  usdPrice1h: string
  usdPrice24h: string
  usdPrice7d: string
  usdPrice30d: string
  coinEstimate: string
  coinEstimateUnit: string
  coinEstimate1h: string
  coinEstimate24h: string
  coinEstimate7d: string
  coinEstimate30d: string
  coinEstimateAvg30d: string
  usdEstimate: string
  usdEstimate1h: string
  usdEstimate24h: string
  usdEstimate7d: string
  usdEstimate30d: string
  networkHashrate: string
  networkDifficulty: string
  emission: string
  emissionUSD: string
}

export type CoinsResponseData = Coin[]
