import * as React from 'react'
import { Form, Button, Loader } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import {
  getReward,
  getUploadUrl,
  uploadFile,
  patchReward
} from '../api/rewards-api'

enum EditState {
  NoEdit,
  FetchingPresignedUrl,
  UploadingFile,
  Edited
}

interface EditRewardProps {
  match: {
    params: {
      rewardId: string
    }
  }
  auth: Auth
}

interface EditRewardState {
  originalCost: number | null
  cost: number
  file: any
  editState: EditState
  loadingReward: boolean
}

export class EditReward extends React.PureComponent<
  EditRewardProps,
  EditRewardState
> {
  state: EditRewardState = {
    originalCost: null,
    cost: 0,
    file: undefined,
    editState: EditState.NoEdit,
    loadingReward: true
  }

  async componentDidMount() {
    const reward = await getReward(
      this.props.auth.getIdToken(),
      this.props.match.params.rewardId
    )

    this.setState({
      originalCost: reward.cost,
      cost: reward.cost,
      loadingReward: false
    })
  }

  handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const asNumber = Number(value)
    if (!isNaN(asNumber)) {
      this.setState({
        cost: asNumber,
        editState:
          asNumber === this.state.originalCost
            ? EditState.NoEdit
            : EditState.Edited
      })
    }
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0],
      editState: EditState.Edited
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (this.state.file) {
        this.setEditState(EditState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(
          this.props.auth.getIdToken(),
          this.props.match.params.rewardId
        )

        this.setEditState(EditState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)
      }
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    }

    if (this.state.cost !== this.state.originalCost) {
      await patchReward(
        this.props.auth.getIdToken(),
        this.props.match.params.rewardId,
        {
          cost: this.state.cost
        }
      )
      this.setState(prevState => {
        return { originalCost: prevState.cost }
      })
    }
    this.setEditState(EditState.NoEdit)
    alert('Reward was updated!')
  }

  setEditState(editState: EditState) {
    this.setState({
      editState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>
        {this.state.loadingReward ? (
          <Loader indeterminate active inline="centered">
            Loading reward...
          </Loader>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              label="Reward cost"
              onChange={this.handleCostChange}
              control="input"
              value={this.state.cost}
            />
            <Form.Field>
              <label>File</label>
              <input
                type="file"
                accept="image/*"
                placeholder="Image to upload"
                onChange={this.handleFileChange}
              />
            </Form.Field>
            {this.renderButton()}
          </Form>
        )}
      </div>
    )
  }

  renderButton() {
    const { editState } = this.state
    return (
      <div>
        {editState === EditState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {editState === EditState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={
            editState === EditState.FetchingPresignedUrl ||
            editState === EditState.UploadingFile
          }
          disabled={editState === EditState.NoEdit}
          type="submit"
        >
          Update
        </Button>
      </div>
    )
  }
}
