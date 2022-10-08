import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login } from "./api/login"
import { USER_SLICE, USER_LOGIN_REQUEST } from "./consts"

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

export const loginAsync = createAsyncThunk(
  USER_LOGIN_REQUEST,
  async (data, { rejectWithValue }) => {
    try {
      const { username, password } = data
      const response = await login(username, password)
      const body = await response.json()
      const cat = body[0]

      switch (response.status) {
        case 200:
          return { token: cat["url"] }
        case 400:
          return rejectWithValue(cat["errors"])
        default:
          return rejectWithValue({
            extra: ["Server error, try again later..."],
          })
      }
    } catch (err) {
      return rejectWithValue({ extra: [`Unexpected error: ${err}`] })
    }
  }
)

export const userSlice = createSlice({
  name: USER_SLICE,
  initialState,
  reducers: {
    logout: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.login.loading = true
        state.login.errors = {}
        state.token = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.login.loading = false
        state.login.errors = {}
        state.token = action.payload["token"]
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.login.loading = false
        state.login.errors = action.payload
        state.token = null
      })
  },
})

export const { logout } = userSlice.actions

export const selectToken = (state) => state.user.token
export const selectLoginLoading = (state) => state.user.login.loading
export const selectLoginErrors = (state) => state.user.login.errors

export default userSlice.reducer
