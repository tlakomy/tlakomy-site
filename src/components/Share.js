import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from './Theming';

import { TwitterShareButton, FacebookShareButton } from 'react-share';

const Share = ({ url, title, twitterHandle }) => {
    const theme = useTheme();
    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                div {
                    margin-right: 20px;
                    cursor: pointer;
                    :hover {
                        color: ${theme.colors.primary};
                    }
                }
                span {
                    margin-right: 20px;
                    font-size: 70%;
                    text-transform: uppercase;
                    line-height: 2.5;
                    opacity: 0.7;
                }
            `}
        >
            <div
                css={css`
                    flex-grow: 1;
                    border-top: 1px solid ${theme.colors.gray};
                `}
            />
            <span>Share article</span>
            <TwitterShareButton
                url={url}
                quote={title}
                via={twitterHandle.split('@').join('')}
            >
                Twitter
            </TwitterShareButton>
            <FacebookShareButton
                url={url}
                quote={title}
                via={twitterHandle.split('@').join('')}
                css={css`
                    cursor: pointer;
                `}
            >
                Facebook
            </FacebookShareButton>
            <a
                href="https://www.buymeacoffee.com/tlakomy"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://cdn.buymeacoffee.com/buttons/lato-blue.png"
                    alt="Buy Me A Beer"
                    css={css`
                        height: 30px;
                        margin: 0;
                    `}
                    // style="height: 51px !important;width: 217px !important;"
                />
            </a>
        </div>
    );
};

export default Share;
