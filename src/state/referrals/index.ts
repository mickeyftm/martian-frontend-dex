/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import ReferralConfig from 'config/constants/referrals'
import { ReferralsState, Referral } from '../types'
import fetchTotalReferralCommissions from './fetchTotalReferralCommissions'
import fetchTotalReferrals from './fetchTotalReferrals'

const initialState: ReferralsState = { data: { ...ReferralConfig } }

export const ReferralsSlice = createSlice({
  name: 'Referrals',
  initialState,
  reducers: {
    setTotalReferralsData: (state, action) => {
      state.data = {
        ...state.data,
        totalReferrals: action.payload,
      }
    },
    setTotalReferralCommissionsData: (state, action) => {
      state.data = {
        ...state.data,
        totalReferralCommissions: action.payload,
      }
    },
  },
})

// Actions
export const { setTotalReferralsData, setTotalReferralCommissionsData } = ReferralsSlice.actions

// Thunks
export const fetchTotalReferralsDataAsync = (account) => async (dispatch) => {
  const data = await fetchTotalReferrals(account)

  dispatch(setTotalReferralsData(data))
}

export const fetchTotalReferralCommissionsDataAsync = (account) => async (dispatch) => {
  const data = await fetchTotalReferralCommissions(account)

  dispatch(setTotalReferralCommissionsData(data))
}

export default ReferralsSlice.reducer
