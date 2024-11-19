import type { Device } from '../types.js'

/* RequestParams */

export interface FPGAEstimatesRequestParams {
  powerCost: number
}

/* ResponseData */

export interface FPGAEstimates {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD: number
  profitUSD: number
}

export interface FPGAEstimates24 {
  ticker: string
  ticker2: string
  logo: string
  logo2: string
  revenueUSD24: number
  profitUSD24: number
}

export interface FPGA {
  device: Device
  profit: FPGAEstimates
  profit24: FPGAEstimates24
  revenue: FPGAEstimates
  revenue24: FPGAEstimates24
}

export type FPGAEstimatesResponseData = Record<string, FPGA>
