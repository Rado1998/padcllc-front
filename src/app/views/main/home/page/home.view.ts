import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-view',
  templateUrl: 'home.view.html',
  styleUrls: ['home.view.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, OnDestroy {
  @ViewChild('slickElement') slickModal: SlickCarouselComponent;
  @ViewChild('tbBottom') private _tbBottomElement: ElementRef<HTMLElement>;

  public count = 1
  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" }
  ];
  slideConfig = {};


  constructor() {
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

  ngOnInit() { }

  public slickInit(): void {
    this.slickModal.unslick = () => { };
  }

  public beforeChange(): void {
    this._tbBottomElement.nativeElement.classList.remove('update-animation');
    this._tbBottomElement.nativeElement.classList.add('remove-animation');
  }

  public afterChange(): void {
    this._tbBottomElement.nativeElement.classList.remove('remove-animation');
    this._tbBottomElement.nativeElement.classList.add('update-animation');
  }

  ngOnDestroy() {
  }
}
