# Name of the application

## Summary

Short description of what the webpart do. Give the basic information and feature of the app. 

_Adding a visualisation is possible. Need to keep in mind that it should only reflect what is provide in the short description. Plus, an short description of the image or animation need to be provide in the alt._

## Prerequisites
None
## API permission
None
## Version 
![SPFX](https://img.shields.io/badge/SPFX-1.17.4-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16.13+-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Version history

| Version | Date         | Comments                |
| ------- | ------------ | ----------------------- |
| 1.0     | Jul 29, 2022 | Initial release         |
| 1.1     | Jan 20, 2024 | Upgraded to SPFX 1.17.4 |


## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - **npm install**
  - **gulp serve**
- You will need to add your client id and azure function to the `clientId` and `url` classs members at the top of the filename.tsx file.
- To debug in the front end:
  - go to the `serve.json` file and update `initialPage` to `https://domain-name.sharepoint.com/_layouts/15/workbench.aspx`
  - Run the command **gulp serve**
- To deploy: in the command-line run
  - **gulp bundle --ship**
  - **gulp package-solution --ship**
- Add the webpart to your tenant app store
- Add the Webpart to a page
- Edit the webpart
  - Enter the Greeting, Welcome Message and Text for Button in required language in the property pane (setting)
  - Enter the URL for button in the property pane (setting)
- Save and publish the page


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**