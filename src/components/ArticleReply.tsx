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
    const [Concent, setConcent] = React.useState();

    const pic = Body_Reply.Reply_pic;
    const name = Body_Reply.Reply_name;
    let concent = Body_Reply.Reply_concent;
    const time = Body_Reply.Reply_time;

    useEffect(() => {
        function HyperLinkConverter(text: any) {
            var urlRegex =
                /(\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|])/gi;

            var BahaImg = 
                /(https:\/\/truth\.bahamut\.com\.tw\/s01\/[0-9]+\/(([0-9a-z)+([0-9a-z]+)+)\.JPG\?w=300)/gi

            var Gif = 
                /(https:\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]\.gif)/gi
            
            var youtube = 
                /((http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?))/gi
            

            if (text.match(BahaImg)) {
                // add logic
                text = text.toString().replace(BahaImg, 
                    "<a href='$1' target='_blank'><img src='$1'></img></a>"
                );
            }
            else if (text.match(Gif)) {
                text = text.toString().replace(Gif, 
                    "<a href='$1' target='_blank'><img src='$1'></img></a>"
                );
            }
            else if (text.match(youtube)) {
                text = text.toString().replace(youtube, 
                    "<iframe width='50%' src='https://www.youtube.com/embed/$3' frameborder='0'></iframe>"
                );
            }
            else {
                text = text.toString().replace(urlRegex, 
                    "<a href='$1' target='_blank' class='text-teal-600'>$1</a>"
                );
            }

            return text;
        }

        concent = HyperLinkConverter(concent); 
        setConcent(concent);
    }, []);

    //console.log(Concent);

    return (
        <div className="mb-5 flex flex-row items-start">
            <div
                dangerouslySetInnerHTML={{ __html: pic }}
                className="mr-1 h-12 max-h-fit w-0 desktop:w-12 max-w-full desktop:mr-3"
            ></div>

            <div className="flex w-full flex-col items-start">
                <div className="flex w-full flex-row items-start">
                    <div
                        dangerouslySetInnerHTML={{ __html: name }}
                        className="mr-5 whitespace-nowrap font-medium text-teal-700 
                        text-sm desktop:text-base"
                    ></div>

                    <div
                        dangerouslySetInnerHTML={{ __html: Concent! }}
                        className="w-full text-sm desktop:text-base"
                    ></div>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: time }}
                    className="flex w-full flex-row text-zinc-500 text-sm desktop:text-base"
                ></div>
            </div>
        </div>
    );
};

export default ArticleReply;
