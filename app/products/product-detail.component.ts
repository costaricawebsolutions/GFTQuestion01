import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { IProduct } from './product';
import { ICashRegister } from './cashRegister';

import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    cash: number;
    change: number;
    arrayCashRegister: any;
    product: IProduct;
    errorMessage: string;
    showMessage: boolean;
    warningMessage: string;
    totalAvailable: number;
    cashReturn: any;
    cashChange: any;
    changereturn:number;
    showClosedPay:boolean;




    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService) {
        this.arrayCashRegister = [];

    }

    ngOnInit(): void {
        this.showClosedPay = false;
        this.cash = 0.0;
        this.change = 0;
        this.totalAvailable = 0;
        this.cashReturn = [];
        this.cashChange = [];

        var modal = <ICashRegister>{};
        modal.type = "PENNY";
        modal.value = 0.01;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);

        var modal = <ICashRegister>{};
        modal.type = "NIKEL";
        modal.value = 0.05;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);


        var modal = <ICashRegister>{};
        modal.type = "DIME";
        modal.value = 0.1;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);


        var modal = <ICashRegister>{};
        modal.type = "QUARTER";
        modal.value = 0.25;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);

        var modal = <ICashRegister>{};
        modal.type = "ONE DOLLAR";
        modal.value = 1;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);


        var modal = <ICashRegister>{};
        modal.type = "FIVE DOLLARS";
        modal.value = 5;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);


        var modal = <ICashRegister>{};
        modal.type = "TEN DOLLARS";
        modal.value = 10;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);

        var modal = <ICashRegister>{};
        modal.type = "TWENTY DOLLARS";
        modal.value = 20;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);


        var modal = <ICashRegister>{};
        modal.type = "ONE HUNDRED DOLLARS";
        modal.value = 100;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);



        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            });
    }
    addCashCombinations(money: number): void {

        switch (money) {
            case 0.01: this.cashChange.push("$0.01 Penny");
                break;
            case 0.05: this.cashChange.push("$0.05 Nikel");
                break;
            case 0.1: this.cashChange.push("$0.1 Dime");
                break;
            case 0.25: this.cashChange.push("$0.25 Quarter");
                break;
            case 1: this.cashChange.push("$1 Dollar");
                break;
            case 5: this.cashChange.push("$5 Dollar");
                break;
            case 10: this.cashChange.push("$10 Dollar");
                break;
            case 20: this.cashChange.push("$20 Dollar");
                break;
            case 100: this.cashChange.push("$100 Dollar");
                break;

        }
    }
    searchCashCombination(cash: number): void {
        
        for (let indexItem = 0; indexItem <= this.arrayCashRegister.length - 1; indexItem++) {

            if (cash < this.arrayCashRegister[indexItem].value) {

                this.cash = this.cash - this.arrayCashRegister[indexItem - 1].value;
                this.addCashCombinations(this.arrayCashRegister[indexItem - 1].value);

                break;
            }
            else {

                if (cash == this.arrayCashRegister[indexItem].value) {

                    this.cash = this.cash - this.arrayCashRegister[indexItem].value;
                    //this.cashChange.push(this.arrayCashRegister[indexItem].value);
                    this.addCashCombinations(this.arrayCashRegister[indexItem].value);


                    break;
                }


            }

        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
    checkAmountAvailable(change: number): boolean {

        for (let indexItem = 0; indexItem <= this.arrayCashRegister.length - 1; indexItem++) {
            this.totalAvailable = this.totalAvailable + this.arrayCashRegister[indexItem].amountAvailable;
        }

        if (change > this.totalAvailable)
            return false;
        else
            return true;



    }


    processOrder(): void {
        this.showClosedPay = false;
        let cashReturn: number;
        let cashpaid:number = this.cash;
        this.changereturn = cashpaid - this.product.price;
        this.cashChange = [];
        cashReturn = this.cash - this.product.price;
        this.changereturn = Math.round(this.changereturn*100)/100;
        if (this.checkAmountAvailable(this.changereturn)) {
            if (cashReturn <= 0) {
                this.showMessage = true;
                this.errorMessage = "Insufficient Funds";
            }
            else {

                let numberToString: string = this.changereturn.toString();
                let numberInteger: number;
                let decimalPart: number;
                if (numberToString.indexOf('.') > 0) {
                    numberInteger = Number(numberToString.split(".")[0]);
                    decimalPart = Number("0." + numberToString.split(".")[1]);
                    decimalPart = Math.round(decimalPart * 100) / 100;
                    
                    this.cash = numberInteger;
                    while (this.cash > 0) {
                        this.searchCashCombination(this.cash);
                    }
                    this.cash = decimalPart;
                    while (this.cash > 0) {
                        this.cash = Math.round(this.cash * 100) / 100;
                        this.searchCashCombination(this.cash);
                    }
                    

                }


                this.showClosedPay = true;
                this.showMessage = false;
                this.errorMessage = "Closed";
            }
        }
        else {
            this.showMessage = true;
            this.errorMessage = "Insufficient Funds";
        }
        

    }
}
