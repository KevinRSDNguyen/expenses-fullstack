import axios from 'axios';

export const fetchUser = () => {
  return (dispatch) => {
    axios.get('/api/current_user')
      .then(({ data }) => {
        dispatch({ type: 'FETCH_USER', payload: data });
      });
  };
};