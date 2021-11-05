import { createOfflineCompileUrlResolver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class Cart 
{
    public lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    addLine(product: Product, quantity: number = 1): void 
    {
        const line = this.lines.find(l => l.product.id === product.id);
        if(line !== undefined)
        {
            line.quantity += quantity;
        }
        else
        {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
    }

    updateQuantity(product: Product, quantity: number): void{
        const line = this.lines.find(l => l.product.id === product.id);
        if(line !== undefined)
        {
            line.quantity = Number(quantity);
        }
        this.recalculate();
    }

    removeLine(id: number): void
    {
        const index = this.lines.findIndex(l => l.product.id === id);
        this.lines.splice(index, 1);
        this.recalculate();
    }

    clear(): void
    {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate(): void 
    {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.price!);
        });
    }
}

export class CartLine{
    constructor(public product: Product, public quantity: number) { }

    get lineTotal(): number 
    {
        return this.quantity * this.product.price!;
    }
}