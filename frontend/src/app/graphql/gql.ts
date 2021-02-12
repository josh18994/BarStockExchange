import gql from 'graphql-tag';


export const START_CONNECTION = gql`
      subscription{
            updatedLiquorList{
                  _id
                  id
                  category{
                        categoryId
                        categoryType
                  }
                  price{
                        currentPrice
                        history {
                              price
                              date
                        }
                  }
                  info{
                        name
                        year
                  }
                  frequency
            }
      }
`;

export const GET_LIQUOR = gql`
      query GetAllLiquor(
      $pageSize: String!
      $pageNum: String!
      $search: String
      $filter: String
      ) {
            getAllLiquor(
            options: {
                  pageSize: $pageSize
                  pageNum: $pageNum
                  search: $search
                  filter: $filter
            }
            ) {
                  data {
                        id
                        _id
                        img
                        category {
                              categoryId
                              categoryType
                        }
                        price {
                              currentPrice
                              history {
                                    price
                                    date
                              }
                        }
                        info {
                              name
                              year
                        }
                  }
                  total
            }
      }
`;

export const GET_LIQUOR_BY_ID = gql`
      query GetLiquorById($id: String!){
            getLiquorById(id: $id) {
                  id
                  img
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
      }
`;

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

export const CREATE_USER = gql`
      mutation SignUp(
      $firstName: String!
      $lastName: String!
      $email: String!
      $username: String!
      $password: String!
      ) {
            createUser(
            inputCredentials: {
                  firstName: $firstName
                  lastName: $lastName
                  email: $email
                  username: $username
                  password: $password
            }
            ) {
                  firstName
                  lastName
                  email
                  username
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
      }
`;

export const CHECK_USER_EXISTS = gql`
      query CheckUserExists($username: String!){
            checkUserExists(username: $username)
      }
`;


export const GET_CART_INFO = gql`
      query GetCartByUser {
            getCartByUser{
                  user_Id
                  products {
                        quantity
                        liquor {
                              img
                              info {
                                    name
                              }
                              _id
                              id
                        }
                  }
            }
      }
`;

export const UPDATE_ORDER = gql`
      mutation UpdateCart($liquorId: String!, $quantity: Float!) {
            updateCart(
            productInfo: {
                  liquor: $liquorId
                  quantity: $quantity
            }
            ) {
                  products {
                        quantity
                        liquor {
                              img
                              info {
                                    name
                              }
                              _id
                        }
                  }
            }
      }
`;

export const CALCULATE_TOTAL = gql`
      mutation CalculateTotal{
            calculateTotal{
                  total
            }
      }
`;

export const CHECKOUT_USER_CART = gql`
      mutation CheckoutUserCart($products: [ProductInfoInput!]!) {
            checkoutUserCart(products: $products)
      }
`;



