export interface EstimatesRequestParams {
  powerCost?: number
}

export type EstimatesResponseData = Record<string, Estimate>

export interface Estimate {
  device: Device
  profit: EstimateData
  profit24h: EstimateData
  revenue: EstimateData
  revenue24h: EstimateData
}

export interface Device {
  name: string
  brand: string
}

export interface EstimateData {
  ticker: string
  yield: number
  revenue: number
  profit: number
}
