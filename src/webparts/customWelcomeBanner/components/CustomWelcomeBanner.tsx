import * as React from 'react';
import styles from './CustomWelcomeBanner.module.scss';
import { ICustomWelcomeBannerProps } from './ICustomWelcomeBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';
// import * as strings from 'CustomWelcomeBannerWebPartStrings';
import { SelectLanguage } from './SelectLanguage';


export default class CustomWelcomeBanner extends React.Component<ICustomWelcomeBannerProps, {}> {
  constructor(props: ICustomWelcomeBannerProps) {
    super(props);

    this.state = {
      groups: [],

    };
  }


  public strings = SelectLanguage(this.props.prefLang);
  public render(): React.ReactElement<ICustomWelcomeBannerProps> {
    const {
      hasTeamsContext,
      userDisplayName,
      prefLang
    } = this.props;

    return (
      <section className={`${styles.customWelcomeBanner} ${hasTeamsContext ? styles.teams : ''}`}>
        <p>{
          //testingAgain:{prefLang}
        }
        </p>
        <div className={styles.welcome}>
          <div className={styles.title}>{this.strings.WelcomeTitle}{escape(userDisplayName)}</div>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage}>{this.strings.WelcomeMessage} </div>
            <div className={styles.headerBackgroundImagePlaceHolder}></div>
          </div>
          <div className={styles.button}>
            <a href={this.strings.AboutGcxchangeURL} target="_blank" rel="noreferrer">{this.strings.AboutGcxchangeText}</a>
          </div>
        </div>
      </section>
    );
  }

}