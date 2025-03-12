import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
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
  titleSize: string;
  titleWeight: string;
  subText: string;
  subTextColor: string;
  subTextAlign: string;
  subTextSize: string;
  subTextWeight: string;
  btnPrimaryText: string;
  btnPrimaryUrl: string;
  btnSecondaryText: string;
  btnSecondaryUrl: string;
  btnPadding: string;
  imageUrl: string;
  imagePosition: string;
  imageSize: string;
  backgroundColor: string;
  uploadImage: string;
}

export default class CustomWelcomeBannerWebPart extends BaseClientSideWebPart<ICustomWelcomeBannerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _fileInput: HTMLInputElement;

  public render(): void {
    const element: React.ReactElement<ICustomWelcomeBannerProps> = React.createElement(
      CustomWelcomeBanner,
      {

        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        title: this.properties.title,
        titleColor: this.properties.titleColor,
        titleSize: this.properties.titleSize,
        titleWeight: this.properties.titleWeight,
        subText: this.properties.subText,
        subTextColor: this.properties.subTextColor,
        subTextSize: this.properties.subTextSize,
        subTextWeight: this.properties.subTextWeight,
        btnPrimaryText: this.properties.btnPrimaryText,
        btnPrimaryUrl: this.properties.btnPrimaryUrl,
        btnSecondaryText: this.properties.btnSecondaryText,
        btnSecondaryUrl: this.properties.btnSecondaryUrl,
        btnPadding: this.properties.btnPadding,
        imageUrl: this.properties.imageUrl,
        imagePosition: this.properties.imagePosition,
        imageSize: this.properties.imageSize,
        backgroundColor: this.properties.backgroundColor,
        uploadImage: this.properties.uploadImage
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

  private handleFileUpload = (): void => {
    if (!this._fileInput) {
      this._fileInput = document.createElement('input');
      this._fileInput.type = 'file';
      this._fileInput.accept = 'image/*';
      this._fileInput.style.display = 'none';
  
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
  
      this._fileInput.addEventListener('change', async function (event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
  
          const reader = new FileReader();
          reader.onload = function (e) {
            const base64 = e.target?.result as string;
  
            if (self.properties) {
              self.properties.uploadImage = base64;
              self.context.propertyPane.refresh();
              self.render();
            } else {
              console.error("self.properties is undefined");
            }
          };
          reader.readAsDataURL(file);
        }
      });
  
      document.body.appendChild(this._fileInput);
    }
    this._fileInput.click();
  };

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
                PropertyPaneTextField('titleSize', {
                  label: 'Title Size',
                  description: 'The size of the heading text.',
                }),
                PropertyPaneTextField('titleWeight', {
                  label: 'Title Weight',
                  description: 'The weight of the heading text.',
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
                PropertyPaneTextField('subTextSize', {
                  label: 'Sub Text Size',
                  description: 'The size of the text below the heading.',
                }),
                PropertyPaneTextField('subTextWeight', {
                  label: 'Sub Text Weight',
                  description: 'The weight of the text below the heading.',
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
                PropertyPaneTextField('btnPadding', {
                  label: 'Button Padding',
                  description: 'Padding given to the buttons.',
                  placeholder: '16px 40px',
                  value: this.properties.btnPadding ?? '10px 15px'
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
                }),
                PropertyPaneButton('uploadButton', {
                  text: "Upload Image",
                  onClick: this.handleFileUpload
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
