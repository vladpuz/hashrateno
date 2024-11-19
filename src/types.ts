import type { CreateAxiosDefaults } from 'axios'

export interface Config {
  apiKey: string
  axiosConfig?: CreateAxiosDefaults
}

export interface Device {
  name: string
  brand: string
}
