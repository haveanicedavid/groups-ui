import { enableKeplr } from 'store'

import { ChainSelect } from '@/organisms'
import { AlertTemplate } from '@/templates'

export const EnableKeplr = () => {
  return (
    <AlertTemplate
      color="blue"
      text="You need to enable Keplr to run this app"
      btnText="Enable"
      onBtnClick={enableKeplr}
    >
      <ChainSelect />
    </AlertTemplate>
  )
}
