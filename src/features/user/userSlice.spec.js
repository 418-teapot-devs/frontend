import userReducer, { loginAsync, logout } from "./userSlice"

describe("slice reducer", () => {
  const initialState = {
    token: null,
    login: {
      loading: false,
      errors: {},
    },
    profile: {
      username: null,
      email: null,
      avatar_url: null,
    },
  }

  const loggedInState = {
    token: "sometoken",
    login: {
      loading: false,
      errors: {},
    },
    profile: {
      username: "someusername",
      email: "someemail",
      avatar_url: "someavatarurl",
    },
  }

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  // TODO: Test asyncThunk with mocked API
  // it("should handle loginAsync", () => {
  //   const actual = userReducer(initialState, loginAsync());
  //   expect(actual.token).not.toBeNull()
  // });

  it("should handle logout", () => {
    const actual = userReducer(loggedInState, logout())
    expect(actual).toEqual(initialState)
  })
})
