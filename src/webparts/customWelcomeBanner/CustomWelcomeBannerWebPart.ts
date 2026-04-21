import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CustomWelcomeBannerWebPartStrings';
import CustomWelcomeBanner from './components/CustomWelcomeBanner';
import { ICustomWelcomeBannerProps } from './components/ICustomWelcomeBannerProps';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';
 

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
  subTextMargin: string;
  btnPrimaryText: string;
  btnPrimaryUrl: string;
  btnPrimaryTarget: string;
  btnSecondaryText: string;
  btnSecondaryUrl: string;
  btnSecondaryTarget: string;
  btnPadding: string;
  imageUrl: string;
  imagePosition: string;
  imageSize: string;
  backgroundColor: string;
  uploadImage: string;
  minImgWidth: string;
  bannerPadding: string;
  layout: string;
  // inLineText:string;
  btnType: string;
  verticalAlign: string;
  horizontalAlign: string;
  imgUrl: string;
  uploadImg: string;
  color: string;
  htmlCode: string;
  btnText: string;
  bckGrndColor: string;
  height: number;
  width: number;
  iconPicker: string;
  iconColor:string;
  bannerPaddingValue: number;
  paddingRightTxt: string;
  paddingLeftTxt: string;
  iconSize: string;
  buttonTextSize:string;

 
  
}

export default class CustomWelcomeBannerWebPart extends BaseClientSideWebPart<ICustomWelcomeBannerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _fileInput: HTMLInputElement | undefined;

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
        subTextMargin: this.properties.subTextMargin,
        btnPrimaryText: this.properties.btnPrimaryText,
        btnPrimaryUrl: this.properties.btnPrimaryUrl,
        btnPrimaryTarget: this.properties.btnPrimaryTarget,
        btnSecondaryText: this.properties.btnSecondaryText,
        btnSecondaryUrl: this.properties.btnSecondaryUrl,
        btnSecondaryTarget: this.properties.btnSecondaryTarget,
        btnPadding: this.properties.btnPadding,
        imageUrl: this.properties.imageUrl,
        imagePosition: this.properties.imagePosition,
        imageSize: this.properties.imageSize,
        backgroundColor: this.properties.backgroundColor,
        uploadImage: this.properties.uploadImage,
        minImgWidth: this.properties.minImgWidth,
        bannerPadding: this.properties.bannerPadding,
        layout: this.properties.layout,
        // inLineText: this.properties.inLineText,
        btnType: this.properties.btnType,
        btnText: this.properties.btnText,
        verticalAlign: this.properties.verticalAlign,
        horizontalAlign: this.properties.horizontalAlign,
        imgUrl: this.properties.imgUrl,
        uploadImg: this.properties.uploadImg,
        color: this.properties.color,
        htmlCode: this.properties.htmlCode,
        bckGrndColor: this.properties.bckGrndColor,
        height: this.properties.height,
        width: this.properties.width,
        iconPicker: this.properties.iconPicker,
        iconColor: this.properties.iconColor,
        iconSize: this.properties.iconSize,
        bannerPaddingValue: this.properties.bannerPaddingValue,
        paddingRightTxt: this.properties.paddingRightTxt,
        paddingLeftTxt: this.properties.paddingLeftTxt,
        buttonTextSize: this.properties.buttonTextSize,


 
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
    console.log("handle file upload called");
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
  
            self.properties.uploadImage = base64;
            self.properties.imageUrl = '';
            self.context.propertyPane.refresh();
            self.render();
          };
          reader.readAsDataURL(file);
        }
      });
  
      document.body.appendChild(this._fileInput);
    }
    this._fileInput.click();
  };

  private handleClearImage = (): void => {
    console.log("img", this.properties)
    this.properties.uploadImage = '';
    this.properties.imageUrl = '';
    this.context.propertyPane.refresh();
    this.render();
  }

  private clearIcon = (): void => {
    this.properties.iconPicker = '';
    this.context.propertyPane.refresh();
    this.render();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string): void {
    console.log(`Property pane field changed: ${propertyPath}`);
    if (propertyPath === 'layout') {
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const isRegular = this.properties.layout === 'regular';
    const isInline = this.properties.layout === 'inline';
    

    if (!this.properties.btnPadding) 
      this.properties.btnPadding = '10px 15px';
    if (!this.properties.imagePosition) 
      this.properties.imagePosition = 'aside';
    if (!this.properties.backgroundColor) 
      this.properties.backgroundColor = 'transparent';
    if (!this.properties.minImgWidth)
      this.properties.minImgWidth = 'revert-layer';
    if (!this.properties.bannerPadding)
      this.properties.bannerPadding = 'revert-layer';

    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Layout",
                groupFields: [
                  PropertyPaneChoiceGroup('layout', {
                    label: 'Banner Layout',
                    options: [
                      { key: 'regular', text: 'Regular Banner' },
                      { key: 'inline', text: 'Inline Banner' }
                    ]
                  })
                ]
            },
            ...(isRegular ? [{
              groupName: "RegularBanner",
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
                PropertyPaneTextField('subTextMargin', {
                  label: 'Sub Text Margin',
                  description: 'The margin of the text below the heading.',
                }),
                PropertyPaneTextField('btnPrimaryText', {
                  label: 'Primary Button Text',
                  description: 'The text for the primary button.',
                }),
                PropertyPaneTextField('btnPrimaryUrl', {
                  label: 'Primary Button URL',
                  description: 'The URL for the primary button.',
                }),
                PropertyPaneTextField('btnPrimaryTarget', {
                  label: 'Primary Button Target'
                }),
                PropertyPaneTextField('btnSecondaryText', {
                  label: 'Secondary Button Text',
                  description: 'The text for the secondary button.',
                }),
                PropertyPaneTextField('btnSecondaryUrl', {
                  label: 'Secondary Button URL',
                  description: 'The URL for the secondary button.',
                }),
                PropertyPaneTextField('btnSecondaryTarget', {
                  label: 'Secondary Button Target'
                }),
                PropertyPaneTextField('btnPadding', {
                  label: 'Button Padding',
                  description: 'Padding given to the buttons.',
                  placeholder: '16px 40px'
                }),
                PropertyPaneTextField('imageUrl', {
                  label: 'Image URL',
                  description: 'The URL for the image.',
                }),
                PropertyPaneButton('uploadButton', {
                  text: 'Upload Image',
                  description: 'Upload an image from your computer. This will automatically clear the "Image URL" field.',
                  buttonType: 3,
                  onClick: this.handleFileUpload
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
                PropertyPaneTextField('minImgWidth', {
                  label: 'Image Min Width',
                  description: 'The minimum width of the image',
                  placeholder: '30%'
                }),
                PropertyPaneTextField('bckGrndColor', {
                  label: 'Background Color',
                  description: 'The color of the background.',
                  placeholder: 'color, hex, or rgb'
                }),
                PropertyPaneTextField('bannerPadding', {
                  label: 'Banner Padding',
                  description: 'Padding for the banner (CSS)',
                  placeholder: '20px 20px'
                }),
              ]
            }]: []),
            
            ...(isInline ? 
              [
                {
                  groupName:"Banner Container Configuration",
                  isCollapsed:true,
                  groupFields: [
                    PropertyPaneSlider('height', {
                      label: 'Height of Banner (in pixels)',
                      min: 1,
                      max: 200,
                      step: 1,
                      value: this.properties.height || 100
                    }),

                    PropertyPaneSlider('width', {
                      label: 'Width of Banner (in percentage)',
                      min: 1,
                      max: 100,
                      step: 1,
                      value: this.properties.width || 100
                    }),
                    
                    PropertyPaneTextField("bannerPaddingValue", {
                      label: "Banner Padding Value",
                      description: "The padding value for the banner (in pixels)",
                      placeholder: '20px'
                    }),

                    PropertyPaneTextField('bckGrndColor', {
                      label: 'Background Color of Banner',
                      description: 'The color of the background.',
                      placeholder: 'color, hex, or rgb'
                    }),

                  ]
                },
                {
                  groupName: "Content Alignment",
                  isCollapsed: true,
                  groupFields: [
                    PropertyPaneDropdown('verticalAlign', {
                      label: 'Vertical Alignment',
                      options: [
                        { key: 'start', text: 'Left' },
                        { key: 'center', text: 'Center' },
                        { key: 'end', text: 'Right' },
                      ]
                    }),
                    PropertyPaneDropdown('horizontalAlign', {
                      label: 'Horizontal Alignment',
                      options: [
                        { key: 'start', text: 'Left' },
                        { key: 'center', text: 'Center' },
                        { key: 'end', text: 'Right' },
                        { key: 'space-around', text: 'Space around' },
                        { key: 'space-between', text: 'Space between' },
                        { key: 'space-evenly', text: 'Space evenly' },
                    ]
                    }),
                  ]
                },
                {
                  groupName: "Text Configuration",
                  isCollapsed: true,
                  groupFields: [
                    PropertyFieldCodeEditor('htmlCode', {
                      label: 'Edit HTML Code',
                      panelTitle: 'Edit HTML Code',
                      initialValue: this.properties.htmlCode,
                      onPropertyChange: this.onPropertyPaneFieldChanged,
                      properties: this.properties,
                      disabled: false,
                      key: 'codeEditorFieldId',
                      language: PropertyFieldCodeEditorLanguages.HTML,
                      options: {
                        wrap: true,
                        fontSize: 20,
                      }
                    }),
                  ]
                },

                {
                  groupName:"Icon Configuration",
                  isCollapsed:true,
                  groupFields: [

                    PropertyFieldIconPicker('iconPicker', {
                      currentIcon: this.properties.iconPicker,
                      key: "iconPickerId",
                      onSave: (icon: string) => { console.log(icon); this.properties.iconPicker = icon; },
                      onChanged:(icon: string) => { console.log(icon);  },
                      buttonLabel: "Icon",
                      renderOption: "dialog",
                      properties: this.properties,
                      onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                      label: "Icon Picker"              
                    }),

                    PropertyPaneButton('clearIcon', {
                      text: 'Clear Icon',
                      buttonType: 1,
                      onClick: this.clearIcon
                    }),

                    PropertyPaneTextField('iconColor', {
                      label: 'Icon Color',
                      description: 'The color of the icon.',
                      placeholder: 'color, hex, or rgb'
                    }),

                    PropertyPaneTextField('iconSize', {
                      label: 'Icon Size',
                      description: 'The size of the icon.',
                      placeholder: 'e.g., 20px'
                    }),

                  ]
                },
                 {
                  groupName:"Image Configuration",
                  isCollapsed:true,
                  groupFields: [
                    PropertyPaneTextField('imgUrl', {
                      label: 'Image URL',
                      description: 'The URL for the image.',
                    }),
                    PropertyPaneButton('uploadImgButton', {
                      text: 'Upload Image',
                      description: 'Upload an image from your computer. This will automatically clear the "Image URL" field.',
                      buttonType: 3,
                      onClick: this.handleFileUpload
                    }),

                    PropertyPaneButton('resetImgBtn', {
                      text: 'Clear Image',
                      description: 'Automatically clear the "Upload Image" fields.',
                      buttonType: 1,
                      onClick: this.handleClearImage.bind(this)

                    }),
                  ]
                },
                 {
                  groupName:"Button Configuration",
                  isCollapsed:true,
                  groupFields: [
                    PropertyPaneChoiceGroup('btnType', {
                      label: 'Button Type',
                      options: [
                        { key: 'Primary', text: 'Primary Button' },
                      ]
                    }),
                    PropertyPaneTextField('btnText', {
                      label: 'Button Text',
                      description: 'The text for the button.',
                    }),

                    PropertyPaneTextField('buttonTextSize', {
                      label: 'Button Text Size',
                      description: 'The size of the button text.',
                      placeholder: 'e.g., 16px'
                    }),


                    PropertyFieldColorPicker('color', {
                      label: 'Button Color Picker',
                      selectedColor: this.properties.color,
                      onPropertyChange: this.onPropertyPaneFieldChanged,
                      properties: this.properties,
                      disabled: false,
                      debounce: 1000,
                      isHidden: false,
                      alphaSliderHidden: false,
                      style: PropertyFieldColorPickerStyle.Full,
                      iconName: 'Precipitation',
                      key: 'colorFieldId',
                  
                    }),
                  ]
                },

          
          ]
            :[])
          ]
        }
      ]
    };
  }
}
