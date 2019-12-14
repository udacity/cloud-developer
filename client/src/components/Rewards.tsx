import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
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

import { createReward, deleteReward, getRewards, patchReward } from '../api/rewards-api'
import Auth from '../auth/Auth'
import { Reward } from '../types/Reward'

interface RewardsProps {
  auth: Auth
  history: History
}

interface RewardsState {
  rewards: Reward[]
  newRewardName: string
  loadingRewards: boolean
}

export class Rewards extends React.PureComponent<RewardsProps, RewardsState> {
  state: RewardsState = {
    rewards: [],
    newRewardName: '',
    loadingRewards: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newRewardName: event.target.value })
  }

  onEditButtonClick = (rewardId: string) => {
    this.props.history.push(`/rewards/${rewardId}/edit`)
  }

  onRewardCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const newReward = await createReward(this.props.auth.getIdToken(), {
        name: this.state.newRewardName,
        // TODO: have state for reward cost
      })
      this.setState({
        rewards: [...this.state.rewards, newReward],
        newRewardName: ''
      })
    } catch (err) {
      console.log('err :', err);
      alert('Reward creation failed')
    }
  }

  onRewardDelete = async (rewardId: string) => {
    try {
      await deleteReward(this.props.auth.getIdToken(), rewardId)
      this.setState({
        rewards: this.state.rewards.filter(reward => reward.rewardId != rewardId)
      })
    } catch (e) {
      console.log('e :', e);
      alert('Reward deletion failed')
    }
  }

  onRewardCheck = async (pos: number) => {
    try {
      const reward = this.state.rewards[pos]
      await patchReward(this.props.auth.getIdToken(), reward.rewardId, {
        name: reward.name,
        redeemed: !reward.redeemed
      })
      this.setState({
        rewards: update(this.state.rewards, {
          [pos]: { redeemed: { $set: !reward.redeemed } }
        })
      })
    } catch (e) {
      console.log('e :', e);
      alert('Reward update failed')
    }
  }

  async componentDidMount() {
    try {
      const rewards = await getRewards(this.props.auth.getIdToken())
      this.setState({
        rewards,
        loadingRewards: false
      })
    } catch (e) {
      alert(`Failed to fetch rewards: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Rewards</Header>

        {this.renderCreateRewardInput()}

        {this.renderRewards()}
      </div>
    )
  }

  renderCreateRewardInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New reward',
              onClick: this.onRewardCreate
            }}
            fluid
            actionPosition="left"
            placeholder="Treat yo self"
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderRewards() {
    if (this.state.loadingRewards) {
      return this.renderLoading()
    }

    return this.renderRewardsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Rewards
        </Loader>
      </Grid.Row>
    )
  }

  renderRewardsList() {
    return (
      <Grid padded>
        {this.state.rewards.map((reward, pos) => {
          return (
            <Grid.Row key={reward.rewardId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onRewardCheck(pos)}
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
                  onClick={() => this.onEditButtonClick(reward.rewardId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onRewardDelete(reward.rewardId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {reward.attachmentUrl && (
                <Image src={reward.attachmentUrl} size="small" wrapped />
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
}
