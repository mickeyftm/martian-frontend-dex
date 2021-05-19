import React from 'react'
import Page from 'components/layout/Page'
import { 
	Heading, 
	Card, 
	CardBody, 
	CardFooter,
	Flex,
	Button
} from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import UnlockWalletCard from './components/UnlockWalletCard';
import ReferralCard from './components/ReferralCard';
import Divider from './components/Divider'

const Referrals: React.FC = () => {
	const TranslateString = useI18n()
	const wallet = useWallet()

	return (
		<Page>
	      	<Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
		        {TranslateString(10006, 'Martian Referral Program')}
	      	</Heading>
	      	<Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        		{TranslateString(10007, 'Share the referral link below to invite your friends and earn 1% of your friends\' earnings FOREVER!')}
	      	</Heading>
		    <div>
	       		<Divider />

	       		{wallet.status === 'connected' &&
	       			<ReferralCard />
	       		}

	       		{wallet.status !== 'connected' &&
	       			<UnlockWalletCard />
	       		}
		    </div>
	    </Page>
	)
}

export default Referrals