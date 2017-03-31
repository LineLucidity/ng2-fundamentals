import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { JQ_TOKEN,
        TOASTR_TOKEN,
        Toastr,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective } from './common/index'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr : Toastr
declare let jQuery : Object;

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
        LocationValidator
        ],
    providers: [EventService,
                { provide: TOASTR_TOKEN, useValue: toastr },
                { provide: JQ_TOKEN, useValue: jQuery },
                EventResolver,
                EventListResolver,
                VoterService,
                AuthService,
                { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
                ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to continue?')
    return true
}