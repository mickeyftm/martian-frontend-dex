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
  background-image: url('/images/egg/3.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/FN-animation.svg');
    background-position: left center, right center, center center;
    height: 316px;
    padding-top: 0;
    background-size: cover;
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

const CardsFullWidth = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const ComingSoonWrapper = styled.div`
  text-align: center;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()

  useEffect(() => {
    setReferralCode(window.location.search, account)
  }, [account])

  const CountdownTime = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
      </span>
    )
  }

  return (
    <Page>
      <div className="hero-header">
        <Heading as="h1" size="xl" mb="10px" color="primary">
          {TranslateString(576, 'Martian Finance')}
        </Heading>
        <Text fontSize="15px">
          {TranslateString(578, 'Automatic Liquidity Acquisition Yield Farm & AMM on Binance Smart Chain')}
        </Text>

        <ComingSoonWrapper>
          <Text fontSize="3rem" color="primary" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
            $Martian Token Has Launched!
          </Text>
        </ComingSoonWrapper>
      </div>
      <Hero>
        <p>{}</p>
      </Hero>
      <div>
        <CardsFullWidth>
          <CardBody style={{ padding: 0 }}>
            <AddMartianCard />
          </CardBody>
        </CardsFullWidth>
        <Cards>
          <CardBody style={{ padding: 0 }}>
            <FarmStakingCard />
            <br />
            <CakeStats />
          </CardBody>

          <CardBody style={{ padding: 0 }}>
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
