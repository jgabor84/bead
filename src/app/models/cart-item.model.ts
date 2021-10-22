import { Cart } from "./cart.model";
import { Wine } from "./wine.model";

export interface CartItem {
    id: number;
    sku: string;
    price: number;
    discount: number;
    quantity: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    cart: Cart;
    wine: Wine;
}
