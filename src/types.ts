import type { CreateAxiosDefaults } from 'axios'

export interface Config {
  apiKey: string
  axiosConfig?: CreateAxiosDefaults
}

export interface EstimatesRequestParams {
  powerCost: number
}

export interface Device {
  name: string
  brand: string
}
