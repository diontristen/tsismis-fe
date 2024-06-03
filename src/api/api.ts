import axios from './axios';

const graphqlRequest = async (query: string, variables: Record<string, any> = {}, config: Record<string, any> = {}) => {
  try {
    const response = await axios.post('', {
      query,
      variables,
    }, {
      ...config
    });
    return response.data;
  } catch (error) {
    console.error('GraphQL request failed', error);
    throw error;
  }
};

export default graphqlRequest;
