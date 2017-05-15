"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("./product.service");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(_route, _router, _productService) {
        this._route = _route;
        this._router = _router;
        this._productService = _productService;
        this.pageTitle = 'Product Detail';
        this.arrayCashRegister = [];
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cash = 0.0;
        this.change = 0;
        this.totalAvailable = 0;
        this.cashReturn = [];
        this.cashChange = [];
        var modal = {};
        modal.type = "PENNY";
        modal.value = 0.01;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "NIKEL";
        modal.value = 0.05;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "DIME";
        modal.value = 0.1;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "QUARTER";
        modal.value = 0.25;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "ONE DOLLAR";
        modal.value = 1;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "FIVE DOLLARS";
        modal.value = 5;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "TEN DOLLARS";
        modal.value = 10;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "TWENTY DOLLARS";
        modal.value = 20;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        var modal = {};
        modal.type = "ONE HUNDRED DOLLARS";
        modal.value = 100;
        modal.amountAvailable = 100;
        this.arrayCashRegister.push(modal);
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getProduct(id);
        });
    };
    ProductDetailComponent.prototype.addCashCombinations = function (money) {
        switch (money) {
            case 0.01:
                this.cashChange.push("$0.01 Penny");
                break;
            case 0.05:
                this.cashChange.push("$0.05 Nikel");
                break;
            case 0.1:
                this.cashChange.push("$0.1 Dime");
                break;
            case 0.25:
                this.cashChange.push("$0.25 Quarter");
                break;
            case 1:
                this.cashChange.push("$1 Dollar");
                break;
            case 5:
                this.cashChange.push("$5 Dollar");
                break;
            case 10:
                this.cashChange.push("$10 Dollar");
                break;
            case 20:
                this.cashChange.push("$20 Dollar");
                break;
            case 100:
                this.cashChange.push("$100 Dollar");
                break;
        }
    };
    ProductDetailComponent.prototype.searchCashCombination = function (cash) {
        for (var indexItem = 0; indexItem <= this.arrayCashRegister.length - 1; indexItem++) {
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
    };
    ProductDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductDetailComponent.prototype.getProduct = function (id) {
        var _this = this;
        this._productService.getProduct(id).subscribe(function (product) { return _this.product = product; }, function (error) { return _this.errorMessage = error; });
    };
    ProductDetailComponent.prototype.onBack = function () {
        this._router.navigate(['/products']);
    };
    ProductDetailComponent.prototype.checkAmountAvailable = function (change) {
        for (var indexItem = 0; indexItem <= this.arrayCashRegister.length - 1; indexItem++) {
            this.totalAvailable = this.totalAvailable + this.arrayCashRegister[indexItem].amountAvailable;
        }
        if (change > this.totalAvailable)
            return false;
        else
            return true;
    };
    ProductDetailComponent.prototype.processOrder = function () {
        var cashReturn;
        var cashpaid = this.cash;
        this.changereturn = cashpaid - this.product.price;
        this.cashChange = [];
        cashReturn = this.cash - this.product.price;
        this.changereturn = Math.round(this.changereturn * 100) / 100;
        if (this.checkAmountAvailable(this.changereturn)) {
            if (cashReturn <= 0) {
                this.showMessage = true;
                this.errorMessage = "Insufficient Funds";
            }
            else {
                var numberToString = this.changereturn.toString();
                var numberInteger = void 0;
                var decimalPart = void 0;
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
                this.showMessage = false;
                this.errorMessage = "Closed";
            }
        }
        else {
            this.showMessage = true;
            this.errorMessage = "Insufficient Funds";
        }
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/products/product-detail.component.html',
        styleUrls: ['app/products/product-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        product_service_1.ProductService])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map