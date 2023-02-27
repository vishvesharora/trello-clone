import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import { useFormik } from 'formik';
import * as yup from 'yup';


const Card = (props) => {
  const [card, setCard] = useState(props.card)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.setSubmitting(false);
    formik.resetForm({
        values:{
            title:card.title,
            desc:card.description
        }
    })
  };

  const submit = async (val)=>{
        const response = await fetch(`http://localhost:5000/api/card/${card.id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({title:val.title,description:val.desc})
        });
        const data = await response.json();
        setCard({
            ...card,
            title: val.title,
            description: val.desc
        });       
  } 

  const validationSchema = yup.object({
    title: yup
      .string()
      .required('Title is required'),
    desc: yup
      .string()
      .min(5, 'Description should have atleast 5 characters')
      .required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: card.title,
      desc: card.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values,actions) => {
      setOpen(false);
      submit(values);
    //   actions.resetForm({values:''});
      actions.setSubmitting(false);
    },
  });
 
   return <div>
    <button type="button" className='list-group-item list-group-item-action list-group-item-primary' onClick={handleClickOpen}>{card.title}</button>
    <Dialog open={open} >
      <DialogTitle>{"Edit Card"}</DialogTitle>
      <DialogContent>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        margin = "normal"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur = {formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        id="desc"
        name="desc"
        label="Description"
        multiline= {true}
        margin = "normal"
        rows = {3}
        value={formik.values.desc}
        onChange={formik.handleChange}
        onBlur = {formik.handleBlur}
        error={formik.touched.desc && Boolean(formik.errors.desc)}
        helperText={formik.touched.desc && formik.errors.desc}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  </div>
    
}

export default Card