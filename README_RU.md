# hashrateno

> Hashrate.no API client

Особенности:

- Базируется на нативном fetch
- Удобная обработка ошибок
- Полная типизация

Официальная документация: [hashrate.no/c/api](https://hashrate.no/c/api)

## Установка

```shell
npm install hashrateno
```

## Использование

### Создание экземпляра

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

## Опции fetch

Все методы принимают опции для fetch последним параметром, например:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    // `RequestInit` options
  },
)
```

## Обработка ошибок

Используйте класс `HashratenoError` для обработки ошибок.

Ошибки имеют поля с информацией `error.title` и `error.detail`.

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

Для повторных попыток рекомендуется использовать
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

Используйте `AbortSignal.timeout`:

```typescript
const benchmarks = await hashrateno.benchmarks(
  { coin: 'RVN' },
  {
    signal: AbortSignal.timeout(5000),
  },
)
```

Комбинируйте сигналы с помощью `AbortSignal.any`. В следующем примере запрос
будет прерван через 5 секунд, но так же может быть прерван раньше при вызове
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

## Лимиты вызова API

Бесплатный тарифный план Hashrate.no предоставляет только 100 вызовов API в
месяц. Чтобы обойти это, вы можете кешировать данные в памяти, файловой системе
или перейти на платный тарифный план.

Хорошая библиотека для кеширования данных в файловой системе:
[file-system-cache](https://github.com/philcockfield/file-system-cache).

Преимущество кеширования данных в файловой системе в том, что данные не будут
потеряны после перезапуска вашего приложения.
