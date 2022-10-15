import React from "react"
import { render,  screen  } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { CreatedMatches } from "./CreatedMatches"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { listCreated } from "./api/created"


export const handlers = [
  rest.get("http://127.0.0.1:8000/matches/created", async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.delay(150)
    )
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test("Should render all matches", async () => {
    const user = userEvent.setup()
    render(
        <CreatedMatches matches={listCreated()} />
    );
    listCreated().map((match) => {
        expect(screen.queryByText(match.name)).toBeInTheDocument()

    });
    
});