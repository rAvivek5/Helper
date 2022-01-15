// https://helper-a77d7.web.app/

import './App.css'
import Navbar from './Navbar'
import Tabs from './Tabs'
import Search from './Search'
import Developer from './Developer'
import Hospitaldata from './Hospital'
import Searchplasma from './Searchplasma'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Searchrat from './Searchrat'
import Searchambulance from './Searchambulance'
import Searchhelp from './Searchhelp'
import Home from './Home'
import Signup from './Signup'
import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Login from './Login'
import Vaccinations from './Vaccinations'
import { withTranslation } from 'react-i18next'
import { AuthProvider } from './AuthContext'

function App() {
  const [isloggedin, setloggedin] = useState(true)
  return (
    <AuthProvider>
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>

            <Route exact path='/login'>
              <Login></Login>
            </Route>

            <Route exact path='/signup'>
              <Signup></Signup>
            </Route>

            <Route exact path='/dashboard'>
              <Dashboard></Dashboard>
            </Route>

            <Route exact path='/Hospitals'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Hospitaldata></Hospitaldata>
            </Route>

            <Route exact path='/plasma'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Searchplasma></Searchplasma>
            </Route>

            <Route exact path='/rat'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Searchrat></Searchrat>
            </Route>

            <Route exact path='/vaccination'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Vaccinations></Vaccinations>
            </Route>

            <Route exact path='/ambulance'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Searchambulance></Searchambulance>
            </Route>

            <Route exact path='/help'>
              <Navbar></Navbar>
              <Tabs></Tabs>
              <Searchhelp></Searchhelp>
            </Route>
            
            <Route exact path='/developer'>
              <Developer></Developer>
            </Route>

          </Switch>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
