import type { CreateAxiosDefaults } from 'axios'
import type { FileSystemCache } from 'file-system-cache'

export interface Config {
  apiKey: string
  axiosConfig?: CreateAxiosDefaults
  fileSystemCacheOptions?: ConstructorParameters<typeof FileSystemCache>[0]
}

export interface Device {
  name: string
  brand: string
}
