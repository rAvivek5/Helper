import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HotelIcon from '@mui/icons-material/Hotel';
import Hotel from '@mui/icons-material/Hotel';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { auth } from '../Firebase';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

export const Sidebardata = [
  {
    title: 'Home',
    link: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'Address',
    link: '/address',
    icon: <BusinessIcon />,
  
  },
  {
    title: 'Bed Availability',
    link: '/beds',
    icon: <HotelIcon />,
    
  },
  {
    title: 'Plasma',
    link: '/plasma',
    icon: <BloodtypeIcon />,
   
  },
  {
    title: 'RAT Test ',
    link: '/rattest',
    icon: <RemoveModeratorIcon />,
    
  },
  {
    title: 'Ambulance',
    link: '/ambulance',
    icon: <AccessibleForwardIcon />,
    
  },


 
];