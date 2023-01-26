import axios from 'axios';

const getGeoJson = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/map`,
    method: 'get',
  })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export default getGeoJson;
