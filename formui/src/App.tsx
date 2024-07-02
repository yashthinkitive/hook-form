import React from "react"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Typography,Box } from '@mui/material';
import "./App.css";
import ProfileComp from "./Components/ProfileComp";
import FormComponent from "./Components/FormComponent";

const App: React.FC = () => {
  return (
    <>
     <Box sx={{ padding: '1rem', backgroundColor: 'white' }}>
      <Grid container alignItems="center" spacing={2} sx={{ color: 'grey' }}>
        <Grid item>
          <ArrowBackIcon sx={{ fontSize: '1.5rem', cursor: 'pointer' }} /> 
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: '1rem', cursor: 'pointer' }}>
            Back to Episode of Care List
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '2rem' }}>
        <ProfileComp />
      </Box>
    </Box>


    <Grid container> 

      <Grid lg={6}>
      <FormComponent/>
      </Grid>
    </Grid>



    </>
  );
}

export default App;

