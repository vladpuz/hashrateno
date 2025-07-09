import type { CreateAxiosDefaults } from 'axios'

export interface Options {
  axiosOptions?: CreateAxiosDefaults
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

export interface Estimate {
  device: Device
  profit: EstimateData
  profit24h: EstimateData
  revenue: EstimateData
  revenue24h: EstimateData
}
