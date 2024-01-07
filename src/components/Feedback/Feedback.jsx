import React from "react";
import FeedbackItem from "../FeedbackItem/FeedbackItem";
import './Feedback.css'

const Feedback = () => {
  return (
    <div className="feedback-page">
      <h1 className="page-head">Feedback</h1>
      <FeedbackItem />
      <FeedbackItem />
    </div>
  );
};

export default Feedback;
