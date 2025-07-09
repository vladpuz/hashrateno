# hashrateno

> Hashrate.no API client

Features:

- Based on [axios](https://github.com/axios/axios)
- Error handling through try...catch and instanceof

Official documentation: [hashrate.no/c/api](https://hashrate.no/c/api)

## Installation

```shell
npm install hashrateno
```

## Usage

### Creating an instance

```typescript
import HashrateNO from 'hashrateno'

const hashrateno = new HashrateNO('<API_KEY>', {
  axiosOptions: {}, // (optional) Axios instance options https://github.com/axios/axios
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

### Request Configuration

All methods accept an optional request configuration for axios as the last
parameter, for example:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    // axios config
  },
)
```

### Accessing axios instance

Use the field `hashrateno.axios`.

Refer to the documentation [axios](https://github.com/axios/axios).

## API Call Limits

The free plan of Hashrate.no provides only 100 API calls per month. To bypass
this, you can cache data in memory, file system, or switch to a paid plan.

A good library for caching data in the file system:
[file-system-cache](https://github.com/philcockfield/file-system-cache).

The advantage of caching data in the file system is that the data will not be
lost after restarting your application.
