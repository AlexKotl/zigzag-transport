import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'https://kalaharideals.com/api'
});

export default apiClient;
