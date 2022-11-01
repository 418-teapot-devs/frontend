import { rest } from "msw"
import { matcheslist } from "./data/matcheslist"

const join_handlers = matcheslist.map((match) => {
  return (
    rest.put(`http://127.0.0.1:8000/matches/${match.id}/join/`, 
    async (req, res, ctx) => {
      const body = await req.json()
      const token = req.headers.get('token')
      if (token === 'invalid robot')
        return res(ctx.status(404, 'Robot not found'), ctx.delay(150))

      else if (token === 'invalid match')
        return res(ctx.status(404, 'Match not found'), ctx.delay(150))

      else if (token === 'invalid user')
        return res(ctx.status(404, 'User not found'), ctx.delay(150))
  
      else if (token === 'started match')
        return res(ctx.status(403, 'Match has already started'), ctx.delay(150))

      else if (match.max_players <= match.robots.length)
        return res(ctx.status(403, 'Match is full'), ctx.delay(150))

      else if (match.is_private && body.password === "")
        return res(ctx.status(403, 'Match password is incorrect'), ctx.delay(150))

      else if (match.is_private && body.password === "server error")
        return res(ctx.status(400, 'Server error'), ctx.delay(150))

      else if (token === 'unauthorized')
        return res(ctx.status(403), ctx.delay(150))

      else
        return res(ctx.status(201, 'OK'), ctx.delay(150))
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
