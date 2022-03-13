import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

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

  ngOnInit(): void { }

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

  private _animateOurProjectTriangles(): void {
    fromEvent(window, 'mousemove')
      .pipe(
        map((e: MouseEvent) => {
          const polygonsCollection = this._polygonElement.nativeElement.children;
          const polygons = Array.from(polygonsCollection) as HTMLElement[];
          const x = e.screenX;
          const y = e.screenY;
          console.log(x, y);
          polygons[0].style.transform = `translate(-${x / 80}px, -${y / 80}px)`;
          // polygons[1].style.transform = `translate(${x / 30}px, -${y / 30}px)`;
          polygons[2].style.transform = `translate(${x / 80}px, ${y / 80}px)`;
        })
      ).subscribe();
  }

  public onMouseOverWWDItem(index: number): void {
    const wwidItemsCollection = this._wwdContainerElement.nativeElement.children;
    const wwidItems = Array.from(wwidItemsCollection);
    wwidItems.splice(0, 1);
    for (let i = 0; i <= index; i++) {
      wwidItems[i]?.classList.add('whatWeDo_item--img--active');
    }
    wwidItems[index]?.classList.add('whatWeDo_item--img--active--last');
  }

  public onMouseOutWWDItems(): void {
    const wwidItemsCollection = this._wwdContainerElement.nativeElement.children;
    const wwidItems = Array.from(wwidItemsCollection);
    wwidItems.splice(0, 1);
    for (let i = 0; i <= wwidItems.length; i++) {
      wwidItems[i]?.classList.remove('whatWeDo_item--img--active');
      wwidItems[i]?.classList.remove('whatWeDo_item--img--active--last');
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
