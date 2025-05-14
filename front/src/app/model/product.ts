import { Category } from "./category";

export class Product {
  id_product!: number;
  name!: string;
  price!: number;
  available!: number;
  description?: string;
  category!: number;
}
