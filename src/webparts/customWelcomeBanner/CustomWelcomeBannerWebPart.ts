import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {

          groups: [
            {
              groupFields: [
                // PropertyPaneDropdown('prefLang', {
                //   label: 'Preferred Language',
                //   options: [
                //     { key: 'account', text: 'Account' },
                //     { key: 'en-us', text: 'English' },
                //     { key: 'fr-fr', text: 'Français' }
                //   ]
                // }),
                PropertyPaneTextField('welcomeTitle', {
                  label: 'Greeting'
                }),
                PropertyPaneTextField('welcomeMessage', {
                  label: 'Welcome Message',
                  multiline: true
                }),
                PropertyPaneTextField('aboutGcxchangeButtonText', {
                  label: 'Text for Button',
                }),
                PropertyPaneTextField('aboutGcxchangeButtonURL', {
                  label: 'URL for  Button',
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
