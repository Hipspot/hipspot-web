import { CafeInfo } from '@libs/types/cafe';
import axios from 'axios';

export const getCafeInfo = async (id: number) => (await axios.get<CafeInfo>(`/cafe/${id}`)).data;
