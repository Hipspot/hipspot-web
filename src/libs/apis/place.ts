import axios from 'axios';
import { CafeInfo } from '@libs/types/cafe';

export const getCafeData = async (id: number) => (await axios.get<CafeInfo>(`http://52.198.121.54/place/${id}`)).data;
