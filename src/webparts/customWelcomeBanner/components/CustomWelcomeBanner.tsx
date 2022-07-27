import * as React from 'react';
import styles from './CustomWelcomeBanner.module.scss';
import { ICustomWelcomeBannerProps } from './ICustomWelcomeBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SelectLanguage } from './SelectLanguage';


export default class CustomWelcomeBanner extends React.Component<ICustomWelcomeBannerProps, {}> {
  constructor(props: ICustomWelcomeBannerProps) {
    super(props);
  }

  public render(): React.ReactElement<ICustomWelcomeBannerProps> {
    const {
      hasTeamsContext,
      userDisplayName,
      welcomeMessage,
      welcomeTitle,
      aboutGcxchangeButtonText,
      aboutGcxchangeButtonURL,
    } = this.props;

    return (
      <section className={`${styles.customWelcomeBanner} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <div className={styles.title}>{welcomeTitle}{escape(userDisplayName)}</div>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage}>{welcomeMessage} </div>
            <div className={styles.headerBackgroundImagePlaceHolder}></div>
          </div>
          <div className={styles.button}>
            <a href={aboutGcxchangeButtonURL} target="_blank" rel="noreferrer">{aboutGcxchangeButtonText}</a>
          </div>
        </div>
      </section>
    );
  }

}