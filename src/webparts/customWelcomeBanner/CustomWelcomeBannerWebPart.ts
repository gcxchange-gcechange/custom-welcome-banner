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
  title: string;
  titleColor: string;
  titleAlign: string;
  subText: string;
  subTextColor: string;
  subTextAlign: string;
  btnPrimaryText: string;
  btnPrimaryUrl: string;
  btnSecondaryText: string;
  btnSecondaryUrl: string;
  imageUrl: string;
  imagePosition: string;
  imageSize: string;
  backgroundColor: string;
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
        title: this.properties.title,
        titleColor: this.properties.titleColor,
        subText: this.properties.subText,
        subTextColor: this.properties.subTextColor,
        btnPrimaryText: this.properties.btnPrimaryText,
        btnPrimaryUrl: this.properties.btnPrimaryUrl,
        btnSecondaryText: this.properties.btnSecondaryText,
        btnSecondaryUrl: this.properties.btnSecondaryUrl,
        imageUrl: this.properties.imageUrl,
        imagePosition: this.properties.imagePosition,
        imageSize: this.properties.imageSize,
        backgroundColor: this.properties.backgroundColor
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
                PropertyPaneTextField('title', {
                  label: 'Title',
                  description: 'The heading text of the banner.',
                  onGetErrorMessage: this.validateEmptyField.bind(this),
                }),
                PropertyPaneTextField('titleColor', {
                  label: 'Title Color',
                  description: 'Color of the heading text',
                }),
                PropertyPaneTextField('subText', {
                  label: 'Sub Text',
                  description: 'The text below the heading.',
                  multiline: true
                }),
                PropertyPaneTextField('subTextColor', {
                  label: 'Sub Text Color',
                  description: 'Color of the text below the heading.',
                }),
                PropertyPaneTextField('btnPrimaryText', {
                  label: 'Primary Button Text',
                  description: 'The text for the primary button.',
                }),
                PropertyPaneTextField('btnPrimaryUrl', {
                  label: 'Primary Button URL',
                  description: 'The URL for the primary button.',
                }),
                PropertyPaneTextField('btnSecondaryText', {
                  label: 'Secondary Button Text',
                  description: 'The text for the secondary button.',
                }),
                PropertyPaneTextField('btnSecondaryUrl', {
                  label: 'Secondary Button URL',
                  description: 'The URL for the secondary button.',
                }),
                PropertyPaneTextField('imageUrl', {
                  label: 'Image URL',
                  description: 'The URL for the image.',
                }),
                PropertyPaneTextField('imagePosition', {
                  label: 'Image Position',
                  description: 'The position of the image.',
                  placeholder: 'background or aside'
                }),
                PropertyPaneTextField('imageSize', {
                  label: 'Image Size',
                  description: 'The size of the image in CSS',
                  placeholder: 'auto cover, contain, etc.'
                }),
                PropertyPaneTextField('backgroundColor', {
                  label: 'Background Color',
                  description: 'The color of the background.',
                  placeholder: 'color, hex, or rgb'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
