# hashrateno

> Hashrate.no API client

Features:

- Based on native fetch
- Convenient error handling
- Full type safety

Official documentation: [hashrate.no/c/api](https://hashrate.no/c/api)

## Installation

```shell
npm install hashrateno
```

## Usage

### Creating an instance

```typescript
import Hashrateno from 'hashrateno'

const hashrateno = new Hashrateno('API_KEY', {
  baseURL: 'https://hashrate.no/api/v2', // (optional) Override the default base URL for the API
  fetchOptions: {}, // (optional) Additional `RequestInit` options to be passed to `fetch` calls
  fetch: globalThis.fetch, // (optional) Specify a custom `fetch` function implementation
})
```

### Benchmarks

```typescript
const benchmarks = await hashrateno.benchmarks({ coin: 'RVN' })
```

### Coins

```typescript
const coins = await hashrateno.coins() // All coins
const coin = await hashrateno.coins({ coin: 'RVN' }) // One coin
```

### Estimates

```typescript
const powerCost = 0.1 // (optional) Power cost in USD

const asicEstimates = await hashrateno.asicEstimates({ powerCost })
const cpuEstimates = await hashrateno.cpuEstimates({ powerCost })
const depinEstimates = await hashrateno.depinEstimates({ powerCost })
const fpgaEstimates = await hashrateno.fpgaEstimates({ powerCost })
const gpuEstimates = await hashrateno.gpuEstimates({ powerCost })
```

## Fetch Options

All methods accept fetch options as the last parameter, for example:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    // `RequestInit` options
  },
)
```

## Error Handling

Use the `HashratenoError` class for error handling.

Errors have fields with information `error.title` and `error.detail`.

```typescript
import { HashratenoError } from 'hashrateno'

try {
  const benchmarks = await hashrateno.benchmarks({ coin: 'RVN' })
} catch (error) {
  if (error instanceof HashratenoError) {
    console.log(error.title, error.detail)
  } else {
    throw error
  }
}
```

## Retries

For retrying, it's recommended to use
[p-retry](https://github.com/sindresorhus/p-retry):

```typescript
import pRetry from 'p-retry'

const benchmarks = await pRetry(
  async () => {
    return await hashrateno.benchmarks({ coin: 'RVN' })
  },
  {
    retries: 5,
  },
)
```

## Timeouts

Use `AbortSignal.timeout`:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    signal: AbortSignal.timeout(5000),
  },
)
```

Combine signals using `AbortSignal.any`. In the following example, the request
will be aborted after 5 seconds, but can also be aborted earlier by calling
`controller.abort()`:

```typescript
const controller = new AbortController()

// You can abort by event
// controller.abort()

const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    signal: AbortSignal.any([AbortSignal.timeout(5000), controller.signal]),
  },
)
```

## API Call Limits

The free plan of Hashrate.no provides only 100 API calls per month. To bypass
this, you can cache data in memory, file system or upgrade to a paid plan.

A good library for caching data in the file system:
[file-system-cache](https://github.com/philcockfield/file-system-cache).

The advantage of caching data in the file system is that the data will not be
lost after restarting your application.
