import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ArticleBody from './ArticleBody';

export type Props = {
    code: any;
    setOpen: (open: boolean) => void;
    SetArticleDataFunction: (articl: any) => void;
};

const ArticleBlock = ({ code, setOpen, SetArticleDataFunction }: Props) => {
    const [Body, setBody] = useState<any>();
    const ArticleBody_Data:any = [];
    useEffect(() => {
        axios.get(code.link).then((res) => {
            const $ = cheerio.load(res.data);
            const list = $('.c-section');
            for (let i = 0; i < list.length; i++) {
                //let Body_author_name = list.eq(i).find('c-post__header__author a').text();
                if (
                    list
                        .eq(i)
                        .find('.c-post__header h1')
                        .hasClass('c-post__header__title') ||
                    list
                        .eq(i)
                        .find('.c-post__header h1')
                        .hasClass('c-post__header__title is-except')
                ) {
                    const Body_title = code.title;

                    const Body_sort = code.sort;

                    const Body_author_id = code.author;

                    const Body_author_name = list
                        .eq(i)
                        .find('.username')
                        .text();

                    const Body_date = list.eq(i).find('.c-post__header__info').find('a').eq(0).text();

                    let Body_device = list.eq(i).find('.c-post__header__info').find('a').eq(1).attr('title');
                    if (Body_device == undefined) {
                        Body_device = '電腦發文';
                    }

                    const Body_gp = list.eq(i).find('.gp a').text();

                    const Body_bp = list.eq(i).find('.bp a').text();

                    ArticleBody_Data.push({
                        Body_title,
                        Body_sort,
                        Body_author_id,
                        Body_author_name,
                        Body_date,
                        Body_device,
                        Body_gp,
                        Body_bp,
                    });
                }
            }

            setBody(ArticleBody_Data);
            //console.log(ArticleBody_Data[0], code.link);
        });
    }, []);

    return (
        <div
            className="
            mb-6 flex max-h-full w-52 max-w-sm 
            flex-col overflow-hidden rounded-md bg-slate-50
            shadow-article
            desktop:w-72 lg:max-h-full lg:max-w-s lg:w-72
            "
            onClick={() => {
                
                setOpen(true);
                SetArticleDataFunction(Body[0]);
                console.log(Body);
            }}

        >
            <div className="relative min-h-noImg overflow-hidden">
                <div className="absolute flex h-full min-h-noImg w-full content-end items-end">
                    <div className="absolute z-10 flex h-28 w-full bg-gradient-to-t from-black opacity-70"></div>
                    <div className="z-10 m-3 font-normal text-slate-50 drop-shadow-text line-clamp-2
                    text-sm desktop:text-xl xl:text-xl lg:text-xl
                    ">
                        {code.title}
                    </div>
                </div>
                <img src={code.img} className=" z-10 w-full"></img>
            </div>

            <div className="relative mt-2 flex h-full w-full flex-col content-center justify-end ">
                <div className="ml-3 flex w-full flex-col items-start justify-end">
                    <div className="flex h-8 w-fit items-center justify-center  text-xs
                    desktop:text-sm xl:text-sm lg:text-sm
                    ">
                        作者／{code.author}
                    </div>
                </div>

                <div className="m-3 text-sm text-slate-600 line-clamp-3
                desktop:text-base xl:text-base lg:text-base
                ">
                    {code.brief}
                </div>

                <div className="container box-border flex flex-row justify-between p-3 text-sm text-teal-800">
                    <div className="flex ">{code.sort}</div>
                    <div className="flex ">{code.date}</div>
                </div>
            </div>
            
        </div>
    );
};

export default ArticleBlock;
