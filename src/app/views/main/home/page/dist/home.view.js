"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeViewComponent = void 0;
var core_1 = require("@angular/core");
var HomeViewComponent = /** @class */ (function () {
    function HomeViewComponent() {
        this.count = 1;
        this.slides = [
            { img: "http://placehold.it/350x150/000000" },
            { img: "http://placehold.it/350x150/111111" },
            { img: "http://placehold.it/350x150/333333" },
            { img: "http://placehold.it/350x150/666666" }
        ];
        this.slideConfig = {};
        this.slideConfig = {
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000
        };
    }
    HomeViewComponent.prototype.ngOnInit = function () { };
    HomeViewComponent.prototype.slickInit = function ($event) {
        console.log($event);
    };
    HomeViewComponent.prototype.beforeChange = function ($event) {
        console.log($event, 'dd');
        this._tbBottomElement.nativeElement.classList.remove('update-animation');
        this._tbBottomElement.nativeElement.classList.add('remove-animation');
    };
    HomeViewComponent.prototype.afterChange = function ($event) {
        this.count++;
        if (this.count < 3) {
            this._tbBottomElement.nativeElement.classList.remove('remove-animation');
            this._tbBottomElement.nativeElement.classList.add('update-animation');
        }
    };
    HomeViewComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.ViewChild('slickElement')
    ], HomeViewComponent.prototype, "slickModal");
    __decorate([
        core_1.ViewChild('tbBottom')
    ], HomeViewComponent.prototype, "_tbBottomElement");
    HomeViewComponent = __decorate([
        core_1.Component({
            selector: 'app-home-view',
            templateUrl: 'home.view.html',
            styleUrls: ['home.view.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], HomeViewComponent);
    return HomeViewComponent;
}());
exports.HomeViewComponent = HomeViewComponent;
