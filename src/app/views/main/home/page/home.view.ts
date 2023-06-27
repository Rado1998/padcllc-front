import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';

import { forkJoin, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, map, takeUntil } from 'rxjs/operators';

import { BaseAPIService } from '@api-services/index';
import { IProject } from '@models/projects';
import { ITeamMember } from '@models/team';
import { ArrayHelpers } from '@helpers/array';
import { IJoinRequest } from '@models/join-request';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-view',
  templateUrl: 'home.view.html',
  styleUrls: ['home.view.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();
  public projects: IProject[] = [];
  public team: ITeamMember[] = [];
  public resetForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  public loading: boolean = false;

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 300,
    dots: true
  };

  public teamSlideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    speed: 300,
    dots: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  @ViewChild('wwdContainer')
  private _wwdContainerElement: ElementRef<HTMLElement>;
  @ViewChild('polygonsContainer')
  private _polygonElement: ElementRef<HTMLElement>;

  constructor(
    private _baseAPIService: BaseAPIService,
    private _activatedRoute: ActivatedRoute,
    private _platformService: PlatformService,
    private _toastrService: ToastrService,
    private _titleService: Title
  ) {
    this._titleService.setTitle('Home - PADC, LLC');
  }

  ngOnInit(): void {
    this._loadInitalData();
  }

  ngAfterViewInit(): void {
    this._animateOurProjectTriangles();
    this._handleRouteChanges();
  }

  private _loadInitalData(): void {
    forkJoin([
      this._getProjects(),
      this._getTeam()
    ])
      .pipe(
        takeUntil(this._unsubscribe$),
      ).subscribe();
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

  private _getProjects(): Observable<void> {
    return this._baseAPIService.main.getOurProjects()
      .pipe(
        map(({ data }) => {
          this.projects = data;
        })
      );
  }

  private _getTeam(): Observable<void> {
    return this._baseAPIService.main.getTeamData()
      .pipe(
        map((data) => {
          this.team = ArrayHelpers.shuffle(data);
        })
      );
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
          polygons[0].style.transform = `translate(-${x / 80}px, -${y / 80}px)`;
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

  public onFormSubmit(data: IJoinRequest): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._baseAPIService.main.sendContactRequest(data)
      .pipe(
        takeUntil(this._unsubscribe$),
        map(() => {
          this.resetForm.next(true);
          this._toastrService.info(`Message has been successfully sent !`);
        }),
        finalize(() => this.loading = false)
      ).subscribe();
  }

  public setPosition(item: ITeamMember): object {
    let style = {}
    const { position } = item;

    if (position) {
      style['object-position'] = position;
    }

    return style;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
