import { Category } from "./category";

export class Product {
  idProduct!: number;
  name!: string;
  price!: number;
  available!: number;
  description?: string;
  category!: number;
}
