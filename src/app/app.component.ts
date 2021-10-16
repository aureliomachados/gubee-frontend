import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Stack } from './models/stack';
import { TargetMarket } from './models/targetmarket';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  product = {} as Product;
  products: Product[] = [];
  markets: TargetMarket[] = [];
  stacks: Stack[] = [];
  title = 'frontend-marketplace';
  selectedMarkets: TargetMarket[] = [];
  selectedStacks: Stack[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getProducts();
    this.getMarkets();
    this.getStacks();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getProductsByStacks(){
    this.productService.getFilterProductsByStacks(this.selectedStacks).subscribe((products: Product[]) => {
       this.products = products;
    })
  }

  getProductsByMarkets(){
    this.productService.getFilterProductsByMarkets(this.selectedMarkets).subscribe((products: Product[]) => {
       this.products = products;
    })
  }

  getStacks() {
    this.productService.getStacks().subscribe((stacks: Stack[]) => {
      this.stacks = stacks;
    });
  }

  getMarkets() {
    this.productService.getMarkets().subscribe((markets: TargetMarket[]) => {
      this.markets = markets;
    });

  }
}


