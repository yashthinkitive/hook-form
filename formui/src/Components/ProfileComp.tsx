import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import ProfileImage from "../../src/assets/images/profile.jpg"



const ProfileComp: React.FC = () => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item >
        <Avatar alt="Carson Miller" src={ProfileImage} sx={{ width: 80, height: 80 }}  /> 
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{color:'black',fontSize:'1.6rem',fontWeight:"bold"}}>
          Carson Miller - Add New Episode Of Care
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ProfileComp;
