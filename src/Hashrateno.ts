import type { AsicEstimatesRequestParams, AsicEstimatesResponseData } from './resources/asicEstimates.ts'
import type { BenchmarksRequestParams, BenchmarksResponseData } from './resources/benchmarks.ts'
import type { CoinsRequestParams, CoinsResponseData } from './resources/coins.ts'
import type { CpuEstimatesRequestParams, CpuEstimatesResponseData } from './resources/cpuEstimates.ts'
import type { DepinEstimatesRequestParams, DepinEstimatesResponseData } from './resources/depinEstimates.ts'
import type { FpgaEstimatesRequestParams, FpgaEstimatesResponseData } from './resources/fpgaEstimates.ts'
import type { GpuEstimatesRequestParams, GpuEstimatesResponseData } from './resources/gpuEstimates.ts'

import { HashratenoError } from './HashratenoError.ts'

/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */

export interface Options {
  baseURL?: string
  fetch?: typeof fetch
  fetchOptions?: RequestInit
}

class Hashrateno {
  #baseURL: string
  #fetch: typeof fetch

  constructor(apiKey: string, options: Options = {}) {
    this.#baseURL = options.baseURL ?? 'https://hashrate.no/api/v2'

    const fetchFunction = options.fetch ?? fetch
    const fetchOptions = options.fetchOptions ?? {}

    this.#fetch = async (input, init = {}) => {
      if (input instanceof Request) {
        throw new TypeError('Input must be a string or URL')
      }

      const headers = new Headers({
        'Content-Type': 'application/json',
      })

      for (const [key, value] of new Headers(fetchOptions.headers)) {
        headers.set(key, value)
      }

      for (const [key, value] of new Headers(init.headers)) {
        headers.set(key, value)
      }

      const signal = AbortSignal.any([
        ...(fetchOptions.signal ? [fetchOptions.signal] : []),
        ...(init.signal ? [init.signal] : []),
      ])

      const mergedInit: RequestInit = {
        ...fetchOptions,
        ...init,
        headers,
        signal,
      }

      const url = new URL(input)
      url.searchParams.set('apiKey', apiKey)

      const request = new Request(url, mergedInit)
      let response: Response

      try {
        response = await fetchFunction(request)
      } catch (error) {
        throw new HashratenoError(
          error instanceof Error ? error.message : String(error),
          {
            cause: error,
            init: mergedInit,
            request,
          },
        )
      }

      const originalJson = response.json

      // @ts-expect-error: json is readonly
      response.json = async () => {
        let data: unknown

        try {
          data = await originalJson.call(response)
        } catch (error) {
          throw new HashratenoError(
            error instanceof Error ? error.message : String(error),
            {
              cause: error,
              init: mergedInit,
              request,
              response,
            },
          )
        }

        if (typeof data !== 'object' || data === null) {
          return data
        }

        const title = 'title' in data ? data.title : null
        const detail = 'detail' in data ? data.detail : null

        const isError = typeof title === 'string' && typeof detail === 'string'

        if (!isError) {
          return data
        }

        const errorMessage = `Title "${title}", detail "${detail}"`

        throw new HashratenoError(errorMessage, {
          init: mergedInit,
          request,
          response,
          title,
          detail,
          data,
        })
      }

      return response
    }
  }

  async benchmarks(
    params: BenchmarksRequestParams,
    init: RequestInit = {},
  ): Promise<BenchmarksResponseData> {
    const url = new URL(this.#baseURL + '/benchmarks')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as BenchmarksResponseData
  }

  async coins(
    params: CoinsRequestParams = {},
    init: RequestInit = {},
  ): Promise<CoinsResponseData> {
    const url = new URL(this.#baseURL + '/coins')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as CoinsResponseData
  }

  async asicEstimates(
    params: AsicEstimatesRequestParams = {},
    init: RequestInit = {},
  ): Promise<AsicEstimatesResponseData> {
    const url = new URL(this.#baseURL + '/asicEstimates')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as AsicEstimatesResponseData
  }

  async cpuEstimates(
    params: CpuEstimatesRequestParams = {},
    init: RequestInit = {},
  ): Promise<CpuEstimatesResponseData> {
    const url = new URL(this.#baseURL + '/cpuEstimates')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as CpuEstimatesResponseData
  }

  async depinEstimates(
    params: DepinEstimatesRequestParams = {},
    init: RequestInit = {},
  ): Promise<DepinEstimatesResponseData> {
    const url = new URL(this.#baseURL + '/depinEstimates')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as DepinEstimatesResponseData
  }

  async fpgaEstimates(
    params: FpgaEstimatesRequestParams = {},
    init: RequestInit = {},
  ): Promise<FpgaEstimatesResponseData> {
    const url = new URL(this.#baseURL + '/fpgaEstimates')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as FpgaEstimatesResponseData
  }

  async gpuEstimates(
    params: GpuEstimatesRequestParams = {},
    init: RequestInit = {},
  ): Promise<GpuEstimatesResponseData> {
    const url = new URL(this.#baseURL + '/gpuEstimates')

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await this.#fetch(url, {
      ...init,
      method: 'GET',
    })

    return await response.json() as GpuEstimatesResponseData
  }
}

export default Hashrateno
