import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RxjsOperatorsComponent } from './rxjs-operators/rxjs-operators.component';
import { ViewEncapsulationComponent } from './view-encapsulation/view-encapsulation.component';
import { ViewEncapsulationChildComponent } from './view-encapsulation/view-encapsulation-child/view-encapsulation-child.component';
import { TemplateContainerComponent } from './template-container/template-container.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsOperatorsComponent,
    ViewEncapsulationComponent,
    ViewEncapsulationChildComponent,
    TemplateContainerComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
