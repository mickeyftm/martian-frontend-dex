import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Countdown, { zeroPad } from 'react-countdown'
import { useDispatch } from 'react-redux'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { fetchFarmUserDataAsync } from 'state/actions'

interface TimerModalProps {
  onDismiss?: () => void
  pool: string
  harvestLockup: number
  currentTimestamp: number
  nextHarvestUntilTimestamp?: any
}

const TimerModal: React.FC<TimerModalProps> = ({ onDismiss, pool, harvestLockup, nextHarvestUntilTimestamp }) => {
  const TranslateString = useI18n()
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const [countdownDate, setCountdownDate] = useState(Date.now() + 10000)

  const CountdownTime = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )
  }

  const onComplete = () => {
    dispatch(fetchFarmUserDataAsync(account))
  }

  return (
    <Modal title="Harvest In" onDismiss={onDismiss}>
      <Flex justifyContent="center" marginBottom="10px">
        <Text bold color="textSubtle">
          <Countdown date={countdownDate} zeroPadTime={2} renderer={CountdownTime} onComplete={onComplete} />
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Text bold color="textDisabled">
          {TranslateString(348, 'Pool')}: {pool}
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Text bold color="textDisabled">
          {TranslateString(10012, 'Harvest Lockup')}: {harvestLockup} {TranslateString(10014, 'Hour(s)')}
        </Text>
      </Flex>
    </Modal>
  )
}

export default TimerModal
