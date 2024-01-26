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
      mailtoButtonText,
    } = this.props;

    return (
      <section
        className={`${styles.customWelcomeBanner} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        <div className={styles.welcome}>
          <h2 className={styles.title}>
            {welcomeTitle}
            {escape(userDisplayName)}
          </h2>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage}>{welcomeMessage} </div>
            <div className={styles.headerBackgroundImagePlaceHolder} />
          </div>
          <div className={styles.button}>
            <a href={aboutGcxchangeButtonURL} target="_blank" rel="noreferrer">
              {aboutGcxchangeButtonText}
            </a>
          </div>
          {mailtoButtonText &&
            <div className={styles.button}>
              <a
                href={`mailto: ${mailtoButtonText}`}
                target="_blank"
                rel="noreferrer"
              >
                {mailtoButtonText}
              </a>
            </div>
  }
        </div>
      </section>
    );
  }
}
