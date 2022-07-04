import * as React from 'react';
import styles from './CustomWelcomeBanner.module.scss';
import { ICustomWelcomeBannerProps } from './ICustomWelcomeBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';

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
          <div className={styles.title}>Welcome to gcxchange {escape(userDisplayName)}</div>
          <div className={styles.welcomeMessage}>GCXchange makes it possible for public servants across the GC to collaborate in oneplace. Work on documents together in real-time, catch up on news and browse hubs of content that interests you!</div>
          <div className={styles.button}><a href="https://gcxgce.sharepoint.com/sites/Support/SitePages/Learn-more-about-gcxchange.aspx" target="_blank" rel="noreferrer">Learn more about gcxchange</a> </div>
        </div>
      </section>
    );
  }
}