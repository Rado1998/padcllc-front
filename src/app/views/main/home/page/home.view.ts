import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

declare const google;

@Component({
  selector: 'app-home-view',
  templateUrl: 'home.view.html',
  styleUrls: ['home.view.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild('wwdContainer')
  private _wwdContainerElement: ElementRef<HTMLElement>;
  @ViewChild('polygonsContainer')
  private _polygonElement: ElementRef<HTMLElement>;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _platformService: PlatformService
  ) { }

  ngOnInit(): void {
    this._initMap();
  }

  ngAfterViewInit(): void {
    this._animateOurProjectTriangles();
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

  private _animateOurProjectTriangles(): void {
    fromEvent(window, 'mousemove')
      .pipe(
        map((e: MouseEvent) => {
          const polygonsCollection = this._polygonElement.nativeElement.children;
          const polygons = Array.from(polygonsCollection) as HTMLElement[];
          const x = e.offsetX;
          const y = e.offsetY;
          polygons[0].style.transform = `translate(-${x / 50}px, -${y / 50}px)`;
        })
      ).subscribe();
  }

  public onMouseOverWWDItem(index: number): void {
    const wwidItemsCollection = this._wwdContainerElement.nativeElement.children;
    const wwidItems = Array.from(wwidItemsCollection);
    wwidItems.splice(0, 1);
    for (let i = 0; i <= index; i++) {
      wwidItems[i].firstElementChild.classList.add('whatWeDo_item--img--active');
    }
  }

  public onMouseOutWWDItems(): void {
    const wwidItemsCollection = this._wwdContainerElement.nativeElement.children;
    const wwidItems = Array.from(wwidItemsCollection);
    wwidItems.splice(0, 1);
    for (let i = 0; i <= wwidItems.length; i++) {
      wwidItems[i].firstElementChild.classList.remove('whatWeDo_item--img--active');
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
