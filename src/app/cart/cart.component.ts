import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: { item: Item; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(item: Item) {
    this.cartService.updateQuantity(item, this.getQuantity(item) + 1);
  }

  decreaseQuantity(item: Item) {
    const newQuantity = this.getQuantity(item) - 1;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item, newQuantity);
    } else {
      this.cartService.removeFromCart(item);
    }
  }

  getQuantity(item: Item): number {
    const cartItem = this.cart.find(cartItem => cartItem.item.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  }
}
