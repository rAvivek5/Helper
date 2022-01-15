import React,{useContext,useState,useEffect, Children} from 'react'
import { auth } from './Firebase';


const AuthContext=React.createContext();

export function useAuth(){

    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentuser,setcurrentuser]=useState();
    const [loading,setloading]=useState(true);

    function signup(email,password){
       return auth.createUserWithEmailAndPassword(email,password)

    }

    function login(email,password){

        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
      const unsubscribe=auth.onAuthStateChanged(user=>{
            setcurrentuser(user);
            setloading(false);
        });
        return unsubscribe;
    }, [])
    

    const value={
        currentuser,
        signup,
        login

    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

