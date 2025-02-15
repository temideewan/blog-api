import { Request } from "express"
export type RequestWithMatchedData<T = Record<string, any>> = Request & {matchedData?: T}
