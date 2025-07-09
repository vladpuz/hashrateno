import type { Estimate } from '../types.js'

/* RequestParams */

export interface GpuEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export type GpuEstimatesResponseData = Record<string, Estimate>
