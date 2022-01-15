import React from 'react'
import './Tabs.css'
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
function Tabs() {

    const {t,i18n}=useTranslation();
    return (
        <div className="tabs">
            <Link to="/hospitals"><h4 className="data">{t("Beds")}</h4></Link>
            <Link to="/plasma"><h4 className="data">{t("Plasma")}</h4></Link>
            <Link to="rat"><h4 className="data">{t("Rapid Antigen Test Centres")}</h4></Link>
            <Link to="vaccination"><h4 className="data">{t("Vaccination Centers Near Me")}</h4></Link>
            <Link to="/ambulance"><h4 className="data">{t("Ambulance")}</h4></Link>

        </div>
    )
}

export default Tabs
