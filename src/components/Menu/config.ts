import { MenuEntry } from '@pancakeswap-libs/uikit'
import { getCakeAddress } from 'utils/addressHelpers'

const tokenAddress = getCakeAddress();
const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: '/trade?p=exchange',
      },
      {
        label: 'Liquidity',
        href: '/trade?p=liquidity',
      },
    ],
  },
  // {
  //   label: 'Farms',
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  {
    label: 'Referrals',
    icon: 'ReferralsIcon',
    href: '/referrals',
  },
  {
    label: 'Audits',
    icon: 'AuditIcon',
    href: 'https://github.com/martiandefi/audit',
  },
  {
    label: 'Price Chart',
    icon: 'ChartIcon',
    items: [
      {
        label: 'PooCoin',
        href: `https://poocoin.app/tokens/${tokenAddress}`,
      },
      {
        label: 'BoggedFinance',
        href: `https://charts.bogged.finance/?token=${tokenAddress}`,
      },
    ],
  },
  {
    label: 'Features',
    icon: 'FeaturesIcon',
    items: [
      {
        label: 'Transfer Tax',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/martian',
      },
      {
        label: 'Auto Burn',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/auto-burn-mechanism',
      },
      {
        label: 'Auto LP',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/auto-liquidity-mechanism',
      },
      {
        label: 'Harvesting Time Lock',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/harvest-time-lock',
      },
      {
        label: 'Anti Whale Measures',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/mitigate-pump-and-dumps',
      },
      {
        label: 'UFO Airdrops',
        href: 'https://martianswap.gitbook.io/martianswap/tokenomics/ufo-airdrops',
      },
    ],
  },
  {
    label: 'Listings',
    icon: 'ListIcon',
    items: [
      {
        label: 'BscScan',
        href: `https://bscscan.com/token/${tokenAddress}`,
      },
      {
        label: 'DappRadar',
        href: '',
      },
      {
        label: 'CoinMarketCap',
        href: '',
      },
      {
        label: 'CoinGecko',
        href: '',
      },
    ],
  },
  {
    label: 'Analytics (Coming Soon)',
    icon: 'InfoIcon',
    href: '',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/martiandefi',
      },
      {
        label: 'Docs',
        href: 'https://martianswap.gitbook.io/',
      },
      {
        label: 'Roadmap',
        href: 'https://martianswap.gitbook.io/martianswap/roadmap-1',
      },
    ],
  },
]

export default config
