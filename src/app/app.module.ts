﻿import { NgModule } from '@angular/core';
import * as ngCommon from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule, TooltipModule, TabsModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header.component';
import { HeaderNotificationsComponent } from './shared/layout/notifications/header-notifications.component';
import { SideBarComponent } from './shared/layout/side-bar.component';
import { FooterComponent } from './shared/layout/footer.component';
import { LoginAttemptsModalComponent } from '@app/shared/layout/login-attempts-modal.component';
import { ChangePasswordModalComponent } from '@app/shared/layout/profile/change-password-modal.component';
import { ChangeProfilePictureModalComponent } from '@app/shared/layout/profile/change-profile-picture-modal.component';
import { MySettingsModalComponent } from '@app/shared/layout/profile/my-settings-modal.component';
import { SmsVerificationModalComponent } from '@app/shared/layout/profile/sms-verification-modal.component';
import { LandingComponent } from './open/landing/landing.component';
import { AbpModule } from '@abp/abp.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { AppCommonModule } from './shared/common/app-common.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ImpersonationService } from './admin/users/impersonation.service';
import { LinkedAccountService } from './shared/layout/linked-account.service';
import { LinkedAccountsModalComponent } from '@app/shared/layout/linked-accounts-modal.component';
import { LinkAccountModalComponent } from '@app/shared/layout/link-account-modal.component';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';
import { NotificationSettingsModalCompoent } from './shared/layout/notifications/notification-settings-modal.component';
import { UserNotificationHelper } from './shared/layout/notifications/UserNotificationHelper';
import { ChatBarComponent } from './shared/layout/chat/chat-bar.component';
import { ChatFriendListItem } from './shared/layout/chat/chat-friend-list-item.component';
import { ChatSignalrService } from '@app/shared/layout/chat/chat-signalr.service';
import { QuickSideBarChat } from '@app/shared/layout/chat/QuickSideBarChat';
import { DataTableModule, PaginatorModule, DropdownModule } from 'primeng/primeng';
import { OrganizationUnitsTreeComponent } from "@app/shared/organization-unit-tree.component";
import { InputTextModule,AutoCompleteModule } from 'primeng/primeng';
import { TosModalComponent } from "@app/shared/layout/tos-modal.component";
import { TosModalService } from "@app/shared/layout/tos-modal.service";
import { dcHttpService } from "@app/services/dcHttpService";
import {MySettingsModalServices} from "@app/shared/layout/profile/my-settings-modal-service";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TosModalComponent,
        HeaderNotificationsComponent,
        SideBarComponent,
        FooterComponent,
        LoginAttemptsModalComponent,
        LinkedAccountsModalComponent,
        LinkAccountModalComponent,
        ChangePasswordModalComponent,
        ChangeProfilePictureModalComponent,
        MySettingsModalComponent,
        SmsVerificationModalComponent,
        NotificationsComponent,
        LandingComponent,
        ChatBarComponent,
        ChatFriendListItem,
        NotificationSettingsModalCompoent,
        OrganizationUnitsTreeComponent
    ],
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        FileUploadModule,
        AbpModule,
        AppRoutingModule,
        UtilsModule,
        AppCommonModule.forRoot(),
        ServiceProxyModule,
        DataTableModule,
        PaginatorModule,
        BrowserAnimationsModule,
        DropdownModule,
        InputTextModule,
        AutoCompleteModule
    ],
    providers: [
        ImpersonationService,
        LinkedAccountService,
        UserNotificationHelper,
        ChatSignalrService,
        TosModalService,
        dcHttpService,
        QuickSideBarChat,
        MySettingsModalServices
    ]
})
export class AppModule { }
