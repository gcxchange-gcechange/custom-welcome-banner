declare interface ICustomWelcomeBannerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CustomWelcomeBannerWebPartStrings' {
  const strings: ICustomWelcomeBannerWebPartStrings;
  export = strings;
}
