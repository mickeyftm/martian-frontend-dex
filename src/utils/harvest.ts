import { AbiItem } from 'web3-utils'
import masterChefABI from 'config/abi/masterchef.json'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'

const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())

export const canHarvest = async (pid, account): Promise<boolean> => {
  if (account === null) {
    return false
  }
  const canUserHarvest: boolean = await masterChefContract.methods.canHarvest(pid, account).call()
  return canUserHarvest
}

export default canHarvest
