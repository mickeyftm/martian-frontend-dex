/* eslint @typescript-eslint/no-var-requires: "off" */
const CryptoJS = require("crypto-js");

export const generateReferralLink = (account) => {
  const code = CryptoJS.Rabbit.encrypt(account, process.env.REACT_APP_SECRET_KEY).toString();
  return `${process.env.REACT_APP_BASE_URL}?ref=${code}`;
}

export function parseReferralCode(referralCode, account) {
	const searchParams = new URLSearchParams(referralCode);
	if (searchParams.get('ref') === '' || account === null) { 
		return false;
	}

	// using searchParams.get('ref') functions removes some characters from the url
	const cleanRefferalCode = referralCode.replace('?ref=', '');
	const referrereAddress = CryptoJS.Rabbit.decrypt(cleanRefferalCode, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
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