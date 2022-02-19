import axios from 'axios';

export const logout = async () =>
  await axios
    .post('/api/logout')
    .then(res => res.data)
    .catch(err => err.response.data);
