import React, { useEffect, useCallback, useState } from 'react'
import Page from 'components/layout/Page'
import { 
	Heading, 
	Card, 
	CardBody, 
	CardFooter,
	Flex,
	Button
} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Divider from './components/Divider'
import styles from './styles/referrals.module.css';

const Referrals: React.FC = () => {
	const TranslateString = useI18n()
	const [totalReferrals, setTotalReferrals] = useState(0);
	const [totalReferralCommisions, setTotalReferralCommisions] = useState(Number(0.0000).toFixed(4));
	const [yourReferralLink, setYourReferralLink] = useState('https://pantherswap.com/?ref=r4bpzba6on5yswwzqrnqeznvuwvndn9eznkk0jdbm')
	const [copyTxt, setCopyTxt] = useState('Copy');

	function copy() {
		navigator.clipboard.writeText(yourReferralLink)
		setCopyTxt('Copied');
		setTimeout(() => {
			setCopyTxt('Copy');
		}, 1000);
	}

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
		          	<CardFooter style={{textAlign: 'center'}}>{yourReferralLink}</CardFooter>
		        </Card>
		    </div>
	    </Page>
	)
}

export default Referrals