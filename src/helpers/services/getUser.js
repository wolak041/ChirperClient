import { apiUrls } from '../constants';

const getUser = async () => {
  const request = await fetch(apiUrls.GET_USER, {
    method: 'POST',
  });
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

export default getUser;
