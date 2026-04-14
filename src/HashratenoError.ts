export interface HashratenoErrorOptions extends ErrorOptions {
  init?: RequestInit
  request?: Request
  response?: Response
  title?: string
  detail?: string
  data?: unknown
}

export class HashratenoError extends Error {
  init?: RequestInit
  request?: Request
  response?: Response
  title?: string
  detail?: string
  data?: unknown

  constructor(message?: string, options?: HashratenoErrorOptions) {
    super(message)
    this.name = 'HashratenoError'
    Object.assign(this, options)
  }
}
