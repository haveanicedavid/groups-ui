import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { setActiveChain, walletStore } from 'store'

import { Select } from '@/atoms'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  label: chainName,
}))

export const ChainSelect = () => {
  const snap = useSnapshot(walletStore)
  return (
    <Select
      label="Select a Chain"
      value={snap.activeChain.chainId}
      onChange={setActiveChain}
      data={CHAIN_ITEMS}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction="ease-in-out"
    />
  )
}
