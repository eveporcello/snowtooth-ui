import React from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      id
      name
      status
      capacity
      trailAccess {
        id
        name
      }
    }
  }
`

const LIFT_STATUS_MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!){
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`

const App = () =>
  <Query query={ALL_LIFTS_QUERY}>
    {({ loading, data }) =>
      <Container>
        {!loading && data.allLifts.map(lift =>
          <Row key={lift.id}>
            <h3>{lift.name}</h3>
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus =>
                <Button
                  selected={lift.status === "OPEN"}
                  color="green"
                  onClick={() => changeStatus({ variables: { id: lift.id, status: "OPEN" } })}
                />
              }
            </Mutation>
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus =>
                <Button
                  selected={lift.status === "HOLD"}
                  color="yellow"
                  onClick={() => changeStatus({ variables: { id: lift.id, status: "HOLD" } })}
                />
              }
            </Mutation>
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus =>
                <Button
                  selected={lift.status === "CLOSED"}
                  color="red"
                  onClick={() => changeStatus({ variables: { id: lift.id, status: "CLOSED" } })}
                />
              }
            </Mutation>
            <h3>Trails</h3>
            <ul>
              {lift.trailAccess.map(trail =>
                <li key={trail.id}>{trail.name}</li>
              )}
            </ul>
          </Row>
        )
        }
      </Container>
    }
  </Query>

const Button = styled.div`
    border-radius: 50%;
    background-color: ${props => props.selected ? props.color : "none"};
    border: ${props => props.selected ? "none" : `solid 2px ${props.color}`}
    width: 30px;
    height: 30px;
`
const Row = styled.div`
    display: flex;
    width: 600px
    justify-content: space-around;
    flex-direction: row;
`

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
`

export default App