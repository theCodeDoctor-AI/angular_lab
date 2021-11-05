import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";

@Component({
    selector: 'store',
    templateUrl: 'store.component.html'
})

export class StoreComponent
{
    public selectedCategory = '';
    public productsPerPage = 4;
    public selectedPage = 1;

    constructor(private repository: ProductRepository, private cart: Cart) { }

    get products(): Product[] 
    {
        const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): string[] 
    {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string): void 
    {
        this.selectedCategory = (newCategory !== null) ? newCategory! : '';
    }

    changePage(newPage: number): void
    {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number): void 
    {
        if (newSize === null || newSize === undefined) {
            this.productsPerPage = 3;
            this.changePage(1);
        }
        else {
            this.productsPerPage = newSize;
            this.changePage(1);            
        }        
    }
    
    get pageCount(): number
    {
        return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
    }

    addProductToCart(product: Product)
    {
        this.cart.addLine(product);
    }

    /* get pageNumbers(): number[] 
    {
        return Array(Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage))
            .fill(0).map((x, i) => i + 1);
    } */
}