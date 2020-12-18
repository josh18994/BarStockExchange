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
