import gql from 'graphql-tag';
import createClient from '../../apolloClient';
import { SERVICE } from '../../fragments/companies';

const SERVICES = gql`
  query services($type: ServiceType) {
    services(type: $type) {
      isSuccess
      message
      services {
        ...${SERVICE}
      }
    }
  }
`;

const fetchServices = async (variables) => {
  try {
    const client = await createClient();
    const result = await client.query({
      query: SERVICES,
      variables,
    });
    const { services } = result?.data || {};
    return services;
  } catch (error) {
    throw error;
  }
};

export default fetchServices;
