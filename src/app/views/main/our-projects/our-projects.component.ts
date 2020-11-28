import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
    selector: 'app-our-projects-view',
    templateUrl: 'our-projects.component.html',
    styleUrls: ['our-projects.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OurProjectsViewComponent {
    @ViewChild('slickElement') slickModal: SlickCarouselComponent;

    slides = [
        { img: "http://placehold.it/350x150/000000" },
        { img: "http://placehold.it/350x150/111111" },
        { img: "http://placehold.it/350x150/333333" },
        { img: "http://placehold.it/350x150/666666" }
    ];
    slideConfig = {};

    constructor() {
        this.slideConfig = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 2000
        };
    }

    public slickInit($event): void {
        console.log($event);
    }
}
