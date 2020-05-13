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

import { createAppointment, deleteAppointment, getAppointments, patchTodo } from '../api/appointments-api'
import Auth from '../auth/Auth'
import { Appointment } from '../types/Appointment'

interface TodosProps {
  auth: Auth
  history: History
}

interface AppointmentsState {
  appointments: Appointment[]
  newAppointmentName: string
  loadingAppointments: boolean
}

export class Appointments extends React.PureComponent<TodosProps, AppointmentsState> {
  state: AppointmentsState = {
    appointments: [],
    newAppointmentName: '',
    loadingAppointments: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newAppointmentName: event.target.value })
  }

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/todos/${todoId}/edit`)
  }

  onAppointmentCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const dueDate = this.calculateDueDate()
      const newAppointment = await createAppointment(this.props.auth.getIdToken(), {
        name: this.state.newAppointmentName,
        appointmentDate: dueDate
      })
      console.log("----------newAppointment:",newAppointment)
      this.setState({
        appointments: [...this.state.appointments, newAppointment],
        newAppointmentName: ''
      })
    } catch {
      alert('Appointment creation failed')
    }
  }

  onAppointmentDelete = async (appointmentId: string) => {
    try {
      await deleteAppointment(this.props.auth.getIdToken(), appointmentId)
      this.setState({
        appointments: this.state.appointments.filter(appointment => appointment.appointmentId != appointmentId)
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  onTodoCheck = async (pos: number) => {
    try {
      const todo = this.state.appointments[pos]
      await patchTodo(this.props.auth.getIdToken(), todo.appointmentId, {
        name: todo.name,
        dueDate: todo.appointmentDate,
        done: !todo.done
      })
      this.setState({
        appointments: update(this.state.appointments, {
          [pos]: { done: { $set: !todo.done } }
        })
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const appointments = await getAppointments(this.props.auth.getIdToken())
      this.setState({
        appointments: appointments,
        loadingAppointments: false
      })
    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Appointments</Header>

        {this.renderCreateTodoInput()}

        {this.renderAppointments()}
      </div>
    )
  }

  renderCreateTodoInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New Appointment',
              onClick: this.onAppointmentCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderAppointments() {
    if (this.state.loadingAppointments) {
      return this.renderLoading()
    }

    return this.renderAppointmentsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Appointments
        </Loader>
      </Grid.Row>
    )
  }

  renderAppointmentsList() {
    return (
      <Grid padded>
        {this.state.appointments.map((appointment, pos) => {
          return (
            <Grid.Row key={appointment.appointmentId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onTodoCheck(pos)}
                  checked={appointment.done}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {appointment.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {appointment.appointmentDate}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(appointment.appointmentId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onAppointmentDelete(appointment.appointmentId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {appointment.attachmentUrl && (
                <Image src={appointment.attachmentUrl} size="small" wrapped />
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

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
