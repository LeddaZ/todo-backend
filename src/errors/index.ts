import { checkedHandler } from './checked'
import { notFoundHandler } from './not-found'
import { validationErrorHandler } from './validation'

export const errorHandlers = [checkedHandler, notFoundHandler, validationErrorHandler]
