import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import type { ASICEstimatesRequestParams, ASICEstimatesResponseData } from './endpoints/asicEstimates.js'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './endpoints/benchmarks.js'
import type { Coin, CoinsRequestParams, CoinsResponseData } from './endpoints/coins.js'
import type { CPUEstimatesRequestParams, CPUEstimatesResponseData } from './endpoints/cpuEstimates.js'
import type { FPGAEstimatesRequestParams, FPGAEstimatesResponseData } from './endpoints/fpgaEstimates.js'
import type { GPUEstimatesRequestParams, GPUEstimatesResponseData } from './endpoints/gpuEstimates.js'
import type { Config } from './types.js'

class HashrateNO {
  public readonly axios: AxiosInstance

  public constructor(config: Config) {
    const { apiKey, axiosConfig = {} } = config

    this.axios = axios.create({
      ...axiosConfig,
      baseURL: 'https://api.hashrate.no/v1',
    })

    this.axios.interceptors.request.use((request) => {
      (request.params as unknown) = {
        ...request.params,
        apiKey,
      }

      return request
    })
  }

  public async benchmarks(
    params: BenchmarksRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<BenchmarksResponseData> {
    const response = await this.axios.get<BenchmarksResponseData>('/benchmarks', { ...config, params })
    return response.data
  }

  public async coins<Params extends CoinsRequestParams | null>(
    params?: Params,
    config?: AxiosRequestConfig,
  ): Promise<Params extends CoinsRequestParams ? Coin : CoinsResponseData> {
    const response = await this.axios.get<Params extends CoinsRequestParams ? Coin : CoinsResponseData>('/coins', { ...config, params })
    return response.data
  }

  public async gpuEstimates(
    params?: GPUEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<GPUEstimatesResponseData> {
    const response = await this.axios.get<GPUEstimatesResponseData>('/gpuEstimates', { ...config, params })
    return response.data
  }

  public async asicEstimates(
    params?: ASICEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<ASICEstimatesResponseData> {
    const response = await this.axios.get<ASICEstimatesResponseData>('/asicEstimates', { ...config, params })
    return response.data
  }

  public async cpuEstimates(
    params?: CPUEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<CPUEstimatesResponseData> {
    const response = await this.axios.get<CPUEstimatesResponseData>('/cpuEstimates', { ...config, params })
    return response.data
  }

  public async fpgaEstimates(
    params?: FPGAEstimatesRequestParams | null,
    config?: AxiosRequestConfig,
  ): Promise<FPGAEstimatesResponseData> {
    const response = await this.axios.get<FPGAEstimatesResponseData>('/fpgaEstimates', { ...config, params })
    return response.data
  }
}

export default HashrateNO
