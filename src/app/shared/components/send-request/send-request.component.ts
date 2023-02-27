import { Component, Input, OnDestroy, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IJoinRequest } from '@models/join-request';

import { VALIDATION_PATTERNS } from '@validators/patterns';

@Component({
    selector: 'app-send-request',
    templateUrl: 'send-request.component.html',
    styleUrls: ['send-request.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SendRequestComponent implements OnInit, OnDestroy {
    @Input() public subtitle: string = `Let's Meet… Coffee Is On Us :)`;
    @Input() resetForm: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() public disabled: boolean;
    @Output() public submit: EventEmitter<IJoinRequest> = new EventEmitter<IJoinRequest>();
    public sendRequestForm: FormGroup;
    public fileName: string;
    public showErrors: boolean;

    constructor(
        private _fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this._initForm();
        this._checkIfFormDisabled();
        this._handleResetFormChanges();
    }

    private _checkIfFormDisabled(): void {
        if (this.disabled) {
            this.sendRequestForm.disable();
        }
    }

    private _handleResetFormChanges(): void {
        this.resetForm.subscribe((value) => {
            if (value) {
                this.sendRequestForm.reset();
                this.fileName = null;
            }
        });
    }

    private _initForm(): void {
        this.sendRequestForm = this._fb.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            phone: [null, [Validators.required,
            Validators.pattern(VALIDATION_PATTERNS.PHONE)]],
            address: [null, [Validators.required, Validators.minLength(4)]],
            email: [null, [Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)]],
            file: [null]
        });
    }

    public onChooseFile(event: Event): void {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) {
            return;
        }
        this.sendRequestForm.patchValue({
            file
        });
        this.fileName = file.name;
    }

    public onClickRemoveFile(): void {
        this.sendRequestForm.patchValue({
            file: null
        });
        this.fileName = null;
    }

    public onClickSend(): void {
        if (this.sendRequestForm.invalid) {
            this.showErrors = true;
            this.sendRequestForm.markAllAsTouched();
            return;
        }
        this.showErrors = false;
        this.submit.emit(this.sendRequestForm.value);
    }

    ngOnDestroy(): void { }
}
