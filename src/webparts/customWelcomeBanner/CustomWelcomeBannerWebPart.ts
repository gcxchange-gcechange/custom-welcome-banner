import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CustomWelcomeBannerWebPartStrings';
import CustomWelcomeBanner from './components/CustomWelcomeBanner';
import { ICustomWelcomeBannerProps } from './components/ICustomWelcomeBannerProps';

export interface ICustomWelcomeBannerWebPartProps {
  description: string;
  welcomeTitle: string;
  welcomeMessage: string;
  aboutGcxchangeButtonText: string;
  aboutGcxchangeButtonURL: string;
}

export default class CustomWelcomeBannerWebPart extends BaseClientSideWebPart<ICustomWelcomeBannerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ICustomWelcomeBannerProps> = React.createElement(
      CustomWelcomeBanner,
      {

        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        welcomeTitle: this.properties.welcomeTitle,
        welcomeMessage: this.properties.welcomeMessage,
        aboutGcxchangeButtonText: this.properties.aboutGcxchangeButtonText,
        aboutGcxchangeButtonURL: this.properties.aboutGcxchangeButtonURL,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  private validateEmptyField(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'This field cannot be empty';
    }    
    return '';
  }
  private validateURL(value:string):string {
    const urlregex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
      
    if (value === null ||
      value.trim().length === 0) {
      return 'This field cannot be empty';
    }    
    else if(!urlregex.test(value))
    {
      return 'Please type a valid URL';
    }
    return '';
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('welcomeTitle', {
                  label: 'Greeting',
                  onGetErrorMessage: this.validateEmptyField.bind(this),
                }),
                PropertyPaneTextField('welcomeMessage', {
                  label: 'Welcome Message',
                  onGetErrorMessage: this.validateEmptyField.bind(this),
                  multiline: true
                }),
                PropertyPaneTextField('aboutGcxchangeButtonText', {
                  label: 'Text for Button',
                  onGetErrorMessage: this.validateEmptyField.bind(this),
                }),
                PropertyPaneTextField('aboutGcxchangeButtonURL', {
                  label: 'URL for  Button',
                  onGetErrorMessage: this.validateURL.bind(this),
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
