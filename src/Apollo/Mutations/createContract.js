import gql from 'graphql-tag';

const CREATE_CONTRACT = gql`
  mutation createContract($params: CreateContractInput!) {
    createContract(params: $params) {
      isSuccess
      message
    }
  }
`;

export default CREATE_CONTRACT;
