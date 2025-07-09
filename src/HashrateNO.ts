import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

import type { AsicEstimatesRequestParams, AsicEstimatesResponseData } from './resources/asicEstimates.js'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './resources/benchmarks.js'
import type { CoinsRequestParams, CoinsResponseData } from './resources/coins.js'
import type { CpuEstimatesRequestParams, CpuEstimatesResponseData } from './resources/cpuEstimates.js'
import type { DepinEstimatesRequestParams, DepinEstimatesResponseData } from './resources/depinEstimates.js'
import type { FpgaEstimatesRequestParams, FpgaEstimatesResponseData } from './resources/fpgaEstimates.js'
import type { GpuEstimatesRequestParams, GpuEstimatesResponseData } from './resources/gpuEstimates.js'
import type { Options } from './types.js'

class HashrateNO {
  public axios: AxiosInstance

  public constructor(apiKey: string, options: Options = {}) {
    this.axios = axios.create({
      ...options.axiosOptions,
      baseURL: 'https://hashrate.no/api/v2',
    })

    this.axios.interceptors.request.use((request) => {
      (request.params as unknown) = {
        ...request.params,
        apiKey,
      }

      return request
    })

    this.axios.interceptors.response.use((response: AxiosResponse<unknown>) => {
      if (response.data instanceof Object) {
        const title = 'title' in response.data ? response.data.title : null
        const detail = 'detail' in response.data ? response.data.detail : null

        const isError = typeof title === 'string' && typeof detail === 'string'

        if (!isError) {
          return response
        }

        const errorMessage = `Title "${title}", detail "${detail}"`

        throw new AxiosError(
          errorMessage,
          undefined,
          response.config,
          response.request,
          response,
        )
      }

      return response
    })
  }

  public async benchmarks(
    params: BenchmarksRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<BenchmarksResponseData> {
    const response = await this.axios.get<BenchmarksResponseData>(
      '/benchmarks',
      { ...config, params },
    )

    return response.data
  }

  public async coins(
    params?: CoinsRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<CoinsResponseData> {
    const response = await this.axios.get<CoinsResponseData>(
      '/coins',
      { ...config, params },
    )

    return response.data
  }

  public async asicEstimates(
    params?: AsicEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AsicEstimatesResponseData> {
    const response = await this.axios.get<AsicEstimatesResponseData>(
      '/asicEstimates',
      { ...config, params },
    )

    return response.data
  }

  public async cpuEstimates(
    params?: CpuEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<CpuEstimatesResponseData> {
    const response = await this.axios.get<CpuEstimatesResponseData>(
      '/cpuEstimates',
      { ...config, params },
    )

    return response.data
  }

  public async depinEstimates(
    params?: DepinEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<DepinEstimatesResponseData> {
    const response = await this.axios.get<DepinEstimatesResponseData>(
      '/depinEstimates',
      { ...config, params },
    )

    return response.data
  }

  public async fpgaEstimates(
    params?: FpgaEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<FpgaEstimatesResponseData> {
    const response = await this.axios.get<FpgaEstimatesResponseData>(
      '/fpgaEstimates',
      { ...config, params },
    )

    return response.data
  }

  public async gpuEstimates(
    params?: GpuEstimatesRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<GpuEstimatesResponseData> {
    const response = await this.axios.get<GpuEstimatesResponseData>(
      '/gpuEstimates',
      { ...config, params },
    )

    return response.data
  }
}

export default HashrateNO
