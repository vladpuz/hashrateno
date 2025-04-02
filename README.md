# hashrateno

> Hashrate.no API client

Особенности:

- Базируется на [axios](https://github.com/axios/axios)
- Кеширует данные в файловую систему через
  [file-system-cache](https://github.com/philcockfield/file-system-cache), чтобы
  не выходить за лимиты вызовов API

Официальная документация: [api.hashrate.no](https://api.hashrate.no)

## Установка

```shell
npm install hashrateno
```

## Использование

### Создание экземпляра

```typescript
import HashrateNO from 'hashrateno'

const hashrateno = new HashrateNO({
  apiKey: '<API_KEY>', // (required)
  axiosOptions: {}, // (optional) Axios instance options https://github.com/axios/axios
  cacheOptions: {}, // (optional) Cache instance options https://github.com/philcockfield/file-system-cache
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

const gpuEstimates = await hashrateno.gpuEstimates({ powerCost })
const asicEstimates = await hashrateno.asicEstimates({ powerCost })
const cpuEstimates = await hashrateno.cpuEstimates({ powerCost })
const fpgaEstimates = await hashrateno.fpgaEstimates({ powerCost })
```

### Конфигурация запросов

Каждый метод принимает опциональную конфигурацию запроса для axios последним
параметром, например:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    // axios config
  },
)
```

### Доступ к экземпляру axios

Используйте поле `hashrateno.axios`.

Обратитесь к документации [axios](https://github.com/axios/axios).

### Доступ к экземпляру file-system-cache

Используйте поле `hashrateno.cache`.

Обратитесь к документации
[file-system-cache](https://github.com/philcockfield/file-system-cache).

### Кеширование

Бесплатный план на hashrate.no в данный момент имеет ограничение на 100 запросов
в месяц, поэтому эта библиотека кеширует данные каждого уникального запроса в
файловую систему, чтобы обойти это ограничение.

По умолчанию значение времени жизни кеша (ttl) установлено на 24 часа и исходит
из того, что вы будете делать не более чем 3 уникальных запроса в день.

Если вы делаете больше запросов в день, или приобрели платный тариф измените
значение ttl под себя:

```typescript
import HashrateNO from 'hashrateno'

const hashrateno = new HashrateNO({
  apiKey: '<API_KEY>',
  cacheOptions: {
    ttl: 60 * 60 * 24 * 2, // 2 days
  },
})
```

Значение ttl по умолчанию экспортируется как константа:

```typescript
import { CACHE_TTL } from 'hashrateno'

console.log(CACHE_TTL)
```
