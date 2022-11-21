import CodeEditor from "@uiw/react-textarea-code-editor"
import { useTheme } from "@mui/material/styles"

import { Box, Card } from "@mui/material"
import { Stack } from "@mui/system"

export const TextEditor = ({ code, setCode, readOnly}) => {

  const theme = useTheme()
  return (
    <Stack spacing={2}>
      <Card variant={readOnly ? "" : "outlined"}>
        <Box data-color-mode={theme.palette.mode}>
          <CodeEditor
            value={code}
            language="py"
            placeholder="Ingrese el código Python de su robot"
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
      </Card>
    </Stack>
  )
}
