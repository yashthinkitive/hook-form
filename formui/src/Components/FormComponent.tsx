import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button, Paper, Snackbar } from "@mui/material";

import CustomTextField from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";

const schema = yup.object().shape({
  episodeTitle: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z\s]*$/, "Must contain only letters")
    .required("Episode title is required"),
  placeOfResidence: yup.string().required("Place of residence is required"),
  basicStartDate: yup
    .date()
    .nullable()
    .required("Start date is required"),
   
  basicEndDate: yup
    .date()
    .nullable()
    .required("End date is required")
  
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { basicStartDate } = this.parent;
        return value && basicStartDate ? value > basicStartDate : true;
      }
    ),
  medicalRecordNumber: yup
    .number()
    .required("Medical record number is required"),
  playerName: yup
    .string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Player name must contain only letters and spaces"
    )
    .required("Player name is required"),
  playerType: yup.string().required("Player type is required"),
  playerStartDate: yup
    .date()
    .nullable()
    .required("Start date is required")

    ,
  playerEndDate: yup
    .date()
    .nullable()
    .required("End date is required")

    .test(
      "is-after-player-start",
      "End date must be after start date",
      function (value) {
        const { playerStartDate } = this.parent;
        return value && playerStartDate ? value > playerStartDate : true;
      }
    ),
});

const FormComponent: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (data: any) => {
    console.log("Submitted data: ", data);

    try {
      const startDate = new Date(data.basicStartDate);
      const endDate = new Date(data.basicEndDate);
      const playerStartDate = new Date(data.playerStartDate);
      const playerEndDate = new Date(data.playerEndDate);

      if (
        !isNaN(startDate.getTime()) &&
        !isNaN(endDate.getTime()) &&
        !isNaN(playerStartDate.getTime()) &&
        !isNaN(playerEndDate.getTime())
      ) {
        const isValid = await methods.trigger();

        if (isValid) {
          setSnackbarMessage("Saved successfully");
        } else {
          setSnackbarMessage("Please check the fields");
        }
      } else {
        setSnackbarMessage("Invalid dates entered");
      }
    } catch (error) {
      console.error("Form validation error:", error);
      setSnackbarMessage("Error validating form");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              elevation={6}
              sx={{ padding: 2, marginBottom: 2, width: "100%" }}
            >
              <h2>Add Basic Details</h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="episodeTitle"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        control={methods.control}
                        label="Episode Title"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="placeOfResidence"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        label="Place Of Residence"
                        options={[
                          { value: "Admission", label: "Admission" },
                          { value: "Quarter", label: "Quarter" },
                          { value: "Incident", label: "Incident" },
                        ]}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="basicStartDate"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} label="Start Date" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="basicEndDate"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} label="End Date" />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="medicalRecordNumber"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label="Medical Record Number"
                        type="number"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
              <h2>Add Player Details</h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="playerType"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        label="Player Type"
                        options={[
                          {
                            value: "Managed Care Part A",
                            label: "Managed Care Part A",
                          },
                          {
                            value: "Managed Care Part B",
                            label: "Managed Care Part B",
                          },
                        ]}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="playerName"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomTextField {...field} label="Player Name" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="playerStartDate"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} label="Start Date" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="playerEndDate"
                    control={methods.control}
                    render={({ field }) => (
                      <CustomDatePicker {...field} label="End Date" />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                color: "black",
                background: "white",
                borderRadius: "20px",
                marginRight: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                background: "#651fff",
                borderRadius: "20px",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      </form>
    </FormProvider>
  );
};

export default FormComponent;
