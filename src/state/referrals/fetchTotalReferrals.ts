import { AbiItem } from 'web3-utils'
import referralABI from 'config/abi/referral.json'
import { getReferralAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'

const web3 = getWeb3()
const referralContract = new web3.eth.Contract(referralABI as unknown as AbiItem, getReferralAddress())

const fetchTotalReferrals = async (address) => {
  const referralsCount = await referralContract.methods.referralsCount(address).call()
  return referralsCount
}

export default fetchTotalReferrals
