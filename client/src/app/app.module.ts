/* This is the main module of an Angular application that imports and declares various components,
modules, and interceptors. */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import ErrorInterceptor from './_interceptor/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { FooterComponent } from './footer/footer.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModelComponent } from './models/roles-model/roles-model.component';
import { RouteReuseStrategy } from '@angular/router';
import { customRouteReuseStartegy } from './_services/customRouteReuse';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { ChatserviceComponent } from './chatservice/chatservice.component';
import { UserlistComponent } from './chatservice/userlist/userlist.component';
import { MessagethreatComponent } from './chatservice/messagethreat/messagethreat.component';
import { ChatprofileComponent } from './chatservice/chatprofile/chatprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModelComponent,
    ConfirmDialogComponent,
    UserlistComponent,
    MessagethreatComponent,
    ChatprofileComponent,
    ChatserviceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    EditorModule
    
  ],
 
  /* `providers: [{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}]` is registering an
  HTTP interceptor in the Angular application. The `HTTP_INTERCEPTORS` token is used to provide a
  list of interceptors that will be used to intercept HTTP requests and responses. In this case, the
  `ErrorInterceptor` class is being used as the interceptor. The `multi: true` option indicates that
  this interceptor is not the only one and that it should be added to the existing list of
  interceptors. */
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide: RouteReuseStrategy,useClass:customRouteReuseStartegy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
