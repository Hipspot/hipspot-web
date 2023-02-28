import axios from 'axios';

const getGeoJson = async () => {
  try {
    const response = await axios.get('/map');
    return response.data;
  } catch (error) {
    throw Error('Error get getGeoJson');
  }
};

export default getGeoJson;
