import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CollapsibleWellComponent,
        JQ_TOKEN,
        ModalTriggerDirective,
        SimpleModalComponent,
        Toastr,
        TOASTR_TOKEN } from './common/index';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import {
    CreateEventComponent,
    CreateSessionComponent,
    DurationPipe,
    EventDetailsComponent,
    EventListResolver,
    EventResolver,
    EventService,
    EventsListComponent,
    EventThumbnailComponent,
    LocationValidator,
    SessionListComponent,
    UpvoteComponent,
    VoterService,
} from './events/index';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        NavBarComponent,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator,
        ],
    providers: [EventService,
                { provide: TOASTR_TOKEN, useValue: toastr },
                { provide: JQ_TOKEN, useValue: jQuery },
                EventResolver,
                EventListResolver,
                VoterService,
                AuthService,
                { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
                ],
    bootstrap: [EventsAppComponent],
})
export class AppModule {}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to continue?');
    }
    return true;
}
