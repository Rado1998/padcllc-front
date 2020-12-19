import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { navigationSteps } from '@globals/navigation-steps';

const animations = [];

navigationSteps.map((element, index) => {
    if (index !== navigationSteps.length - 1) {
        for (let i = index + 1; i < navigationSteps.length; i++) {
            animations.push(animationNext(`${element.name} => ${navigationSteps[i].name}`));
        }
    }

    if (index !== 0) {
        for (let i = index - 1; i >= 0; i--) {
            animations.push(animationPrev(`${element.name} => ${navigationSteps[i].name}`));
        }
    }
});

function animationNext(triggerName: string) {
    return transition(triggerName, [
        style({
            position: 'relative',
        }),
        query(':enter, :leave', [
            style({
                position: 'fixed',
                width: '100%',
            })
        ]),
        query(':enter', [
            style({ bottom: '-100%' })
        ]),
        query(':leave', [
            style({ top: '0' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-in', style({ top: '-100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-in', style({ bottom: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ]);
}

function animationPrev(triggerName: string) {
    return transition(triggerName, [
        style({
            position: 'relative',
        }),
        query(':enter, :leave', [
            style({
                position: 'fixed',
                width: '100%',
            })
        ]),
        query(':enter', [
            style({ top: '-100%' })
        ]),
        query(':leave', [
            style({ bottom: '0' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-in', style({ bottom: '-100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-in', style({ top: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ]);
}

export const navAnimations =
    trigger('routeAnimations', animations);
