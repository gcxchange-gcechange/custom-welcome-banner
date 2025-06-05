import * as React from "react";
import styles from "./CustomWelcomeBanner.module.scss";
import { ICustomWelcomeBannerProps } from "./ICustomWelcomeBannerProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { PrimaryButton, DefaultButton, useTheme } from "@fluentui/react";
import * as DOMPurify from 'dompurify';

const CustomWelcomeBanner: React.FC<ICustomWelcomeBannerProps> = (props) => {

  const theme = useTheme();

  const insertUserName = (text: string): string => {
    return text ? text.replace("{userName}", escape(props.userDisplayName)) : text;
  };

  const safeHtmlString = (text: string): string => {
    return text ? DOMPurify.sanitize(text) : text;
  }

  const bannerId = 'gcx-banner-' + new Date().getTime();

  return (
    <section
      className={`${styles.customWelcomeBanner} ${props.hasTeamsContext ? styles.teams : ""}`}
      aria-labelledby={bannerId}
      style={{
        backgroundColor: props.backgroundColor, 
        backgroundSize: props.imageSize, 
        backgroundImage: props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'background' ? `url(${props.imageUrl ? props.imageUrl : props.uploadImage})`: '' 
      }}
    >
      <div style={{
        display: 'flex', 
        flexDirection: props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'background' ? 'column' : 'row'
        }}
      >
        <div className={styles.welcome}>
          <h1 id={bannerId} className={styles.title} style={{ 
            color: props.titleColor !== '' ? props.titleColor: theme.palette.themePrimary, 
            fontSize: props.titleSize, 
            fontWeight: props.titleWeight 
            }}
            dangerouslySetInnerHTML={{ __html: safeHtmlString(insertUserName(props.title)) ?? ''}}
          />
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage} style={{ 
              color: props.subTextColor, 
              fontSize: props.subTextSize, 
              fontWeight: props.subTextWeight 
              }}
              dangerouslySetInnerHTML={{ __html: safeHtmlString(props.subText) ?? ''}}
            />
            <div className={styles.headerBackgroundImagePlaceHolder} />
          </div>
          <div className={styles.button}>
            {props.btnPrimaryText && props.btnPrimaryUrl && (
              <PrimaryButton 
                href={props.btnPrimaryUrl}
                target="_blank"
                rel="noreferrer"
                style={{padding: props.btnPadding}}
              >
                {props.btnPrimaryText}
              </PrimaryButton>
            )}
            {props.btnSecondaryText && props.btnSecondaryUrl && (
              <DefaultButton 
                href={props.btnSecondaryUrl}
                target="_blank"
                rel="noreferrer"
                style={{marginLeft: '30px', padding: props.btnPadding}}
              >
                {props.btnSecondaryText}
              </DefaultButton>
            )}
          </div>
        </div>

        {props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'aside' && (
          <div className={`${styles.asideImg}`}
          aria-hidden="true"
          style={{flex: '1', backgroundImage: `url(${props.imageUrl ? props.imageUrl : props.uploadImage})`, backgroundSize: props.imageSize}}>
            &nbsp;
          </div>
        )}

      </div>
    </section>
  );
};

export default CustomWelcomeBanner;