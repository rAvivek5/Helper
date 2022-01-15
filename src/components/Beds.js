import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { db } from '../Firebase'
import firebase from '@firebase/app'

import './Beds.css'

function Beds() {
  const getdata = async () => {
    db.collection('hospitals')
      .where('uid', '==', currentuser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          setoxy(element.data().oxy)
          setnonoxy(element.data().withoutoxy)

          settwithoxy(element.data().twithoxy)
          settwithoutoxy(element.data().twithoutoxy)

          seticuventi(element.data().icuventi)
          seticunonventi(element.data().icunonventi)

          setticuventi(element.data().ticuventi)
          setticunonventi(element.data().ticunonventi)
        })
      })
  }

  useEffect(() => {
    getdata()
  }, [])

  const { currentuser } = useAuth()

  const [oxy, setoxy] = useState()
  const [nonoxy, setnonoxy] = useState()

  const [twithoxy, settwithoxy] = useState()
  const [twithoutoxy, settwithoutoxy] = useState()

  const [icuventi, seticuventi] = useState()
  const [icunonventi, seticunonventi] = useState()

  const [ticuventi, setticuventi] = useState()
  const [ticunonventi, setticunonventi] = useState()

  const [foxy, fsetoxy] = useState()
  const [fnonoxy, fsetnonoxy] = useState()

  const [ftwithoxy, fsettwithoxy] = useState()
  const [ftwithoutoxy, fsettwithoutoxy] = useState()

  const [ficuventi, fseticuventi] = useState()
  const [ficunonventi, fseticunonventi] = useState()

  const [fticuventi, fsetticuventi] = useState()
  const [fticunonventi, fsetticunonventi] = useState()

  const setavailability = async () => {
    console.log(foxy)
    console.log(fnonoxy)
    console.log(ftwithoxy)
    console.log(ftwithoutoxy)
    console.log(ficuventi)
    console.log(ficunonventi)
    console.log(fticuventi)
    console.log(fticunonventi)

    try {
      await db
        .collection('hospitals')
        .doc(currentuser.uid)
        .update({
          oxy: foxy === undefined ? oxy : foxy,
          withoutoxy: fnonoxy === undefined ? nonoxy : fnonoxy,
          twithoxy: ftwithoxy === undefined ? twithoxy : ftwithoxy,
          twithoutoxy: ftwithoutoxy === undefined ? twithoutoxy : ftwithoutoxy,
          icuventi: ficuventi === undefined ? icuventi : ficuventi,
          icunonventi: ficunonventi === undefined ? icunonventi : ficunonventi,
          ticuventi: fticuventi === undefined ? ticuventi : fticuventi,
          ticunonventi:
            fticunonventi === undefined ? ticunonventi : fticunonventi,
          time: firebase.firestore.Timestamp.now().toDate().toString(),
        })

      alert('💥Data updated Successfully💥')
    } catch (e) {
      alert('💥Something went wrong!! Please try adding all fields again💥')
    }
  }

  return (
    <div className='scroll'>
      <div className='dashhome'>
        <label className='fname'>Enter Total Oxygen Beds</label>
        <input
          type='text'
          className='inptext'
          value={ftwithoxy}
          onChange={(e) => fsettwithoxy(e.target.value)}
          placeholder={twithoxy}
          name='a'
        />

        <label className='fname'>Enter Oxygen Beds Available</label>
        <input
          type='text'
          className='inptext'
          value={foxy}
          onChange={(e) => fsetoxy(e.target.value)}
          placeholder={oxy}
        />

        <label className='fname'>Enter Total Non-Oxygen Beds Available</label>
        <input
          type='text'
          className='inptext'
          value={ftwithoutoxy}
          onChange={(e) => fsettwithoutoxy(e.target.value)}
          placeholder={twithoutoxy}
        />

        <label className='fname'>Enter Non-Oxygen Beds Available</label>
        <input
          type='text'
          className='inptext'
          value={fnonoxy}
          onChange={(e) => fsetnonoxy(e.target.value)}
          placeholder={nonoxy}
        />

        <label className='fname'>Enter Total ICU With Ventilators</label>
        <input
          type='text'
          className='inptext'
          value={fticuventi}
          onChange={(e) => fsetticuventi(e.target.value)}
          placeholder={ticuventi}
        />

        <label className='fname'>ICU With Ventilators Available</label>
        <input
          type='text'
          className='inptext'
          value={ficuventi}
          onChange={(e) => fseticuventi(e.target.value)}
          placeholder={icuventi}
        />

        <label className='fname'>Enter Total ICU Without Ventilators</label>
        <input
          type='text'
          className='inptext'
          value={fticunonventi}
          onChange={(e) => fsetticunonventi(e.target.value)}
          placeholder={ticunonventi}
        />

        <label className='fname'>Total ICU Without Ventilators Available</label>
        <input
          type='text'
          className='inptext'
          value={ficunonventi}
          onChange={(e) => fseticunonventi(e.target.value)}
          placeholder={icunonventi}
        />

        <input
          type='submit'
          onClick={setavailability}
          className='subbtn'
          value='Submit'
        />
      </div>
    </div>
  )
}

export default Beds
