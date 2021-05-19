import React, { useState, useEffect } from 'react'
import { 
	Heading, 
	Card, 
	CardBody, 
	CardFooter,
	Flex,
	Button
} from '@pancakeswap-libs/uikit'
import UnlockButton from 'components/UnlockButton';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useReferrals } from 'state/hooks'
import { generateReferralLink } from 'utils/referrals'
import useI18n from 'hooks/useI18n'
import styles from '../styles/referrals.module.css';

const ReferralCard: React.FC = () => {
	const TranslateString = useI18n()
	const { account } = useWallet()
	const referrals = useReferrals(account)
	const [totalReferrals, setTotalReferrals] = useState<number>(0);
	const [totalReferralCommisions, setTotalReferralCommisions] = useState<number>(Number(0));
	const [referralLink, setReferralLink] = useState<string>('');
	const [copyTxt, setCopyTxt] = useState('Copy');

	function copy() {
		navigator.clipboard.writeText(referralLink)
		setCopyTxt('Copied');
		setTimeout(() => {
			setCopyTxt('Copy');
		}, 1000);
	}

	useEffect(() => {
		setTotalReferrals(referrals.totalReferrals);
		setTotalReferralCommisions(referrals.totalReferralCommissions);
	}, [referrals])

	useEffect(() => {
		setReferralLink(generateReferralLink(account));
	}, [account])
	
	return (
		<div>
			<Flex className={styles.cardContainer} justifyContent='space-between'>
       			<Card className={styles.card}>
		          	<CardBody>{TranslateString(10008, 'Total Referrals')}</CardBody>
		          	<CardFooter>{totalReferrals}</CardFooter>
		        </Card>

       			<Card className={styles.card}>
		          	<CardBody>{TranslateString(10009, 'Total Referral Commissions')}</CardBody>
		          	<CardFooter>{totalReferralCommisions} Martian</CardFooter>
		        </Card>
       		</Flex>

       		<Card style={{ marginTop: '30px' }}>
	          	<CardBody>
		          	<Flex justifyContent="space-between">
		          		<Flex alignSelf="center">
		          			{TranslateString(10010, 'Your Referral Link')}
	          			</Flex>

		          		<Flex>
			          		<Button as="button" size="sm" onClick={copy}>
			          			{copyTxt}
					        </Button>
				        </Flex>
			        </Flex>
          		</CardBody>
	          	<CardFooter style={{textAlign: 'center'}}>
	          		<a href={referralLink} target="_blank" rel="noreferrer">{referralLink}</a>
	          	</CardFooter>
	        </Card>
		</div>
	)
}

export default ReferralCard