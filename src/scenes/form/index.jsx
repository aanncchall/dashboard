import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { WidthFull } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const Form = ({mngreload}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  var formValues = {};

  const handleFormSubmit = async (values) => {
    // values.preventDefault();
    console.log(values);
    formValues = values;
    console.log(formValues);
    try {
      const response = await axios.post('https://lokhand-server.onrender.com/api/data', formValues);
      console.log('Data saved:', response.data);
      // Clear the form or handle successful submission
      alert("Your Data is Saved Successfully");
      mngreload();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Create New Entry" subtitle="" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>TITLE</h2> 
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Insight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.insight}
                name="insight"
                error={!!touched.insight && !!errors.insight}
                helperText={touched.insight && errors.insight}
                sx={{ gridColumn: "span 2" }}
              />
              <h2 style={{ gridColumn: 'span 4', width: '100%' }}>Categories</h2>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sector"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sector}
                name="sector"
                error={!!touched.sector && !!errors.sector}
                helperText={touched.sector && errors.sector}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Topic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.topic}
                name="topic"
                error={!!touched.topic && !!errors.topic}
                helperText={touched.topic && errors.topic}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pestle"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pestle}
                name="pestle"
                error={!!touched.pestle && !!errors.pestle}
                helperText={touched.pestle && errors.pestle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Region"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.region}
                name="region"
                error={!!touched.region && !!errors.region}
                helperText={touched.region && errors.region}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 1" }}
              />
              <h2 style={{ gridColumn: 'span 4', width: '100%' }}>References</h2>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Source"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.source}
                name="source"
                error={!!touched.source && !!errors.source}
                helperText={touched.source && errors.source}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                error={!!touched.url && !!errors.url}
                helperText={touched.url && errors.url}
                sx={{ gridColumn: "span 2" }}
              />
              <h2 style={{ gridColumn: 'span 4', width: '100%' }}>Timings</h2>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Start Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.start_year}
                name="start_year"
                error={!!touched.start_year && !!errors.start_year}
                helperText={touched.start_year && errors.start_year}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="End Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.end_year}
                name="end_year"
                error={!!touched.end_year && !!errors.end_year}
                helperText={touched.end_year && errors.end_year}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Added Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.added_year}
                name="added_year"
                error={!!touched.added_year && !!errors.added_year}
                helperText={touched.added_year && errors.added_year}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Published Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.published_year}
                name="published_year"
                error={!!touched.published_year && !!errors.published_year}
                helperText={touched.published_year && errors.published_year}
                sx={{ gridColumn: "span 2" }}
              />
              <h2 style={{ gridColumn: 'span 4', width: '100%' }}>Impact</h2>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Intensity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.intensity}
                name="intensity"
                error={!!touched.intensity && !!errors.intensity}
                helperText={touched.intensity && errors.intensity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Relevance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.relevance}
                name="relevance"
                error={!!touched.relevance && !!errors.relevance}
                helperText={touched.relevance && errors.relevance}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Likelihood"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.likelihood}
                name="likelihood"
                error={!!touched.likelihood && !!errors.likelihood}
                helperText={touched.likelihood && errors.likelihood}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Impact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.impact}
                name="impact"
                error={!!touched.impact && !!errors.impact}
                helperText={touched.impact && errors.impact}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // title: yup.string().required("required"),
  // insight: yup.string().required("required"),
  // sector: yup.string().sector("invalid sector").required("required"),
  // topic: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // pestle: yup.string().required("required"),
  // region: yup.string().required("required"),
  // country: yup.string().required("required"),
});
const initialValues = {
  title: "",
  insight: "",
  sector: "",
  topic: "",
  pestle: "",
  region: "",
  country: "",
  source: "",
  url: "",
  start_year: "",
  end_year: "",
  added_year: "",
  published_year: "",
  intensity: Number,
  relevance: Number,
  likelihood: Number,
  impact: "",
};

export default Form;
