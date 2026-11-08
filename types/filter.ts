export type Filter = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};
