import { History } from 'history'
import update from 'immutability-helper'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import {
  createReward,
  deleteReward,
  getRewards,
  patchReward
} from '../api/rewards-api'
import Auth from '../auth/Auth'
import { Reward } from '../types/Reward'
import { useAccount } from '../state/accountState'

interface RewardsProps {
  auth: Auth
  history: History
}

interface RewardsState {
  rewards: Reward[]
  newRewardName: string
  loadingRewards: boolean
}

export const Rewards: React.FunctionComponent<RewardsProps> = props => {
  const { account } = useAccount()
  const { balance, syncingTasks } = account

  const [rewards, setRewards] = useState<Reward[]>([])
  const [newRewardName, setNewRewardName] = useState('')
  const [loadingRewards, setLoadingRewards] = useState(true)

  useEffect(() => {
    async function loadRewards() {
      const { auth } = props
      try {
        const rewards = await getRewards(auth.getIdToken())
        setRewards(rewards)
        setLoadingRewards(false)
      } catch (e) {
        alert(`Failed to fetch rewards: ${e.message}`)
      }
    }

    loadRewards()
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRewardName(event.target.value)
  }

  const onEditButtonClick = (rewardId: string) => {
    const { history } = props
    history.push(`/rewards/${rewardId}/edit`)
  }

  const onRewardCreate = async (
    event: React.ChangeEvent<HTMLButtonElement>
  ) => {
    const { auth } = props
    try {
      const newReward = await createReward(auth.getIdToken(), {
        name: newRewardName
        // TODO: have state for reward cost
      })
      setRewards([...rewards, newReward])
      setNewRewardName('')
    } catch (err) {
      console.log('err :', err)
      alert('Reward creation failed')
    }
  }

  const onRewardDelete = async (rewardId: string) => {
    const { auth } = props
    try {
      await deleteReward(auth.getIdToken(), rewardId)
      setRewards(rewards.filter(reward => reward.rewardId != rewardId))
    } catch (e) {
      console.log('e :', e)
      alert('Reward deletion failed')
    }
  }

  const onRewardCheck = async (pos: number) => {
    const { auth } = props
    try {
      const reward = rewards[pos]
      await patchReward(auth.getIdToken(), reward.rewardId, {
        name: reward.name,
        redeemed: !reward.redeemed
      })
      setRewards(
        update(rewards, {
          [pos]: { redeemed: { $set: !reward.redeemed } }
        })
      )
    } catch (e) {
      console.log('e :', e)
      alert('Reward update failed')
    }
  }

  const renderLoading = (loadingMsg: string) => (
    <Grid.Row>
      <Loader indeterminate active inline="centered">
        {loadingMsg}
      </Loader>
    </Grid.Row>
  )

  const renderRewardsList = () => {
    return (
      <Grid padded>
        {rewards.map((reward, pos) => {
          return (
            <Grid.Row key={reward.rewardId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => onRewardCheck(pos)}
                  checked={reward.redeemed}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {reward.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {reward.cost}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => onEditButtonClick(reward.rewardId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => onRewardDelete(reward.rewardId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {reward.attachmentUrl && (
                <Image
                  src={reward.attachmentUrl}
                  size="small"
                  wrapped
                  onError={(i: any) => (i.target.src = '')}
                />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  const renderHeader = () => (
    <div>
      <Header as="h1">Rewards</Header>
      <p>Balance: {balance}</p>
    </div>
  )

  return (
    <div>
      {syncingTasks
        ? renderLoading('Checking your balance...')
        : renderHeader()}
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New reward',
              onClick: onRewardCreate
            }}
            fluid
            actionPosition="left"
            placeholder="Treat yo self"
            onChange={handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
      {loadingRewards
        ? renderLoading('Loading rewards...')
        : renderRewardsList()}
    </div>
  )
}
