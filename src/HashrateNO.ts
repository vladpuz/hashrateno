import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { FileSystemCache } from 'file-system-cache'

import type { ASICEstimatesRequestParams, ASICEstimatesResponseData } from './endpoints/asicEstimates.js'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './endpoints/benchmarks.js'
import type { Coin, CoinsRequestParams, CoinsResponseData } from './endpoints/coins.js'
import type { CPUEstimatesRequestParams, CPUEstimatesResponseData } from './endpoints/cpuEstimates.js'
import type { FPGAEstimatesRequestParams, FPGAEstimatesResponseData } from './endpoints/fpgaEstimates.js'
import type { GPUEstimatesRequestParams, GPUEstimatesResponseData } from './endpoints/gpuEstimates.js'
import type { Config } from './types.js'

/* eslint @typescript-eslint/no-unsafe-assignment: off -- No generic in file-system-cache get() */

class HashrateNO {
  public axios: AxiosInstance
  public fileSystemCache: FileSystemCache

  public constructor(config: Config) {
    this.fileSystemCache = new FileSystemCache({
      ttl: 24 * 60 * 60,
      ...config.fileSystemCacheOptions,
    })

    this.axios = axios.create({
      ...config.axiosConfig,
      baseURL: 'https://api.hashrate.no/v1',
    })

    this.axios.interceptors.request.use((request) => {
      (request.params as unknown) = {
        ...request.params,
        apiKey: config.apiKey,
      }

      return request
    })
  }

  public async benchmarks(
    params: BenchmarksRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<BenchmarksResponseData> {
    const data: BenchmarksResponseData | undefined = await this.fileSystemCache.get('benchmarks')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<BenchmarksResponseData>('/benchmarks', { ...config, params })
    await this.fileSystemCache.set('benchmarks', response.data)
    return response.data
  }

  public async coins<Params extends CoinsRequestParams | null>(
    params?: Params,
    config?: AxiosRequestConfig,
  ): Promise<Params extends CoinsRequestParams ? Coin : CoinsResponseData> {
    type ResponseData = Params extends CoinsRequestParams
      ? Coin
      : CoinsResponseData

    const data: ResponseData | undefined = await this.fileSystemCache.get('coins')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<ResponseData>('/coins', { ...config, params })
    await this.fileSystemCache.set('coins', response.data)
    return response.data
  }

  public async gpuEstimates(
    params?: GPUEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<GPUEstimatesResponseData> {
    const data: GPUEstimatesResponseData | undefined = await this.fileSystemCache.get('gpuEstimates')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<GPUEstimatesResponseData>('/gpuEstimates', { ...config, params })
    await this.fileSystemCache.set('gpuEstimates', response.data)
    return response.data
  }

  public async asicEstimates(
    params?: ASICEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<ASICEstimatesResponseData> {
    const data: ASICEstimatesResponseData | undefined = await this.fileSystemCache.get('asicEstimates')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<ASICEstimatesResponseData>('/asicEstimates', { ...config, params })
    await this.fileSystemCache.set('asicEstimates', response.data)
    return response.data
  }

  public async cpuEstimates(
    params?: CPUEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<CPUEstimatesResponseData> {
    const data: CPUEstimatesResponseData | undefined = await this.fileSystemCache.get('cpuEstimates')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<CPUEstimatesResponseData>('/cpuEstimates', { ...config, params })
    await this.fileSystemCache.set('cpuEstimates', response.data)
    return response.data
  }

  public async fpgaEstimates(
    params?: FPGAEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<FPGAEstimatesResponseData> {
    const data: FPGAEstimatesResponseData | undefined = await this.fileSystemCache.get('fpgaEstimates')

    if (data != null) {
      return data
    }

    const response = await this.axios.get<FPGAEstimatesResponseData>('/fpgaEstimates', { ...config, params })
    await this.fileSystemCache.set('fpgaEstimates', response.data)
    return response.data
  }
}

export default HashrateNO
