import { PlaceInfo } from '@libs/types/place';
import axios from 'axios';

export const getPlaceInfo = async (id: number) => (await axios.get<PlaceInfo>(`http://52.198.121.54/place/${id}`)).data;
