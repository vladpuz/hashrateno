import type { Estimate } from '../types.js'

/* RequestParams */

export interface FpgaEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export type FpgaEstimatesResponseData = Record<string, Estimate>
