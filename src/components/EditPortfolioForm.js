import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";

function EditPortfolioForm (props) {
  const { portfolio } = props;
  const firestore = useFirestore();

  function handleEditPortfolioFormSubmission(event) {
    event.preventDefault();
    props.onEditPortfolio();
    const propertiesToUpdate = {
      name: event.target.name.value,
      projects: event.target.projects.value,
      skills: event.target.skills.value,
      bio: event.target.bio.value
    }
    return firestore.update({collection: 'portfolio', doc: portfolio.id}, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <div className="card shadow-lg h-100 text-left card bodyFont p-4 w-50 mx-auto" style={{backgroundColor: "white"}}><h1 id="banner" className="headingFont" style={{backgroundColor: "#add8e6", color: "black"}}>Edit This Portfolio</h1>
      <hr />
        <ReusableForm
        formSubmissionHandler={handleEditPortfolioFormSubmission}
        buttonText="Update Portfolio" />
      </div>
    </React.Fragment>
  );
}

EditPortfolioForm.propTypes = {
  portfolio: PropTypes.object,
  onEditPortfolio: PropTypes.func
};

export default EditPortfolioForm;