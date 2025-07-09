# hashrateno

> Hashrate.no API client

Особенности:

- Базируется на [axios](https://github.com/axios/axios)
- Обработка ошибок через try...catch и instanceof

Официальная документация: [hashrate.no/c/api](https://hashrate.no/c/api)

## Установка

```shell
npm install hashrateno
```

## Использование

### Создание экземпляра

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

### Конфигурация запросов

Все методы принимают опциональную конфигурацию запроса для axios последним
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

## Лимиты вызова API

Бесплатный тарифный план Hashrate.no предоставляет только 100 вызовов API в
месяц. Чтобы обойти это, вы можете кешировать данные в памяти, файловой системе
или перейти на платный тарифный план.

Хорошая библиотека для кеширования данных в файловой системе:
[file-system-cache](https://github.com/philcockfield/file-system-cache).

Преимущество кеширования данных в файловой системе в том, что данные не будут
потеряны после перезапуска вашего приложения.
