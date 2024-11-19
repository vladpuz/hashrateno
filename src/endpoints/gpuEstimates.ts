import type { Device } from '../types.js'

/* RequestParams */

export interface GPUEstimatesRequestParams {
  powerCost: number
}

/* ResponseData */

export interface GPUEstimates {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD: number
  profitUSD: number
  reportedWatts: number
}

export interface GPUEstimates24 {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD24: number
  profitUSD24: number
  reportedWatts: number
}

export interface GPU {
  device: Device
  profit: GPUEstimates
  profit24: GPUEstimates24
  revenue: GPUEstimates
  revenue24: GPUEstimates24
}

export type GPUEstimatesResponseData = Record<string, GPU>
