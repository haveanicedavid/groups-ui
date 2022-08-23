import { Box, Button, TextInput } from '@/atoms'

export const TextInputWithButton = (p: {
  value: string
  setValue: (v: string) => void
  onBtnClick: () => void
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      <TextInput
        label="Add member accounts"
        value={p.value}
        onChange={(e) => p.setValue(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button variant="outline" size="sm" onClick={p.onBtnClick} px="xs">
        + Add
      </Button>
    </Box>
  )
}
