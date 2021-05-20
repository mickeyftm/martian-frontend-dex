/* eslint @typescript-eslint/no-var-requires: "off" */
const CryptoJS = require("crypto-js");

const secretKey = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRET_KEY);

export const generateReferralLink = (account) => {
	const simplifieldAccount = account.replace('0x', '');
  const code = CryptoJS.Rabbit.encrypt(simplifieldAccount, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
  }).toString().replace('==', '');

  return `${process.env.REACT_APP_BASE_URL}?ref=${code}`;
}

export function parseReferralCode(referralCode, account) {
	const searchParams = new URLSearchParams(referralCode);
	if (searchParams.get('ref') === '' || account === null) { 
		return false;
	}

	// using searchParams.get('ref') functions removes some characters from the url
	const cleanRefferalCode = `${referralCode.replace('?ref=', '')}==`;
	const decryptedReferrereAddress = CryptoJS.Rabbit.decrypt(cleanRefferalCode, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
  }).toString(CryptoJS.enc.Utf8);
	const referrereAddress = `0x${decryptedReferrereAddress}`;

	if (account === referrereAddress) {
		return false;
	}

	const cookieKey = 'martian_finance_referral_code';
	if (document.cookie.indexOf(cookieKey) === -1) {
		document.cookie = `${cookieKey}=${cleanRefferalCode}`;
	}

	return true;
}

export default generateReferralLink