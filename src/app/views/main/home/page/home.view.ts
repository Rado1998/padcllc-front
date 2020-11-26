import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare const google;

@Component({
  selector: 'app-home-view',
  templateUrl: 'home.view.html',
  styleUrls: ['home.view.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, OnDestroy {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slides = [{}, {}, {}, {}, {}, {}, {}, {}];
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

  ngOnInit() {
    this._initMap();
  }

  private _initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 40.828230, lng: 43.823510 },
      zoom: 8,
    });
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  ngOnDestroy() { }
}
