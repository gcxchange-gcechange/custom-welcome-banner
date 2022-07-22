declare interface ICustomWelcomeBannerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;

  UserLang:string;
  
  welcomeTitle:string;
  welcomeMessage:string;
  aboutGcxchangeButtonText:sting
  aboutGcxchangeButtonURL:string;    
}

declare module 'CustomWelcomeBannerWebPartStrings' {
  const strings: ICustomWelcomeBannerWebPartStrings;
  export = strings;
}
