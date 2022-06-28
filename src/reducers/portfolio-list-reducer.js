import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { id } = action;

  switch (action.type) {
    case c.DELETE_PORTFOLIO:
      let newState = {...state };
      delete newState[id];
      return newState;

      // case c.UPDATE_TIME:
      //   const newPortfolio = Object.assign({}, state[id]);
      //   const updatedState = Object.assign({}, state, {
      //     [id]: newPortfolio
      //   });
      //   return updatedState;
      default:
        return state;
  }
};