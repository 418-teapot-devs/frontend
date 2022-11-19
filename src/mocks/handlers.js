import { Token } from "@mui/icons-material"
import { rest } from "msw"
import {
  public_matcheslist,
  started_matcheslist,
  created_matcheslist,
} from "./data/matcheslist"
import { robotslist } from "./data/robotslist"

const join_handlers = public_matcheslist.map((match) => {
  return rest.put(
    `http://127.0.0.1:8000/matches/${match.id}/join/`,
    async (req, res, ctx) => {
      const body = await req.json()
      const token = req.headers.get("token")
      if (token === "invalid robot")
        return res(ctx.status(404, "Robot not found"), ctx.delay(150))
      else if (token === "invalid match")
        return res(ctx.status(404, "Match not found"), ctx.delay(150))
      else if (token === "invalid user")
        return res(ctx.status(404, "User not found"), ctx.delay(150))
      else if (token === "started match")
        return res(ctx.status(403, "Match has already started"), ctx.delay(150))
      else if (match.max_players <= match.robots.length)
        return res(ctx.status(403, "Match is full"), ctx.delay(150))
      else if (match.is_private && body.password === "")
        return res(
          ctx.status(403, "Match password is incorrect"),
          ctx.delay(150)
        )
      else if (match.is_private && body.password === "server error")
        return res(ctx.status(400, "Server error"), ctx.delay(150))
      else if (token === "unauthorized")
        return res(ctx.status(403), ctx.delay(150))
      else return res(ctx.status(201, "OK"), ctx.delay(150))
    }
  )
})

export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/", async (req, res, ctx) => {
    const matchType = req.url.searchParams.get("match_type")
    if (matchType === "joined") {
      return res(ctx.status(200), ctx.delay(150), ctx.json([]))
    } else if (matchType === "started") {
      return res(
        ctx.status(200),
        ctx.delay(150),
        ctx.json([...started_matcheslist])
      )
    } else if (matchType === "created") {
      return res(
        ctx.status(200),
        ctx.delay(150),
        ctx.json([...created_matcheslist])
      )
    } else {
      return res(
        ctx.status(200),
        ctx.delay(150),
        ctx.json([...public_matcheslist])
      )
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
    const token = req.headers.get("token")
    if (token === "error")
      return res(ctx.status(400), ctx.delay(150), ctx.json([...robotslist]))
    else return res(ctx.status(200), ctx.delay(150), ctx.json([...robotslist]))
  }),

  ...join_handlers,

  rest.post("http://127.0.0.1:8000/users/login/", async (req, res, ctx) => {
    const body = await req.json()
    const response = {
      token: "hola",
      profile: {
        username: "user",
        email: "email@e.mail",
        avatar_url: "",
      },
    }
    if (body.username === "error")
      return res(ctx.status(401), ctx.delay(150))
    else if (body.username === "server error")
      return res(ctx.status(500), ctx.delay(150))
    else return res(ctx.status(200), ctx.delay(150), ctx.json(response))
  }),

  rest.put(
    "http://127.0.0.1:8000/matches/:match_id/start/",
    async (req, res, ctx) => {
      return res(ctx.status(201), ctx.delay(150))
    }
  ),

  rest.put(
    "http://127.0.0.1:8000/matches/:match_id/leave/",
    async (req, res, ctx) => {
      return res(ctx.status(201), ctx.delay(150))
    }
  ),
]
