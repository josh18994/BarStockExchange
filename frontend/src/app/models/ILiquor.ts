export interface ILiquor {

  id: string;
  img: string;
  category: Category;
  price: Price;
  info: Info;
}

export interface Category {
  categoryId: string;
  categoryType: string;
}

export interface Price {
  currentPrice: string;
  history: PriceHistory[]
}


export interface PriceHistory {
  price: string;
  date: Date;
}

export interface Info {
  name: string;
  year: string;
}
