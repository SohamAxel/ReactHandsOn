import { setupServer } from "msw/node"
import { rest } from "msw"
import { URL } from "url"

export const mockServer = setupServer()

export function addMockApiRouteHandler(type, path, cb) {
  mockServer.use(
    rest[type](new URL(path, import.meta.env.VITE_API_URL).href, cb)
  )
}
