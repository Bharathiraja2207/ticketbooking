import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

export function AddTheatre() {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      id: "",
      name: "",
      show_1: "",
      show_2: "",
    },
    onSubmit: (values) => {
      console.log("form value", values);
      addTheatre(values);
      navigate("/booking");
    }
  });
  const addTheatre = (values) => {
    fetch("https://64113a2a2e340b45b13f4ed5.mockapi.io/theatre",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "applicaation/json"
        }
      });
  };
  return (
    <div className="addtheatre">
      <form  className="addtheatre" onSubmit={handleSubmit}>
        <TextField name="id"
          fullWidth sx={{ m: 1 }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.id}
          id="outlined-basic"
          label="id"
          variant="standard"></TextField>
        <TextField name="name"
          fullWidth sx={{ m: 1 }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          id="outlined-basic"
          label="theatre name"
          variant="standard"></TextField>
        <TextField name="morningshow"
          fullWidth sx={{ m: 1 }}
          id="outlined-basic"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.morningshow}
          label="show_1"
          variant="standard"></TextField>
        <TextField name="afternoonshow"
          fullWidth sx={{ m: 1 }}
          id="outlined-basic"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.afternoonshow}
          label="show_2"
          variant="standard"></TextField>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}