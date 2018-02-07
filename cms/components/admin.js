import React from 'react'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
import { Admin, Resource, Delete } from 'admin-on-rest'
import RestClient from '../../client/rest-client'
import CustomRoutes from '../../client/custom-routes'
import Dashboard from './dashboard'
import Navbar from './navbar'
import { PostList, PostCreate, PostEdit } from './posts'

export default () => (
  <Admin menu={Navbar} title='Democracy OS' restClient={RestClient} customRoutes={CustomRoutes} history={history} locale={"es"} >
    <Resource name='posts' list={PostList} create={PostCreate} edit={PostEdit} remove={Delete} />
    <Resource name='settings' list={PostList} />
    <Resource name='reaction-rule' list={PostList} />
    <Resource name='users' list={PostList} />
  </Admin>
)
