import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Button, useModal, Link } from '@pancakeswap-libs/uikit'
import { getCakeAddress } from 'utils/addressHelpers'
import Countdown from 'react-countdown'

const CustomModal = styled.div`
  background-color: #121827;
  border-radius: 32px;
  border: 1px solid #524b63;
  color: #fff;
  width: 420px;
  margin: 0 auto;
  z-index: 100;
  padding: 24px;
  font-size: 20px;

  a {
    display: inline-block;
    font-size: 20px;
  }
`

const Redirect: React.FC = () => {
  const [modalInit, setModalInit] = useState(false)
  const tokenAddress = getCakeAddress()

  const handleRedirect = () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const page = urlSearchParams.get('p')
    let redirectUrl = ''

    switch (page) {
      case 'exchange':
        redirectUrl = `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`
        break
      case 'liquidity':
        redirectUrl = 'https://exchange.pancakeswap.finance/#/pool'
        break
      default:
        redirectUrl = '/'
    }

    window.location.href = redirectUrl
  }

  const CountdownTime = ({ hours, minutes, seconds, completed }) => {
    return <span>{seconds}</span>
  }

  const onComplete = () => {
    handleRedirect()
  }

  const [onPresent] = useModal(
    <CustomModal>
      <p>
        You will be redirected in{' '}
        <strong>
          <Countdown date={Date.now() + 5000} renderer={CountdownTime} onComplete={onComplete} />
          &nbsp;Seconds
        </strong>{' '}
        to PancakeSwap to purchase tokens.
      </p>
      <br />
      <p>
        Please remember to adjust your slippage to 5% to account for our{' '}
        <Link external href="https://martianswap.gitbook.io/martianswap/tokenomics/martian#transfer-tax">
          transfer tax.
        </Link>
      </p>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button variant="primary" onClick={handleRedirect}>
          Click here to be Redirected
        </Button>
      </div>
    </CustomModal>,
    false,
  )

  useEffect(() => {
    if (!modalInit) {
      onPresent()
      setModalInit(true)
    }
  }, [modalInit, onPresent])

  return <div />
}

export default Redirect
