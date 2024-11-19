import type { Device } from '../types.js'

/* RequestParams */

export interface ASICEstimatesRequestParams {
  powerCost: number
}

/* ResponseData */

export interface ASICEstimates {
  coin: string
  logo: string
  revenueUSD: number
  profitUSD: number
}

export interface ASICEstimates24 {
  coin: string
  logo: string
  revenueUSD24: number
  profitUSD24: number
}

export interface ASIC {
  device: Device
  profit: ASICEstimates
  profit24: ASICEstimates24
  revenue: ASICEstimates
  revenue24: ASICEstimates24
}

export type ASICEstimatesResponseData = Record<string, ASIC>
