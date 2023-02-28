import axios from 'axios';

const getGeoJson = async () => {
  try {
    const response = await axios.get('https://api.hipspot.xyz/map');
    return response.data;
  } catch (error) {
    throw Error('Error get getGeoJson');
  }
};

export default getGeoJson;
