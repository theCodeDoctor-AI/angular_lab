import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasourse";
import { Cart } from "./cart.model";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    imports: [HttpClientModule],
    providers: [ProductRepository, StaticDataSource, Cart, {provide: StaticDataSource, useClass: RestDataSource}]
})

export class ModelModule { }
