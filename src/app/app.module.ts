import {AppComponent} from './app.component';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
