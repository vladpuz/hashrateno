import type { Estimate } from '../types.js'

/* RequestParams */

export interface DepinEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export type DepinEstimatesResponseData = Record<string, Estimate>
