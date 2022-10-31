import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import App from 'renderer/App';

export type Props = {
    Body_Reply: any;
};

const ArticleReply = ({ Body_Reply }: Props) => {
    const pic = Body_Reply.Reply_pic;
    const name = Body_Reply.Reply_name;
    const concent = Body_Reply.Reply_concent;
    const time = Body_Reply.Reply_time;

    return (
        <div className="mb-5 flex flex-row items-start">
            <div
                dangerouslySetInnerHTML={{ __html: pic }}
                className="mr-1 h-12 max-h-fit w-12 max-w-full desktop:mr-3"
            ></div>

            <div className="flex w-full flex-col items-start">
                <div className="flex w-full flex-row items-start">
                    <div
                        dangerouslySetInnerHTML={{ __html: name }}
                        className="mr-5 whitespace-nowrap text-teal-700 font-medium"
                    ></div>

                    <div
                        dangerouslySetInnerHTML={{ __html: concent }}
                        className="w-full"
                    ></div>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: time }}
                    className="w-full flex flex-row text-zinc-500"
                ></div>
            </div>
        </div>
    );
};

export default ArticleReply;
