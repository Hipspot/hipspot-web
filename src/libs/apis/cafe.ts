import { CafeInfo } from '@libs/types/cafe';
import axios from 'axios';

export const getCafeInfo = async (id: number) => (await axios.get<CafeInfo>(`http://52.198.121.54/place/${id}`)).data;
