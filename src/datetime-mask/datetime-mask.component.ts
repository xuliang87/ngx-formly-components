import { Component, OnInit, DoCheck } from '@angular/core';
import { Field } from 'ng-formly';
import createAutoCorrectedDateTimePipe from './createAutoCorrectedDateTimePipe';
import * as moment from 'moment';
import { Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'formly-datemask',
    styles: [`
    .ng2-datetime-picker {
        width: 100% !important;
    }

    i {
        display: inline-block;
    }

    .datetime-picker .hourLabel, .datetime-picker .minutesLabel {
        display: block !important;
    }

    p-inputMask {
        padding: 0;
    }

    :host /deep/ .ui-inputtext {
        width: 100%;
        border: none !important;
    }

    .today {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
    }
    `],
    template: `
    <div class="form-group">
        <label for="key" [ngStyle]="{color:formControl.errors?'#F00':''}">{{ to.label }}</label>
        <div style="position: relative">
        <input class="form-control" placeholder="{{this.format}}" type="text" [(ngModel)]="model" [textMask]="{mask: mask, keepCharPositions: true, pipe: autoCorrectedDatePipe }"
            (ngModelChange)="onChange($event)" />
            <i class="fa fa-calendar-check-o today" title="Fecha de Hoy" (click)="today()"></i>
        </div>
    </div>
    `
})
export class FormlyDateTimeMaskComponent extends Field implements OnInit {
    model: any;
    format: string = 'DD-MM-YYYY HH:mm';
    autoCorrectedDatePipe: any;
    mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];
    errors: string;

    ngOnInit() {
        this.format = this.to.format ? this.to.format : this.format;
        this.autoCorrectedDatePipe = createAutoCorrectedDateTimePipe(this.format);
        this.mask = this.to.mask ? this.to.mask : this.mask;
        if (this.formControl.value) {
            this.model = moment(this.formControl.value).format(this.format);
        }
        else {
            this.model = null;
        }
        let validators = [];
        validators.push((e: any) => { return this.isValid() ? null : { 'date': 'Invalid date' } });
        if (this.to.required) {
            validators.push((e: any) => { return !!e.value ? null : { 'required': 'Required field' } });
        }
        this.formControl.setValidators(Validators.compose(validators));
    }

    isValid() {
        if (this.model) {
            if (this.model.indexOf('_') >= 0) {
                return false;
            }
            else {
                if (moment(this.model, this.format).isValid()) {
                    return true;
                }
            }
            return false
        }
        return true;
    }

    today() {
        this.model = moment().format(this.format);
        this.formControl.setValue(moment(this.model, this.format).toDate());
    }

    onChange(e: any) {
        if (e) {
            this.formControl.setValue(moment(e, this.format).toDate());
        }
        else {
            this.formControl.setValue(null);
        }
        this.errors = "";
        if (this.formControl.errors) {
            for (var key in this.formControl.errors) {
                if (this.formControl.errors.hasOwnProperty(key)) {
                    this.errors += this.formControl.errors[key] + '. ';
                }
            }
        }
    }

}
