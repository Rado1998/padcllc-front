import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subject, timer } from 'rxjs';
import { debounce, debounceTime, takeUntil } from 'rxjs/operators';

declare const google;

@Component({
  selector: 'app-home-view',
  templateUrl: 'home.view.html',
  styleUrls: ['home.view.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slides = [{}, {}, {}, {}, {}, {}, {}, {}];
  slideConfig = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _platformService: PlatformService
  ) {
    this.slideConfig = {
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      autoplay: false,
      autoplaySpeed: 2000
    };
  }

  ngOnInit(): void {
    this._initMap();
  }

  ngAfterViewInit(): void {
    this._handleRouteChanges();
  }

  private _handleRouteChanges(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._unsubscribe$),
        debounceTime(400),
      )
      .subscribe(() => {
        this._setScrollPosition();
      });
  }

  private _setScrollPosition(): void {
    const { sectionId } = this._activatedRoute.snapshot.queryParams;
    const fixedValue = 100;
    if (this._platformService.isBrowser) {
      let scrollPosition = null;
      if (!sectionId) {
        scrollPosition = 0;
      }
      scrollPosition = document.getElementById(sectionId)?.offsetTop;
      window.scrollTo(0, scrollPosition - fixedValue);
    }
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

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
