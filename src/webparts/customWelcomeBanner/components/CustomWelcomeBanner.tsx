import * as React from 'react';
import styles from './CustomWelcomeBanner.module.scss';
import { ICustomWelcomeBannerProps } from './ICustomWelcomeBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'CustomWelcomeBannerWebPartStrings';

export default class CustomWelcomeBanner extends React.Component<ICustomWelcomeBannerProps, {}> {
  public render(): React.ReactElement<ICustomWelcomeBannerProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.customWelcomeBanner} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <div className={styles.title}>{strings.WelcomeTitle}{escape(userDisplayName)}</div>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage}>{strings.WelcomeMessage} </div>
            <div className={styles.headerBackgroundImagePlaceHolder}></div>
          </div>
          <div className={styles.button}>
            <a href={strings.AboutGcxchangeURL} target="_blank" rel="noreferrer">{strings.AboutGcxchangeText}</a>
          </div>
        </div>
      </section>
    );
  }
}