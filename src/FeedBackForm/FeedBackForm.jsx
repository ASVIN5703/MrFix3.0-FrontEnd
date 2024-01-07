import React from 'react'
import './FeedBackForm.css'

function FeedBackForm() {
  return (
    <>
    <h2 className='feedback-form-head'>Feed Back</h2>
    <div className='feedback-form'>
        <input type="text" required placeholder='e-mail'/>
        <textarea name="" id="" cols="30" rows="5" required placeholder='your feedback...'></textarea>
        <button>submit</button>
    </div>
    
    </>
  )
}

export default FeedBackForm