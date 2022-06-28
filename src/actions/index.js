import * as c from './../actions/ActionTypes';

export const deletePortfolio = id => ({
  type: c.DELETE_PORTFOLIO,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

// export const updateTime = (id, formattedWaitTime) => ({
//   type: c.UPDATE_TIME,
//   id: id,
//   formattedWaitTime: formattedWaitTime
// });