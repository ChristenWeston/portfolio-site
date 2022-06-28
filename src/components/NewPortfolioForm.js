import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from "react-redux-firebase"

function NewPortfolioForm(props){

  const firestore = useFirestore();

  function addPortfolioToFirestore(event) {
    event.preventDefault();
    props.onNewPortfolioCreation();

    return firestore.collection("portfolio").add(
      {
        name: event.target.name.value,
        projects: event.target.projects.value,
        skills: event.target.skills.value,
        bio: event.target.bio.value,
      }
    );
  }

  return (
    <React.Fragment>
        <div className="card shadow-lg h-100 text-left card body Font p-4 w-50 mx-auto" style={{backgroundColor: "white"}}>
          <h1 id="banner" className="headingFont" style={{backgroundColor: "#add8e6", color: "black"}}>Add a New Portfolio</h1>
          <hr />
          <ReusableForm 
            formSubmissionHandler={addPortfolioToFirestore}
            buttonText="Add Portfolio" />
        </div>
    </React.Fragment>
  );
}

NewPortfolioForm.propTypes = {
  onNewPortfolioCreation: PropTypes.func
};

export default NewPortfolioForm;