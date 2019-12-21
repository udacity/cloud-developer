import React, { createContext, useReducer, Reducer, useContext } from 'react'

import { syncTasks } from '../api/account-api'

interface AccountState {
  syncingTasks: boolean
  syncTasksError: string | null
}

enum AccountStateActions {
  TASKS_SYNC_START,
  TASKS_SYNC_SUCCESS,
  TASKS_SYNC_FAILURE
}

interface Action {
  type: AccountStateActions
  value?: any
}

const initialAccountState: AccountState = {
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
      return { ...state, syncingTasks: false, syncTasksError: null }
    case AccountStateActions.TASKS_SYNC_FAILURE:
      return { ...state, syncingTasks: false, syncTasksError: action.value }
    default:
      return state
  }
}

const Account = createContext<{
  account: AccountState
  handleSyncTasks: any
}>({
  account: initialAccountState,
  handleSyncTasks: () => {}
})

const AccountStateProvider: React.FunctionComponent = ({ children }) => {
  const [account, dispatch] = useReducer(
    accountStateReducer,
    initialAccountState
  )

  const handleSyncTasks = async (idToken: string) => {
    dispatch({ type: AccountStateActions.TASKS_SYNC_START })
    try {
      await syncTasks(idToken)
      dispatch({ type: AccountStateActions.TASKS_SYNC_SUCCESS })
    } catch (e) {
      dispatch({ type: AccountStateActions.TASKS_SYNC_FAILURE, value: e })
    }
  }

  return (
    <Account.Provider
      value={{
        account,
        handleSyncTasks
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
