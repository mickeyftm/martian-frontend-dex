import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getBalanceNumber } from 'utils/formatBalance'
import { canHarvest } from 'utils/harvest'
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const { account } = useWallet()
  const [isCanHarvest, setIsCanHarvest] = useState(false)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()
  
  useEffect(() => {
    const fetchCanHarvest = async () => {
      const res = await canHarvest(pid, account)
      setIsCanHarvest(res)
    }

    if (account) {
      fetchCanHarvest()
    }
  }, [pid, account, setIsCanHarvest])

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <BalanceAndCompound>
        {pid === 12 ? (
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx}
            size="sm"
            variant="secondary"
            marginBottom="15px"
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
          >
            {TranslateString(999, 'Compound')}
          </Button>
        ) : null}
        <Button
          disabled={/* rawEarningsBalance === 0 || */ !isCanHarvest || pendingTx}
          onClick={async () => {
            setPendingTx(true)

            try {
              await onReward()
            } catch (err) {
              // NOTE: This is left blank intentionality
            } finally {
              setPendingTx(false)
            }
          }}
        >
          {TranslateString(999, 'Harvest')}
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
