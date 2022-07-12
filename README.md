# custom-welcome-banner

## Summary
Custom welcome banner is a small web part developed using sharepoint react frame work. It is available in both English ang French languages. Language can be selected throug the property pane.

![screenshot of the property pane](./src/webparts/customWelcomeBanner/assets/screenshot1.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| custom-welcome-banner | [gcxchange-gcechange](https://github.com/gcxchange-gcechange) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | June, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp bundle --ship**
  - **gulp package-solution --ship**
- The package will be available in the following path: \custom-welcome-banner\sharepoint\solution\custom-welcome-banner.sppkg
- Add created package to your app catalog
- Add the app to a SharePoint site and then add the web part to the page

## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:
* Using the SPFx context to gather the current user's display name.
* Language selection (English/French) through the property pane.

## References
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
