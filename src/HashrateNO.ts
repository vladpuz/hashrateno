import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { FileSystemCache } from 'file-system-cache'

import type { ASICEstimatesRequestParams, ASICEstimatesResponseData } from './endpoints/asicEstimates.js'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './endpoints/benchmarks.js'
import type { Coin, CoinsRequestParams, CoinsResponseData } from './endpoints/coins.js'
import type { CPUEstimatesRequestParams, CPUEstimatesResponseData } from './endpoints/cpuEstimates.js'
import type { FPGAEstimatesRequestParams, FPGAEstimatesResponseData } from './endpoints/fpgaEstimates.js'
import type { GPUEstimatesRequestParams, GPUEstimatesResponseData } from './endpoints/gpuEstimates.js'
import type { Config } from './types.js'

/* eslint @typescript-eslint/no-unsafe-assignment: off */

class HashrateNO {
  public axios: AxiosInstance
  public cache: FileSystemCache

  public constructor(config: Config) {
    this.cache = new FileSystemCache({
      ttl: 24 * 60 * 60,
      ...config.cacheOptions,
    })

    this.axios = axios.create({
      ...config.axiosOptions,
      baseURL: 'https://api.hashrate.no/v1',
    })

    this.axios.interceptors.request.use((request) => {
      request.params = {
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
    const key = JSON.stringify({ name: this.benchmarks.name, params })
    const data: BenchmarksResponseData | undefined = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<BenchmarksResponseData>('/benchmarks', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }

  public async coins<
    Params extends (
        Required<CoinsRequestParams> | CoinsRequestParams
    ) = CoinsRequestParams,
  >(
    params?: Params,
    config?: AxiosRequestConfig,
  ): Promise<
      Params extends Required<CoinsRequestParams> ? Coin : CoinsResponseData
    > {
    type Data = Params extends Required<CoinsRequestParams>
      ? Coin
      : CoinsResponseData

    const key = JSON.stringify({ name: this.coins.name, params })
    const data: Data | undefined = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<Data>('/coins', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }

  public async gpuEstimates(
    params?: GPUEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<GPUEstimatesResponseData> {
    const key = JSON.stringify({ name: this.gpuEstimates.name, params })
    const data: (GPUEstimatesResponseData | undefined)
        = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<GPUEstimatesResponseData>('/gpuEstimates', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }

  public async asicEstimates(
    params?: ASICEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<ASICEstimatesResponseData> {
    const key = JSON.stringify({ name: this.asicEstimates.name, params })
    const data: (ASICEstimatesResponseData | undefined)
        = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<ASICEstimatesResponseData>('/asicEstimates', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }

  public async cpuEstimates(
    params?: CPUEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<CPUEstimatesResponseData> {
    const key = JSON.stringify({ name: this.cpuEstimates.name, params })
    const data: (CPUEstimatesResponseData | undefined)
        = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<CPUEstimatesResponseData>('/cpuEstimates', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }

  public async fpgaEstimates(
    params?: FPGAEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<FPGAEstimatesResponseData> {
    const key = JSON.stringify({ name: this.fpgaEstimates.name, params })
    const data: (FPGAEstimatesResponseData | undefined)
        = await this.cache.get(key)

    if (data !== undefined) {
      return data
    }

    const response = await this.axios.get<FPGAEstimatesResponseData>('/fpgaEstimates', { ...config, params })
    await this.cache.set(key, response.data)
    return response.data
  }
}

export default HashrateNO
