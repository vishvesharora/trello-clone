import React, { useState } from 'react';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import { useFormik } from 'formik';
import * as yup from 'yup';


const AddBoard = (props) =>{
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm({values:''});
    formik.setSubmitting(false);
  };

  const submit = async (val)=>{
        const response = await fetch(`http://localhost:5000/api/board/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:val.name})
        });
        const data = await response.json();
        await props.set(old => old.concat(data.board));        
  } 

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values,actions) => {
      handleClose();
      submit(values);
      actions.resetForm({values:''});
      actions.setSubmitting(false);
    },
  });
 
   return <div>
    <button type="button" className="btn btn-dark mx-2 text-nowrap" onClick={handleClickOpen} >Add Board</button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Add new Board"}</DialogTitle>
      <DialogContent>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        margin = "normal"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur = {formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  </div>
}


export default AddBoard