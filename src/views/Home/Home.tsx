import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, CardBody } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { setReferralCode } from 'utils/referrals'
import Page from 'components/layout/Page'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Countdown, { zeroPad } from 'react-countdown'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import AddMartianCard from './components/AddMartianCard'

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;
  background-image: url('/images/FN-animation.svg');
    background-position: center center;
    background-size: cover;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/FN-animation.svg');
    background-position: center center;
    background-size: cover;
    height: 316px;
    padding-top: 0;
    border-radius: 32px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Header = styled(Cards)`
  margin-bottom: 0;
  height: 100%;
  width: 100%;
`

const HeaderInformationWrapper = styled(CardBody)`
  padding: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.mediaQueries.lg} {
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()

  useEffect(() => {
    setReferralCode(window.location.search, account)
  }, [account])

  const CountdownTime = ({ hours, minutes, seconds, completed }) => {
    return <span>{zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s</span>;
  };

  return (
    <Page>
      <div className="hero-header">
        <Heading as="h1" size="xl" mb="10px" color="primary">
          {TranslateString(576, 'Martian Finance')}
        </Heading>
        <Text fontSize="15px">
          {TranslateString(578, 'Automatic Liquidity Acquisition Yield Farm & AMM on Binance Smart Chain')}
        </Text>
      </div>
      <Hero>
        <Header>
          <HeaderInformationWrapper>
            <Text fontSize="40px" color="primary" style={{ textDecoration: 'underline' }}>
              $Martian Token Will Launch In:
            </Text>
            <Text fontSize="40px" color="primary" style={{ textDecoration: 'underline' }}>
              <Countdown 
                date={new Date('2021-06-01T06:00:00.000-04:00')} 
                zeroPadTime={2} 
                renderer={CountdownTime}
              />
            </Text>
            <Text fontSize="30px">
              June 1st 6:00pm EST
            </Text>
            <Text fontSize="30px">
              June 1st 10:00pm UTC
            </Text>
          </HeaderInformationWrapper>
        </Header>
      </Hero>
      <div>
        <Cards>
          <CardBody style={{ padding: 0 }}>
            <FarmStakingCard />
            <br />
            <CakeStats />
          </CardBody>
          
          <CardBody style={{ padding: 0 }}>
            <AddMartianCard />
            <br />
            <TwitterCard />
            <br />
            <TotalValueLockedCard />
          </CardBody>
        </Cards>
      </div>
    </Page>
  )
}

export default Home
