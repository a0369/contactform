import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[clickFocus]'
})
export class ClickFocus {

    @Input('href') href:string;

    @HostListener('click', ['$event'])
    onClick(e:Event) {
        var focusEl:HTMLElement = document.querySelector(this.href);

        if (focusEl) {
            focusEl.focus();
        }

        e.preventDefault();
    }

    constructor() {

    }
}
