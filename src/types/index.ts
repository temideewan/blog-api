import { Request } from "express"
export type RequestWithMatchedData<T = Record<string, any>> = Request & {matchedData?: T}
export type RequestWithUser<T = Record<string, any>> = Request & {user?: T}
