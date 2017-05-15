import { Component, OnInit }  from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Question 2';
    pageDescription:string = "Design a CashRegister  that allows you to make payment by passing “price”, “cash” and then calculates if the change due is available.";
    imageWidth: number = 50;
    imageMargin: number = 2;    
    listFilter: string;
    errorMessage: string;
    testpage = "hello";

    products: IProduct[];
    

    constructor(private _productService: ProductService) {

    }



    ngOnInit(): void {
        this.testpage = "hola";
        this._productService.getProducts()
                .subscribe(products => this.products = products,
                           error => this.errorMessage = <any>error);

    


    }

   
}
