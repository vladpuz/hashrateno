import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import type { ASICEstimatesResponseData } from './endpoints/asicEstimates.js'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './endpoints/benchmarks.js'
import type { Coin, CoinsRequestParams, CoinsResponseData } from './endpoints/coins.js'
import type { CPUEstimatesResponseData } from './endpoints/cpuEstimates.js'
import type { FPGAEstimatesResponseData } from './endpoints/fpgaEstimates.js'
import type { GPUEstimatesResponseData } from './endpoints/gpuEstimates.js'
import type { Config, EstimatesRequestParams } from './types.js'

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
    const response = await this.axios.request<BenchmarksResponseData>({
      ...config,
      method: 'get',
      url: '/benchmarks',
      params,
    })

    return response.data
  }

  public async coins<Params extends CoinsRequestParams | undefined>(
    params?: Params,
    config?: AxiosRequestConfig,
  ): Promise<Params extends CoinsRequestParams ? Coin : CoinsResponseData> {
    const response = await this.axios.request<
      Params extends CoinsRequestParams ? Coin : CoinsResponseData
    >({
      ...config,
      method: 'get',
      url: '/coins',
      params,
    })

    return response.data
  }

  public async gpuEstimates(
    params?: EstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<GPUEstimatesResponseData> {
    const response = await this.axios.request<GPUEstimatesResponseData>({
      ...config,
      method: 'get',
      url: '/gpuEstimates',
      params,
    })

    return response.data
  }

  public async asicEstimates(
    params?: EstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<ASICEstimatesResponseData> {
    const response = await this.axios.request<ASICEstimatesResponseData>({
      ...config,
      method: 'get',
      url: '/asicEstimates',
      params,
    })

    return response.data
  }

  public async cpuEstimates(
    params?: EstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<CPUEstimatesResponseData> {
    const response = await this.axios.request<CPUEstimatesResponseData>({
      ...config,
      method: 'get',
      url: '/cpuEstimates',
      params,
    })

    return response.data
  }

  public async fpgaEstimates(
    params?: EstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<FPGAEstimatesResponseData> {
    const response = await this.axios.request<FPGAEstimatesResponseData>({
      ...config,
      method: 'get',
      url: '/fpgaEstimates',
      params,
    })

    return response.data
  }
}

export default HashrateNO
