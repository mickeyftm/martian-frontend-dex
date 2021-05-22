import { AbiItem } from 'web3-utils'
import referralABI from 'config/abi/referral.json'
import { getReferralAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'

const web3 = getWeb3()
const referralContract = new web3.eth.Contract(referralABI as unknown as AbiItem, getReferralAddress())

const fetchTotalReferralCommissions = async (address) => {
  const totalReferralCommissions = await referralContract.methods.totalReferralCommissions(address).call()
  return totalReferralCommissions
}

export default fetchTotalReferralCommissions
