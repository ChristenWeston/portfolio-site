import React from 'react';
import NewPortfolioForm from './NewPortfolioForm';
import PortfolioList from './PortfolioList';
import EditPortfolioForm from './EditPortfolioForm';
import PortfolioDetail from './PortfolioDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from "react-redux-firebase";

class PortfolioControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPortfolio: null,
      editing: false
    };
  }

  componentDidMount() {
    // this.waitTimeUpdateTimer = setInterval(() =>
    // this.updatePortfolioElapsedWaitTime(),
    // 60000
    // );
  }

  componentWillUnmount() {
    console.log("Component unmounted");
  }

  // No ElapsedWaitTime function

  handleClick = () => {
    if (this.state.selectedPortfolio != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedPortfolio: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewPortfolioToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

handleChangingSelectedPortfolio = (id) => {
  this.props.firestore.get({collection: 'portfolio', doc: id}).then((portfolio) => {
    const firestorePortfolio = {
      name: portfolio.get("name"),
      projects: portfolio.get("projects"),
      skills: portfolio.get("skills"),
      bio: portfolio.get("bio"),
      id: portfolio.id
    }
    this.setState({selectedPortfolio: firestorePortfolio });
  });
}

handleDeletingPortfolio = (id) => {
  this.props.firestore.delete({collection: 'portfolio', doc: id});
  this.setState({selectedPortfolio: null});
}

handleEditClick = () => {
  this.setState({editing: true});
}

handleEditingPortfolioInList = () => {
  this.setState({
    editing: false,
    selectedPortfolio: null
  });
}

render(){
  let currentlyVisibleState = null;
  let buttonText = null;

    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      console.log("current user: " + auth.currentUser);
      return (
        <React.Fragment>
          <h1>You must be signed in to access the portfolios.</h1>
        </React.Fragment>
      )
    }

    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      console.log("Current user: " + auth.currentUser);
      if (this.state.editing) {
        currentlyVisibleState = <EditPortfolioForm portfolio = {this.state.selectedPortfolio}
        onEditPortfolio = {this.handleEditingPortfolioInList} />
        buttonText = "Return to Portfolio List";
      } else if (this.state.selectedPortfolio != null) {
        currentlyVisibleState = 
        <PortfolioDetail 
        portfolio ={this.state.selectedPortfolio}
        onClickingDelete ={this.handleDeletingPortfolio}
        onClickingEdit ={this.handleEditClick} />
        buttonText = "Return to Portfolio List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewPortfolioForm onNewPortfolioCreation={this.handleAddingNewPortfolioToList} />;
        buttonText = "Return to Portfolio List";
      } else {
        currentlyVisibleState = <PortfolioList portfolioList = {this.props.mainPortfolioList} onPortfolioSelection={this.handleChangingSelectedPortfolio} />;
        buttonText = "Add Portfolio";
      }

      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
}

PortfolioControl.propTypes = {
  mainPortfolioList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainPortfolioList: state.mainPortfolioList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

PortfolioControl = connect(mapStateToProps)(PortfolioControl);
export default withFirestore(PortfolioControl);