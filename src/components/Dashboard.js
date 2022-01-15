import React ,{useEffect, useState}from 'react'
import { useHistory } from 'react-router';
import {auth} from '../Firebase';
import './Dashboard.css'
import Sidebar from './Sidebar'
import DashHome from './DashHome';
import Beds from './Beds';
import PlasmaD from './PlasmaD';
import { useAuth } from '../AuthContext';
import Address from './Address';
import Rattest from './Rattest';
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom';
import Ambulance from './Ambulance';



function Dashboard() {

    const [user,setuser]=useState();

    const getuser=async()=>{
        const users=auth.currentUser;
        setuser(users);
    }

    useEffect(()=>{
        getuser();

    },[])

    const history=useHistory();
    const logout = () => {
        auth.signOut();
        history.push("/");
        
      };
    return (
        <Router>
            <Switch>
        <div className="dash">
            <div className="sdbar">
                <Sidebar></Sidebar>
            </div>

            <Route exact path="/dashboard">
                <DashHome></DashHome>

            </Route>

            <Route exact path="/address">
                
                <Address></Address>

            </Route>

            <Route exact path="/beds">
                
                <Beds></Beds>

            </Route>

            <Route exact path="/rattest">
                
              <Rattest></Rattest>

            </Route>

            <Route exact path="/plasma">
                
                <PlasmaD></PlasmaD>

            </Route>

            <Route exact path="/ambulance">
                
                <Ambulance></Ambulance>

            </Route>
            
           
        </div>
        </Switch>
        </Router>
    )
}

export default Dashboard ;
