﻿import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { ProfileServiceProxy, CurrentUserProfileEditDto, DefaultTimezoneScope, UpdateGoogleAuthenticatorKeyOutput } from "@shared/service-proxies/service-proxies";
import { AppSessionService } from '@shared/common/session/app-session.service'
import { AppTimezoneScope } from '@shared/AppEnums';
import { SmsVerificationModalComponent } from './sms-verification-modal.component';
import {MySettingsModalServices} from "@app/shared/layout/profile/my-settings-modal-service";

@Component({
    selector: 'mySettingsModal',
    templateUrl: './my-settings-modal.component.html'
})
export class MySettingsModalComponent extends AppComponentBase {


    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('mySettingsModal') modal: ModalDirective;
    @ViewChild('smsVerificationModal') smsVerificationModal: SmsVerificationModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active: boolean = false;
    public saving: boolean = false;
    public isGoogleAuthenticatorEnabled: boolean = false;
    public isPhoneNumberConfirmed: boolean;
    public isPhoneNumberEmpty: boolean = false;
    public smsEnabled: boolean;
    public wallets: any = {};
    public updatesWallets: any = [];
    public updatesWallet: any = {};
    public user: CurrentUserProfileEditDto;
    public showTimezoneSelection: boolean = abp.clock.provider.supportsMultipleTimezone;
    public canChangeUserName: boolean;
    public defaultTimezoneScope: DefaultTimezoneScope = AppTimezoneScope.User;
    private _initialTimezone: string = undefined;

    constructor(
        injector: Injector,
        private _profileService: ProfileServiceProxy,
        private _appSessionService: AppSessionService,
        public mySettingsModalServices: MySettingsModalServices
    ) {
        super(injector);
      //  this.wallets = {};
      //   this.getWallets();
    }

    ngOnInit(){
        this.getWallets();
    }

    show(): void {
        this.active = true;
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            this.smsEnabled = this.setting.getBoolean("App.UserManagement.SmsVerificationEnabled");
            this.user = result;
            this._initialTimezone = result.timezone;
            this.canChangeUserName = this.user.userName !== AppConsts.userManagement.defaultAdminUserName;
            this.modal.show();
            this.isGoogleAuthenticatorEnabled = result.isGoogleAuthenticatorEnabled;
            this.isPhoneNumberConfirmed = result.isPhoneNumberConfirmed;
            this.isPhoneNumberEmpty = result.phoneNumber === "";
        });

    }

    updateQrCodeSetupImageUrl(): void {
        this._profileService.updateGoogleAuthenticatorKey().subscribe((result: UpdateGoogleAuthenticatorKeyOutput) => {
            this.user.qrCodeSetupImageUrl = result.qrCodeSetupImageUrl;
            this.isGoogleAuthenticatorEnabled = true;
        });
    }

    smsVerify(): void {
        this._profileService.sendVerificationSms()
            .subscribe(() => {
                 this.smsVerificationModal.show();
        });
    }

    changePhoneNumberToVerified(): void {
        this.isPhoneNumberConfirmed = true;
    }

    onShown(): void {
        $(this.nameInput.nativeElement).focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this.updateWallets();
        this._profileService.updateCurrentUserProfile(this.user)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this._appSessionService.user.name = this.user.name;
                this._appSessionService.user.surname = this.user.surname;
                this._appSessionService.user.userName = this.user.userName;
                this._appSessionService.user.emailAddress = this.user.emailAddress;
                this._appSessionService.user.eth = this.user.eth;
                this._appSessionService.user.waves = this.user.waves;

                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);

                if (abp.clock.provider.supportsMultipleTimezone && this._initialTimezone !== this.user.timezone) {
                    this.message.info(this.l('TimeZoneSettingChangedRefreshPageNotification')).done(() => {
                        window.location.reload();
                    });
                }
            });
    }

    public getWallets() {
        console.log('work');
        this.mySettingsModalServices.getSupportedWallets()
            .finally(() => {})
            .subscribe((data) => {
                console.log(data.items);
                Object.assign(this.wallets, data)
            });
    }
    public updateWallets() {
        console.log(this.updatesWallets);
        this.mySettingsModalServices.updateSupportedWallets(this.wallets.items)
            .finally(() => {})
            .subscribe((data) => {
                console.log('updateWallets ok');
            });
    }
}
