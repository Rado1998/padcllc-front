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
  public carouselIndex: number = 0;

  public count = 1;
  public slides = [
    { img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9uJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' },
    { img: 'https://www.herzing.edu/sites/default/files/styles/fp_960_640/public/2020-09/it_computer_programming.jpg.webp?itok=8aEwtSxk' },
    { img: 'https://content.techgig.com/thumb/msid-79844104,width-860,resizemode-4/5-Best-programming-languages-to-learn-in-2021.jpg?140622' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Hcu1J7hlo_4-7S68jxO3UgGICDqCDPw_sR7KErau0a_hevVyjj10-0yxLVg3eMgpyA0&usqp=CAU' }
  ];
  public slideConfig = {};


  constructor() {
    this.slideConfig = {
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 500
    };
  }

  ngOnInit() { }

  private _setBackgroundImage(): void {
    if (this.carouselIndex === this.slides.length - 1) {
      this.carouselIndex = 0;
    } else {
      this.carouselIndex++;
    }
    const { img } = this.slides[this.carouselIndex];
    this._tbBottomElement.nativeElement.style.backgroundImage = `url(${img})`;
  }

  public slickInit(): void {
    this.slickModal.unslick = () => { };
    this._tbBottomElement.nativeElement.classList.add('update-animation');
  }

  public beforeChange(): void {
    this._tbBottomElement.nativeElement.classList.remove('update-animation');
    this._tbBottomElement.nativeElement.classList.add('remove-animation');
  }

  public afterChange(): void {
    this._tbBottomElement.nativeElement.classList.remove('remove-animation');
    this._tbBottomElement.nativeElement.classList.add('update-animation');
    this._setBackgroundImage();
  }

  ngOnDestroy() { }
}
