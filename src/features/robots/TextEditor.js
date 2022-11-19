import CodeEditor from "@uiw/react-textarea-code-editor"
import { useState } from "react"
import { useTheme } from "@mui/material/styles"

import { Button, Alert } from "@mui/material"
import { Stack, Box, LinearProgress } from "@mui/material"

export const TextEditor = ({ readOnly }) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const theme = useTheme()

  const submitCode = () => {
    console.log(code)
    setLoading(true)
    switch (code) {
      case "error":
        setError("Se produjo un error!")
        setLoading(false)
        break
      default:
        setError(null)
        setLoading(false)
        break
    }
  }

  return (
    <Stack>
      {loading && <LinearProgress />}
      <Box data-color-mode={theme.palette.mode}>
        <CodeEditor
          value={code}
          language="py"
          placeholder="Please enter Python code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          readOnly={readOnly}
          style={{
            fontSize: 15,
            fontFamily: "monospace",
            backgroundColor: theme.palette.background.textEditor,
          }}
        />
      </Box>
      {Boolean(error) && <Alert severity="error">{error}</Alert>}
      {!readOnly && (
        <Button onClick={submitCode} disabled={code === ""}>
          Subir código
        </Button>
      )}
    </Stack>
  )
}
