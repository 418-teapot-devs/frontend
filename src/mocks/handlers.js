import { rest } from "msw"
import { mockpublic } from "../features/matches/list/mockpublic"

export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('match_type')
    if (matchType === 'joined') {
      return res(ctx.status(200), ctx.delay(150), ctx.json([]))
    } else {
      return res(ctx.status(200), ctx.delay(150), ctx.json([...mockpublic]))
    }
  }),
]
