import React, { useEffect} from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import { config } from './config';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Incomeedit() {
    const notify = () => toast.success('Income edited successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    let navigate=useNavigate();
    let params=useParams();
    useEffect(()=>{
        fetchdata();
        
      },[])
      let fetchdata=async()=>{
        let a=await axios.get(`${config.api}/portal/income/${params.id}`, {
            headers: {
              //'authorization': `${localStorage.getItem('react_app_token')}`
              'authorization':`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
          });
        formik.setValues(a.data)
      }
    let formik=useFormik({
        initialValues:{
            title:"",
            description:"",
            dateandtime:"",
            catagory:"",
            divisions:"",
            amount:""
        },
        validate:(values)=>{
            let errors={}
            if(!values.title){
                errors.title="please enter the product title"
            }
            if(!values.description){
                errors.description="please enter the description"
            }
             if(!values.dateandtime){
                errors.dateandtime="please enter the date and time "
            }
             if(!values.catagory){
                errors.catagory="please enter the catagory"
            }
            if(!values.divisions){
                errors.divisions="please enter the divisions"
            }
            if(!values.amount){
                errors.amount="please enter the amount"
            }
            return errors;
        },
        onSubmit:async (values)=>{
            try {
                delete values._id;
                await axios.put(`${config.api}/portal/income/edit/${params.id}`, values, {
                    headers: {
                     // 'authorization': `${localStorage.getItem('react_app_token')}`
                     'authorization':`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
                    }
                  });
                  navigate("/portal/incomelist")
            } catch (error) {
                console.log(error);
            }
        }
    });
  return (
    <>
    <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='container'>
    <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className='row'>
            <h1>Edit Income</h1>
            <div className='col-lg-10'>
                <label>Title:</label>
                <input type="text" className='form-control' name="title" onChange={formik.handleChange} value={formik.values.title}></input>
            </div>
            {
                formik.errors.title ? <span>{formik.errors.title}</span> : null
            }
            <div className='col-lg-10'>
                <label>Description:</label>
                <input type="text" className='form-control' name="description" onChange={formik.handleChange} value={formik.values.description}></input>
            </div>
            {
                formik.errors.description ? <span>{formik.errors.description}</span> : null
            }
            
            <div className='col-lg-10'>
                <label>Date and Time:</label>
                <input type="datetime-local" className='form-control' name="dateandtime" onChange={formik.handleChange} value={formik.values.dateandtime}></input>
            </div>
            {
                formik.errors.dateandtime ? <span>{formik.errors.dateandtime}</span> : null
            }
            <div className='col-lg-10'>
                <label>Catagory:</label>
                <input type="text" className='form-control' name="catagory" onChange={formik.handleChange} value={formik.values.catagory}></input>
            </div>
            {
                formik.errors.catagory ? <span>{formik.errors.catagory}</span> : null
            }
            <div className='col-lg-10'>
                <label>Divisions:</label>
                <select className='form-control' name='divisions' onChange={formik.handleChange} value={formik.values.divisions}>
                    <option value="Nah">select any one division</option>
                    <option value="Office">Office</option>
                    <option value="Personal">Personal</option>
                
                </select>
            </div>
            {
                formik.errors.divisions ? <span>{formik.errors.divisions}</span> : null
            }
            <div className='col-lg-10'>
                <label>Amount:</label>
                <input type="number" className='form-control' name="amount" onChange={formik.handleChange} value={formik.values.amount}></input>
            </div>
            {
                formik.errors.amount ? <span>{formik.errors.amount}</span> : null
            }
            <div className='col-lg-10'>
                <input type="submit" value="submit" className='btn btn-primary mt-2' disabled={!formik.isValid} onClick={notify}></input>
            </div>
        </div>
    </form>
</div>
    </>
  )
  
}

export default Incomeedit