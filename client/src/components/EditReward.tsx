import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getReward, getUploadUrl, uploadFile } from '../api/rewards-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile
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
  rewardCost: number
  file: any
  uploadState: UploadState
}

export class EditReward extends React.PureComponent<
  EditRewardProps,
  EditRewardState
> {
  state: EditRewardState = {
    rewardCost: 0,
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  async componentDidMount() {
    const reward = await getReward(
      this.props.auth.getIdToken(),
      this.props.match.params.rewardId
    )

    this.setState({
      rewardCost: reward.cost
    })
  }

  handleRewardCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const asNumber = Number(value)
    if (!isNaN(asNumber)) {
      this.setState({
        rewardCost: asNumber
      })
    }
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.FetchingPresignedUrl)
      const uploadUrl = await getUploadUrl(
        this.props.auth.getIdToken(),
        this.props.match.params.rewardId
      )

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadUrl, this.state.file)

      alert('File was uploaded!')
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            label="Reward cost"
            onChange={this.handleRewardCostChange}
            control="input"
          />
          <Form.Field label="File">
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {this.state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
}
