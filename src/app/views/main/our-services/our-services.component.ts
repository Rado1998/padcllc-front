import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ICardData } from '@models/our-services';

@Component({
    selector: 'app-our-services-view',
    templateUrl: 'our-services.component.html',
    styleUrls: ['our-services.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OurServicesViewComponent implements OnInit, OnDestroy {
    public services: ICardData[] = [
        {
            icon: 'web-1',
            title: 'Web',
            techs: [
                {
                    label: 'Fronted',
                    names: ['Angular', 'React JS', 'Vue JS']
                },
                {
                    label: 'Back end',
                    names: ['Djanog (Python)', 'Node JS', 'Laravel (PHP)']
                }
            ]
        },
        {
            icon: 'mobile',
            title: 'MOBILE',
            techs: [
                {
                    label: 'Technologies',
                    names: ['React Native', 'Flutter']
                },
                {
                    label: 'Advantades',
                    names: ['Djanog (Python)', 'Node JS', 'Laravel (PHP)']
                }
            ]
        },
        {
            icon: 'games',
            title: 'Games',
            techs: [
                {
                    label: 'Fronted',
                    names: ['Angular', 'React JS', 'Vue JS']
                },
                {
                    label: 'Back end',
                    names: ['Djanog (Python)', 'Node JS', 'Laravel (PHP)']
                }
            ]
        }
    ];

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() { }
}
