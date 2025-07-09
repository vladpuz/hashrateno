import type { Estimate } from '../types.js'

/* RequestParams */

export interface CpuEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export type CpuEstimatesResponseData = Record<string, Estimate>
