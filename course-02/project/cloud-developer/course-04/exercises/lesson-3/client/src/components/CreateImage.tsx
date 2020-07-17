import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createImage } from '../api/images-api'

enum UploadState {
  NoUpload,
  UploadingData
}

interface CreateImageProps {
  match: {
    params: {
      groupId: string
    }
  }
}

interface CreateImageState {
  title: string
  file: any
  uploadState: UploadState
}

export class CreateImage extends React.PureComponent<
  CreateImageProps,
  CreateImageState
> {
  state: CreateImageState = {
    title: '',
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {

      this.setUploadState(UploadState.UploadingData)
      const uploadInfo = await createImage({
        groupId: this.props.match.params.groupId,
        title: this.state.title
      })

      console.log('Created image', uploadInfo)

      alert('Image was uploaded!')
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
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
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Image title"
              value={this.state.title}
              onChange={this.handleTitleChange}
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
        {this.state.uploadState === UploadState.UploadingData && <p>Uploading image metadata</p>}
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
