import gql from 'graphql-tag';
import { CONTRACT } from '../Fragments/contract';

const CONTRACTS = gql`
  query contracts($filter: ContractsFilterInput, $limit: Int) {
    contracts(filter: $filter, limit: $limit) {
      items {
        ...${CONTRACT}
      }
      totalCount
      nextCursor
    }
  }
`;

export default CONTRACTS;
