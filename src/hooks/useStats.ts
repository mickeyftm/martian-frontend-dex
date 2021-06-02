import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import masterChefABI from 'config/abi/masterchef.json'
import cakeABI from 'config/abi/cake.json'
import { getMasterChefAddress, getCakeAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())
const cakeContract = new web3.eth.Contract(cakeABI as unknown as AbiItem, getCakeAddress())

export const useTotalLockUpRewards = () => {
  const [totalLockUpRewards, setTotalLockUpRewards] = useState(new BigNumber(0))

  useEffect(() => {
    async function fetchTotalLockUpRewards() {
      const res = await masterChefContract.methods.totalLockedUpRewards().call()
      setTotalLockUpRewards(new BigNumber(res))
    }

    fetchTotalLockUpRewards()
  }, [totalLockUpRewards])

  return totalLockUpRewards
}

export const useMaxTxAmount = () => {
  const [maxTxAmount, setMaxTxAmount] = useState(new BigNumber(0))

  useEffect(() => {
    async function fetchMaxTxAmount() {
      const res = await cakeContract.methods.maxTransferAmount().call()
      setMaxTxAmount(new BigNumber(res))
    }

    fetchMaxTxAmount()
  }, [maxTxAmount])

  return maxTxAmount
}

export default useTotalLockUpRewards
