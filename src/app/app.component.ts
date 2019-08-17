import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('slideOpenClose', [
            transition(':enter', [
                style({
                    opacity: 0,
                    height: '10px'
                }),
                animate(200, style({
                    opacity: 1,
                    height: '*'
                }))
            ]),
            transition(':leave', [
                animate(200, style({
                    opacity: 0,
                    height: 0
                }))
            ])
        ])
    ]
})
export class AppComponent {
    private _contactForm:FormGroup;
    private _formProcessing:boolean = false;
    private _formSubmitted:boolean = false;

    get contactForm():FormGroup {
        return this._contactForm;
    }

    get formProcessing():boolean {
        return this._formProcessing;
    }

    get formSubmitted():boolean {
        return this._formSubmitted;
    }

    @ViewChildren('formErrorBox') formErrorBox:QueryList<ElementRef>;

    constructor(private fb:FormBuilder) {
        this._contactForm = this.fb.group({
            contactName : ['', Validators.required],
            contactEmail : ['', [Validators.required, Validators.email]],
            contactMessage : ['', Validators.required]
        });
    }

    submitForm():void {
        this._formSubmitted = true;

        for (var i in this.contactForm.controls) {
            this.contactForm.controls[i].markAsTouched();
        }

        if (this.formValid()) {
            this._formProcessing = true;
        } else {
            this.focusErrorBox();
        }
    }

    formValid():boolean {
        return this._contactForm.valid;
    }

    focusErrorBox():void {
        setTimeout(() => {
            if (this.formErrorBox.length == 0) {
                return;
            }

            this.formErrorBox.first.nativeElement.focus();
        })
    }
}
