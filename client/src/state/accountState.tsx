import React, { createContext, useReducer, Reducer, useContext } from 'react'

import { syncTasks } from '../api/account-api'

interface AccountState {
  balance: number | null
  newTasksCount: number | null
  syncingTasks: boolean
  syncTasksError: string | null
}

enum AccountStateActions {
  TASKS_SYNC_START,
  TASKS_SYNC_SUCCESS,
  TASKS_SYNC_FAILURE,
  NEW_BALANCE
}

interface Action {
  type: AccountStateActions
  value?: any
}

const initialAccountState: AccountState = {
  balance: null,
  newTasksCount: null,
  syncingTasks: false,
  syncTasksError: null
}

const accountStateReducer: Reducer<AccountState, Action> = (
  state = initialAccountState,
  action: Action
) => {
  switch (action.type) {
    case AccountStateActions.TASKS_SYNC_START:
      return { ...state, syncingTasks: true, syncTasksError: null }
    case AccountStateActions.TASKS_SYNC_SUCCESS:
      return {
        ...state,
        syncingTasks: false,
        syncTasksError: null,
        ...action.value
      }
    case AccountStateActions.TASKS_SYNC_FAILURE:
      return { ...state, syncingTasks: false, syncTasksError: action.value }
    case AccountStateActions.NEW_BALANCE:
      return {
        ...state,
        balance: action.value
      }
    default:
      return state
  }
}

const Account = createContext<{
  account: AccountState
  handleSyncTasks: any
  handleNewBalance: any
}>({
  account: initialAccountState,
  handleSyncTasks: () => {},
  handleNewBalance: () => {}
})

const AccountStateProvider: React.FunctionComponent = ({ children }) => {
  const [account, dispatch] = useReducer(
    accountStateReducer,
    initialAccountState
  )

  const handleSyncTasks = async (idToken: string) => {
    dispatch({ type: AccountStateActions.TASKS_SYNC_START })
    try {
      const res = await syncTasks(idToken)
      dispatch({ type: AccountStateActions.TASKS_SYNC_SUCCESS, value: res })
    } catch (e) {
      dispatch({ type: AccountStateActions.TASKS_SYNC_FAILURE, value: e })
    }
  }

  const handleNewBalance = (balance: AccountState['balance']) => {
    dispatch({ type: AccountStateActions.NEW_BALANCE, value: balance })
  }

  return (
    <Account.Provider
      value={{
        account,
        handleSyncTasks,
        handleNewBalance
      }}
    >
      {children}
    </Account.Provider>
  )
}

export const provideAccount = (WrappedComponent: any) => (props: any) => {
  return (
    <AccountStateProvider>
      <WrappedComponent {...props} />
    </AccountStateProvider>
  )
}

export const useAccount = () => useContext(Account)
