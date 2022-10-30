import { rest } from "msw"
import { matcheslist } from "./data/matcheslist"

const join_handlers = matcheslist.map((match) => {
  return (
    rest.post(`http://127.0.0.1:8000/matches/${match.id}/join`, async (req, res, ctx) => {
      return res(ctx.status(201), ctx.delay(150))
    })
  )
})

export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('match_type')
    if (matchType === 'joined') {
      return res(ctx.status(200), ctx.delay(150), ctx.json([]))
    } else {
      return res(ctx.status(200), ctx.delay(150), ctx.json([...matcheslist]))
    }
  }),

  rest.post("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const body = await req.json()
    if (body.name === "Nombre de Partida") {
      return res(ctx.status(201), ctx.delay(150))
    } else {
      return res(ctx.status(400), ctx.delay(150))
    }
  }),

  rest.get("http://127.0.0.1:8000/robots/", async (req, res, ctx) => {
    const robots = [{name: "Robot1", id: "1"}, {name: "Robot2", id: "2"}]
    return res(ctx.status(200), ctx.delay(150), ctx.json([...robots]))
  }),

  ...join_handlers,
]