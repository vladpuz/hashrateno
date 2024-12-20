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
    type Data = BenchmarksResponseData | undefined
    const key = JSON.stringify({ name: this.benchmarks.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<BenchmarksResponseData>('/benchmarks', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }

  public async coins<
    Params extends Required<CoinsRequestParams> | CoinsRequestParams,
  >(
    params: Params,
    config?: AxiosRequestConfig,
  ): Promise<
      Params extends Required<CoinsRequestParams> ? Coin : CoinsResponseData
    > {
    type ResponseData = Params extends Required<CoinsRequestParams>
      ? Coin
      : CoinsResponseData

    type Data = ResponseData | undefined
    const key = JSON.stringify({ name: this.coins.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<ResponseData>('/coins', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }

  public async gpuEstimates(
    params: GPUEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<GPUEstimatesResponseData> {
    type Data = GPUEstimatesResponseData | undefined
    const key = JSON.stringify({ name: this.gpuEstimates.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<GPUEstimatesResponseData>('/gpuEstimates', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }

  public async asicEstimates(
    params: ASICEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<ASICEstimatesResponseData> {
    type Data = ASICEstimatesResponseData | undefined
    const key = JSON.stringify({ name: this.asicEstimates.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<ASICEstimatesResponseData>('/asicEstimates', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }

  public async cpuEstimates(
    params: CPUEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<CPUEstimatesResponseData> {
    type Data = CPUEstimatesResponseData | undefined
    const key = JSON.stringify({ name: this.cpuEstimates.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<CPUEstimatesResponseData>('/cpuEstimates', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }

  public async fpgaEstimates(
    params: FPGAEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<FPGAEstimatesResponseData> {
    type Data = FPGAEstimatesResponseData | undefined
    const key = JSON.stringify({ name: this.fpgaEstimates.name, params })
    const data: Data = await this.fileSystemCache.get(key)

    if (data != null) {
      return data
    }

    const response = await this.axios.get<FPGAEstimatesResponseData>('/fpgaEstimates', { ...config, params })
    await this.fileSystemCache.set(key, response.data)
    return response.data
  }
}

export default HashrateNO
