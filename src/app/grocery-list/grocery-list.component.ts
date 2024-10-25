import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
})
export class GroceryListComponent implements OnInit {
  groceries: Item[] = [];
  filteredGroceries: Item[] = [];
  currentFilter: string = 'all';
  currentSort: string = '';

  constructor(private groceryService: GroceryService, private cartService: CartService) {}

  ngOnInit() {
    this.groceryService.getGroceries().subscribe(data => {
      this.groceries = data;
      this.applyFiltersAndSort();
    });
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  filterByType(type: string) {
    this.currentFilter = type;
    this.applyFiltersAndSort();
  }

  sortBy(criteria: string) {
    this.currentSort = criteria;
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    let items = [...this.groceries];

    if (this.currentFilter !== 'all') {
      items = items.filter(item => item.type === this.currentFilter);
    }

    if (this.currentSort === 'price') {
      items.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredGroceries = items;
  }
}
