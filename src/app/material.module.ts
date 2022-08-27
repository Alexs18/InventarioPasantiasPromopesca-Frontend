import { NgModule } from "@angular/core";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    exports:[
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatProgressBarModule,
        MatToolbarModule
    ]
})

export class MaterialModule{}