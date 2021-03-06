import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MdSelectModule, MdButtonModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FormlySelectComponent } from './select.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdSelectModule,
		MdButtonModule
	],
	declarations: [FormlySelectComponent],
	exports: [FormlySelectComponent]
})
export class FormlySelectModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySelectModule, providers: []
		};
	}
}