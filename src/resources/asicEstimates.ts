import type { Estimate } from '../types.js'

/* RequestParams */

export interface AsicEstimatesRequestParams {
  powerCost?: number
}

/* ResponseData */

export type AsicEstimatesResponseData = Record<string, Estimate>
