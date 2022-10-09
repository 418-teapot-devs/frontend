import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login } from "./api/login"
import { USER_SLICE, USER_LOGIN_REQUEST } from "./consts"

const initialState = {
  token: null,
  login: {
    loading: false,
    error: null,
  },
  profile: {
    username: null,
    email: null,
    avatar_url: null,
  },
}

export const loginAsync = createAsyncThunk(
  USER_LOGIN_REQUEST,
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await login(username, password)

      switch (response.status) {
        case 200:
          return response
        case 400:
          return rejectWithValue(response.message)
        case 500:
          return rejectWithValue(response.message)
        default:
          return rejectWithValue(`Unknown error, code(${response.status})`)
      }
    } catch (err) {
      return rejectWithValue(`Unexpected error: ${err}`)
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
        state.login.error = null
        state.token = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.login.loading = false
        state.login.error = null
        state.token = action.payload["token"]

        state.profile.username = action.payload["profile"]["username"]
        state.profile.email = action.payload["profile"]["email"]
        state.profile.avatar_url = action.payload["profile"]["avatar_url"]
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.login.loading = false
        state.login.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions

export const selectUserToken = (state) => state.user.token
export const selectUserLoginLoading = (state) => state.user.login.loading
export const selectUserLoginError = (state) => state.user.login.error

export const selectUserProfile = (state) => state.user.profile

export default userSlice.reducer
