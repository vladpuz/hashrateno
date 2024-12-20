import type { Device } from '../types.js'

/* RequestParams */

export interface CPUEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export interface CPUEstimates {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD: number
  profitUSD: number
}

export interface CPUEstimates24 {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD24: number
  profitUSD24: number
}

export interface CPU {
  device: Device
  profit: CPUEstimates
  profit24: CPUEstimates24
  revenue: CPUEstimates
  revenue24: CPUEstimates24
}

export type CPUEstimatesResponseData = Record<string, CPU>
