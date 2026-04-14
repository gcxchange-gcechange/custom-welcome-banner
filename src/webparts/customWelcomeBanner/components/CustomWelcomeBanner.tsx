/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./CustomWelcomeBanner.module.scss";
import { ICustomWelcomeBannerProps } from "./ICustomWelcomeBannerProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { PrimaryButton, DefaultButton, useTheme, Link, Stack, Image } from "@fluentui/react";


const CustomWelcomeBanner: React.FC<ICustomWelcomeBannerProps> = (props) => {

  const theme = useTheme();
  const sanitizeHtml = require('sanitize-html');
 

  const insertUserName = (text: string): string => {
    return text ? text.replace("{userName}", escape(props.userDisplayName)) : text;
  };

  const safeHtmlString = (text: string): string => {
    return text ?  sanitizeHtml(text) : text;
  }

  const bannerId = 'gcx-banner-' + new Date().getTime();

console.log("hori", props.verticalAlign)
  return (
    <>
    {props.layout === "inline" ? (
      <Stack horizontal verticalAlign={props.verticalAlign as any} horizontalAlign={props.horizontalAlign as any}>
        <Image src={props.imageUrl || props.uploadImage} alt="banner" />
        <h3>{props.inLineText}</h3>
        {props.btnType === 'Primary' &&  <PrimaryButton/>}
        {props.btnType === "Default" && <DefaultButton/>}

      </Stack>
    ) : (
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
        <div className={styles.welcome} style={{padding: props.bannerPadding}}>
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
              <Link
                href={props.btnPrimaryUrl}
                target={props.btnPrimaryTarget}
                rel="noreferrer"
              >
                <PrimaryButton 
                  styles={{ root: { padding: props.btnPadding } }}
                >
                  {props.btnPrimaryText}
                </PrimaryButton>
              </Link>
            )}
            {props.btnSecondaryText && props.btnSecondaryUrl && (
              <Link
                href={props.btnSecondaryUrl}
                target={props.btnSecondaryTarget}
                rel="noreferrer"
              >
                <DefaultButton 
                  styles={{ root: {marginLeft: '30px', padding: props.btnPadding} }}
                >
                  {props.btnSecondaryText}
                </DefaultButton>
              </Link>
            )}
          </div>
        </div>

        {props.imagePosition && props.imagePosition.toLocaleLowerCase() === 'aside' && (
          <div className={`${styles.asideImg}`}
          aria-hidden="true"
          style={{flex: '1', backgroundImage: `url(${props.imageUrl ? props.imageUrl : props.uploadImage})`, backgroundSize: props.imageSize, minWidth: props.minImgWidth}}>
            &nbsp;
          </div>
        )}

      </div>
    </section>
    )}
    </>
  );
};

export default CustomWelcomeBanner;