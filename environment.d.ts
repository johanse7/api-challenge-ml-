import * as ts from "TypeScript"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      URL_BASE_API_ML: string
      AUTHOR_NAME: string
      AUTHOR_LASTNAME: string
    }
  }
}
