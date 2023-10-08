import axios from 'axios';
import { GetDataPropsType } from '../data-types';

const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getData = async (props: GetDataPropsType) => {
  const url = props;
  try {
    const response = await axios.get(url, header);

    const result = await response.data;

    return result;
  } catch (error) {
    console.error(error);
  }
};
