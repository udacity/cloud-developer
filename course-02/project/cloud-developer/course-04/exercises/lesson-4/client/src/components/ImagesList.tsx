import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getImages } from '../api/images-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { UdagramImage } from './UdagramImage'
import { History } from 'history'

interface ImagesListProps {
  history: History
  match: {
    params: {
      groupId: string
    }
  }
}

interface ImagesListState {
  images: ImageModel[]
}

export class ImagesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
> {
  state: ImagesListState = {
    images: []
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/${this.props.match.params.groupId}/create`)
  }

  async componentDidMount() {
    try {
      const images = await getImages(this.props.match.params.groupId)
      this.setState({
        images
      })
    } catch (e) {
      alert(`Failed to fetch images for group : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Images</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
        >
          Upload new image
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.images.map(image => {
            return <UdagramImage key={image.imageId} image={image} />
          })}
        </Card.Group>
      </div>
    )
  }
}
