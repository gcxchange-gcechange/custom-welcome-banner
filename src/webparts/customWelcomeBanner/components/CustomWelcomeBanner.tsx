import * as React from "react";
import styles from "./CustomWelcomeBanner.module.scss";
import { ICustomWelcomeBannerProps } from "./ICustomWelcomeBannerProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { PrimaryButton, DefaultButton  } from "@fluentui/react";

const CustomWelcomeBanner: React.FC<ICustomWelcomeBannerProps> = (props) => {

  const transformText = (text: string): string => {
    return text ? text.replace("{userName}", escape(props.userDisplayName)) : text;
  };

  return (
    <section
      className={`${styles.customWelcomeBanner} ${props.hasTeamsContext ? styles.teams : ""}`}
      style={{
        backgroundColor: props.backgroundColor, 
        backgroundSize: props.imageSize, 
        backgroundImage: props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'background' ? `url(${props.imageUrl})`: '' 
      }}
    >
      <div style={{
        display: 'flex', 
        flexDirection: props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'background' ? 'column' : 'row'
        }}
      >
        <div className={styles.welcome}>
          <h1 className={styles.title} style={{ color: props.titleColor }}>
            {transformText(props.title)}
          </h1>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage} style={{ color: props.subTextColor }}>
              {props.subText}
            </div>
            <div className={styles.headerBackgroundImagePlaceHolder} />
          </div>
          <div className={styles.button}>
            {props.btnPrimaryText && props.btnPrimaryUrl && (
              <PrimaryButton 
                href={props.btnPrimaryUrl}
                target="_blank"
                rel="noreferrer"
              >
                {props.btnPrimaryText}
              </PrimaryButton>
            )}
            {props.btnSecondaryText && props.btnSecondaryUrl && (
              <DefaultButton 
                href={props.btnSecondaryUrl}
                target="_blank"
                rel="noreferrer"
                style={{marginLeft: '30px'}}
              >
                {props.btnSecondaryText}
              </DefaultButton>
            )}
          </div>
        </div>

        {props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'aside' && (
          <div className={`${styles.asideImg}`}
          style={{flex: '1', backgroundImage: `url(${props.imageUrl})`, backgroundSize: props.imageSize}}>
            &nbsp;
          </div>
        )}

      </div>
    </section>
  );
};

export default CustomWelcomeBanner;