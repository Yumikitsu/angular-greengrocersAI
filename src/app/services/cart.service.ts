import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { item: Item; quantity: number }[] = [];
  private totalPrice: number = 0;
  private cartSubject = new BehaviorSubject<{ item: Item; quantity: number }[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  getCart() {
    return this.cart;
  }

  addToCart(item: Item) {
    const existingItem = this.cart.find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ item, quantity: 1 });
    }
    this.updateCart();
  }

  updateQuantity(item: Item, quantity: number) {
    const cartItem = this.cart.find(cartItem => cartItem.item.id === item.id);
    if (cartItem) {
      cartItem.quantity = quantity;
    }
    this.updateCart();
  }

  removeFromCart(item: Item) {
    this.cart = this.cart.filter(cartItem => cartItem.item.id !== item.id);
    this.updateCart();
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  private updateCart() {
    this.totalPrice = this.cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
    this.cartSubject.next(this.cart);
  }
}
