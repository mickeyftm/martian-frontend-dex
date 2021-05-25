/* eslint @typescript-eslint/no-var-requires: "off" */
const CryptoJS = require('crypto-js')

const secretKey = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRET_KEY)
const hexPrefix = '0x';
const martianRefCodeCookieKey = 'martian_finance_referral_code';

export const generateReferralLink = (account) => {
  const simplifieldAccount = account.replace(hexPrefix, '')
  const code = CryptoJS.Rabbit.encrypt(simplifieldAccount, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
  })
    .toString()
    .replace('==', '')

  return `${process.env.REACT_APP_BASE_URL}?ref=${code}`
}

export function parseReferralCode(referralCode, account) {
  const searchParams = new URLSearchParams(referralCode)
  const isRefNotExists = searchParams.get('ref') === null;
  const isAccountNotExist = account === null;
  if (isRefNotExists || isAccountNotExist) {
    return false
  }

  const cookieValue = getReferralCookie();
  if (cookieValue) {
    return false;
  }

  // using searchParams.get('ref') functions removes some characters from the url
  const cleanRefferalCode = `${referralCode.replace('?ref=', '')}==`
  const decryptedReferrereAddress = CryptoJS.Rabbit.decrypt(cleanRefferalCode, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
  }).toString(CryptoJS.enc.Utf8)
  const referrereAddress = `${hexPrefix}${decryptedReferrereAddress}`

  if (account === referrereAddress) {
    return false
  }

  if (document.cookie.indexOf(martianRefCodeCookieKey) === -1) {
    document.cookie = `${martianRefCodeCookieKey}=${cleanRefferalCode}`
  }

  return true
}

export function getReferralCookie() {
  const martianCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`{martianRefCodeCookieKey}=`));

  if (typeof martianCookie === 'undefined') {
    return '';
  }

  return martianCookie.split('=')[1];
}

export function getReferralAddress() {
  const cookieValue = getReferralCookie();
  if (!cookieValue) {
    return `${hexPrefix}0000000000000000000000000000000000000000`;
  }

  const decryptedReferrereAddress = CryptoJS.Rabbit.decrypt(cookieValue, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
  }).toString(CryptoJS.enc.Utf8)

  const referrereAddress = `${hexPrefix}${decryptedReferrereAddress}`

  document.cookie = `${martianRefCodeCookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`

  return referrereAddress;
}

export default generateReferralLink
