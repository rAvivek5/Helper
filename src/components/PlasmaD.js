import React from 'react'
import './PlasmaD.css'
import {useAuth} from '../AuthContext';
import {db} from '../Firebase';
import firebase from '@firebase/app';
import {useEffect,useState} from 'react';

function PlasmaD() {


    const {currentuser}=useAuth();
    const[ap,setap]=useState();
    const[an,setan]=useState();
    const[abp,setabp]=useState();
    const[abn,setabn]=useState();
    const[op,setop]=useState();
    const[on,seton]=useState();


    const[fap,fsetap]=useState();
    const[fan,fsetan]=useState();
    const[fabp,fsetabp]=useState();
    const[fabn,fsetabn]=useState();
    const[fop,fsetop]=useState();
    const[fon,fseton]=useState();


    const adddata=async()=>{

        try{
            db.collection("hospitals")
            .doc(currentuser.uid)
            .update({
                apositive:fap===undefined?ap:fap,
                anegative:fan===undefined?an:fan,
                abpositive:fabp===undefined?abp:fabp,
                abnegative:fabn===undefined?abn:fabn,
                opositive:fop===undefined?op:fop,
                onegative:fon===undefined?on:fon,
                time1:firebase.firestore.Timestamp.now().toDate().toString()
              

            })

            alert('💥Data updated Successfully💥')
        } catch (e) {
          alert('💥Something went wrong!! Please try adding all fields again💥')
        }

    }


    const getdata=async()=>{

        db.collection("hospitals")
        .where("uid",'==',currentuser.uid)
        .get()
        .then((snapshot)=>{
            snapshot.forEach(element => {
                setap(element.data().apositive);
                setan(element.data().anegative);
                setabp(element.data().abpositive);
                setabn(element.data().abnegative);
                setop(element.data().opositive);
                seton(element.data().onegative);



            });
        })
            
    }

    useEffect(() => {
       
        getdata();
    }, [])

    return (




<div className="scroll">

<div className="dashhome">
    <label className="fname">A+ Availability</label>
    <input type="text"  className="inptext"  value={fap} onChange={(e)=>fsetap(e.target.value)} placeholder={ap}/>

    <label className="fname">A- Availability</label>
    <input type="text"  className="inptext" value={fan} onChange={(e)=>fsetan(e.target.value)} placeholder={an} />

     <label className="fname">AB+ Availability</label>
    <input type="text"  className="inptext" value={fabp} onChange={(e)=>fsetabp(e.target.value)} placeholder={abp}  />
    
    <label className="fname">AB- Availability</label>
    <input type="text"  className="inptext" value={fabn} onChange={(e)=>fsetabn(e.target.value)} placeholder={abn}/>
    
    
    <label className="fname">O+ Availability</label>
    <input type="text"  className="inptext" value={fop} onChange={(e)=>fsetop(e.target.value)} placeholder={op} />
    
    <label className="fname">O- Availability</label>
    <input type="text"  className="inptext" value={fon} onChange={(e)=>fseton(e.target.value)} placeholder={on}/>

    <input type="submit" onClick={adddata}  className="subbtn" value="Submit"/>
    
   
    </div>
    </div>
    )
}

export default PlasmaD
