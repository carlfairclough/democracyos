import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest'

export const UsersList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='username' />
      <TextField source='name' />
      <TextField source='email' />
    </Datagrid>
  </List>
)
