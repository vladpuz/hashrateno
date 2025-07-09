/* RequestParams */

export interface CoinsRequestParams {
  coin?: string
}

/* ResponseData */

export interface Coin {
  ticker: string
  name: string
  algorithm: string
  price: {
    USD: string
    hour: string
    day: string
    week: string
    month: string
    quarter: string
    halfyear: string
    year: string
    volume: string
  }
  estimate: {
    yield: string
    yieldDay: string
    revenue: string
    revenueDay: string
  }
  network: {
    hashrate: string
    difficulty: string
    emission: number
    emissionUSD: number
  }
}

export type CoinsResponseData = Record<string, Coin>
