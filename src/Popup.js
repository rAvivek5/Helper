import React,{useState} from 'react'
import './Popup.css'
import { db } from './Firebase';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {

    const {t}=useTranslation();
    const [reason,setreason]=useState();
    const [ph,setph]=useState();

    const submitissue=async()=>{


        var data={
            hosname:props.hospitalname,
            hosaddress:props.address,
            hosphoneno:props.phoneno,
            issue:reason,
            rphoneno:ph
        }
        

        try{
        await db.collection("issues")
        .doc(props.hospitalname)
        .collection("issue")
        .doc()
        .set({
            issues:data
        }
        ,{merge:false})

        alert("Issue submitted Successfully");
        props.strig(false);


    }
    catch(e){
        alert(e.message);
    }

    }

    return (props.trigger)?(
        <div className="popup">
            <div>
                <CloseIcon className="cancel" onClick={()=>props.strig(false)} ></CloseIcon>
                </div>
                <h2 className="namee">{props.hospitalname}</h2>
                <h2 className="name2">{props.phoneno}</h2>
                <h3 className="name2">{props.address.toUpperCase()}</h3>
                <hr className="tag1"/>

                <label className="fname1" >{t("Enter Your Phone Number")}</label>
                <br/>
                <input type="text" value={ph} onChange={(e)=>setph(e.target.value)} className="inptext11"  placeholder={t("Enter Your Phone Number")}/>
                <br/>

                <label className="fname1">{t("Select Reason")}</label>
                <br/>
    <select  value={reason} onChange={(e)=>setreason(e.target.value)} className="inptext11"  >
        <option >{t("Select Reason")}</option>
        <option value="data incorrect">{t("Data Incorrect")}</option>
        <option value="address incorrect">{t("Address Incorrect")}</option>
        <option value="phoneno invalid">{t("Phone Number Invalid")}</option>
        

        </select>


                <h3 className="errorsub" onClick={submitissue} >{t("Submit")}</h3>


                
            </div>
            
    ):null;
}

export default Popup
