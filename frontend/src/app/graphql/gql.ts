import gql from 'graphql-tag';


export const START_CONNECTION = gql`
subscription{
  updatedLiquorList{
    id
    category{
      categoryId
      categoryType
    }
    price{
      currentPrice
    }
    info{
      name
      year
    }
  }
}`;

export const GET_LIQUOR = gql`
{
  getAllLiquor{
    id
    img
    category{
      categoryId
      categoryType
    }
    price{
      currentPrice
    }
    info{
      name
      year
    }
  }
}`;

export const GET_LIQUOR_BY_ID = gql`
query GetLiquorById($id: String!){
  getLiquorById(id: $id) {
    id
    category {
      categoryId
      categoryType
    }
    price {
      currentPrice
    }
    info {
      name
      year
    }
  }
}`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!){
  login(inputCredentials: { username: $username, password: $password }) {
    user {
      email
      firstName
      lastName
      username
      }
    token
    }
  }
`;

export const AUTHENTICATE_COOKIE = gql`
{
  authenticateCookie{
    email
    firstName
    lastName
    username
  }
}`;
