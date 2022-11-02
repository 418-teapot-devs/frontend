import { Token } from "@mui/icons-material"
import { rest } from "msw"
import {
  public_matcheslist,
  started_matcheslist,
  created_matcheslist
} from "./data/matcheslist"
import { robotslist } from "./data/robotslist"

export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get('match_type')
    if (matchType === 'joined') {
      return res(ctx.status(200), ctx.delay(150), ctx.json([]))
    } else if (matchType === 'started') {
      return res(ctx.status(200), ctx.delay(150), ctx.json([...started_matcheslist]))
    } else if (matchType === 'created') {
      return res(ctx.status(200), ctx.delay(150), ctx.json([...created_matcheslist]))
    } else {
      return res(ctx.status(200), ctx.delay(150), ctx.json([...public_matcheslist]))
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
    const token = req.headers.get('token')
    if (token === "error")
      return res(ctx.status(400), ctx.delay(150), ctx.json([...robotslist]))
    else 
      return res(ctx.status(200), ctx.delay(150), ctx.json([...robotslist]))
  }),

]
