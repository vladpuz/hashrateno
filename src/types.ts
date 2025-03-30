import type { CreateAxiosDefaults } from 'axios'
import type { FileSystemCache } from 'file-system-cache'

export interface Config {
  apiKey: string
  axiosOptions?: CreateAxiosDefaults
  cacheOptions?: ConstructorParameters<typeof FileSystemCache>[0]
}

export interface Device {
  name: string
  brand: string
}
