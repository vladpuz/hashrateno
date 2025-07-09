## Version 2.0.0

- Hashrate.no API v2
- Changed arguments of the HashrateNO class constructor. Now apiKey is passed as
  the first argument, options as the second argument. Previously, one argument
  was passed - a configuration object including apiKey.
- Removed [file-system-cache](https://www.npmjs.com/package/file-system-cache)
  dependency. I recommend implementing caching through this library on the side
  of your code or purchasing a paid tariff plan. This was done so that this
  package could be used not only in node.js and because it is impossible to
  select a universal TTL value for the cache.
- Added throw errors. Previously, errors were not thrown because the response
  status was always 200.
