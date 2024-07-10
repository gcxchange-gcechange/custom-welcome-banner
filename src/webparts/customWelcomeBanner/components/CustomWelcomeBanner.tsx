/* eslint-disable react/self-closing-comp */
import * as React from "react";
import styles from "./CustomWelcomeBanner.module.scss";
import { ICustomWelcomeBannerProps } from "./ICustomWelcomeBannerProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class CustomWelcomeBanner extends React.Component<
  ICustomWelcomeBannerProps,
  {}
> {
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
      button2Text,
      button2Link,
    } = this.props;

    return (
      <section
        className={`${styles.customWelcomeBanner} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
      
          <div className={styles.welcome}>
            <h1 className={styles.title}>
              {welcomeTitle}&nbsp;
              {escape(userDisplayName)}
            </h1>
            <div className={styles.welcomeMessageContainer}>
              <div className={styles.welcomeMessage}>{welcomeMessage} </div>
              <div className={styles.headerBackgroundImagePlaceHolder} />
            </div>
            <div className={styles.button}>
              <a
                href={aboutGcxchangeButtonURL}
                target="_blank"
                rel="noreferrer"
              >
                {aboutGcxchangeButtonText}
              </a>
              {button2Text && button2Link && (
                <a
                  href={`${button2Link}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: 50 }}
                >
                  {button2Text}
                </a>
              )}
            </div>
          </div>
        
      </section>
    );
  }
}
