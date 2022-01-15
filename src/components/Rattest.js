import React, { useState } from 'react'
import { db } from '../Firebase'
import { useAuth } from '../AuthContext'

function Rattest() {
  const [rat, setrat] = useState()
  const { currentuser } = useAuth()

  const addata = async () => {
    try {
      db.collection('hospitals').doc(currentuser.uid).update({
        rat: rat,
      })
      alert('💥Data updated Successfully💥')
    } catch (e) {
      alert('💥Something went wrong!! Please try adding all fields again💥')
    }
  }

  return (
    <div>
      <div className='dashhome'>
        <label className='fname'>Is RAT Facility Available?</label>
        <select
          value={rat}
          onChange={(e) => setrat(e.target.value)}
          className='inptext'
        >
          <option>Select</option>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>

        <input
          type='submit'
          onClick={addata}
          className='subbtn2'
          value='Submit'
        />
      </div>
    </div>
  )
}

export default Rattest
