import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { InlineSvgService } from './inline-svg.service';

@Directive({
    selector: '[appInlineSvg]',
    providers: [InlineSvgService]
})
export class InlineSvgDirective implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    @Input('appInlineSvg') private _svgName: string = '';

    constructor(
        private _inlineSvgService: InlineSvgService,
        private _elementRef: ElementRef<HTMLElement>,
    ) { }

    ngOnInit() {
        this._getSvg();
    }

    private _getSvg(): void {
        if (this._svgName) {
            this._inlineSvgService.getSvg(this._svgName)
                .pipe(
                    takeUntil(this._unsubscribe$),
                    tap((res) => {
                        if (!res) {
                            throw new Error(`${this._svgName} SVG not found`);
                        }
                        this._elementRef.nativeElement.innerHTML = res;
                    })
                ).subscribe();
        }
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
