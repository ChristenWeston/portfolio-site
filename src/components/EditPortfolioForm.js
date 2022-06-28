import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";

function EditPortfolioForm (props) {
  const { portfolio } = props;
  const firestore = useFirestore();

  function handleEditPortfolioFormSubmission(event) {
    event.preventDefalut();
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
      <ReusableForm
      formSubmissionHandler={handleEditPortfolioFormSubmission}
      buttonText="Update Portfolio" />
    </React.Fragment>
  );
}

EditPortfolioForm.propTypes = {
  portfolio: PropTypes.object,
  onEditPortfolio: PropTypes.func
};

export default EditPortfolioForm;