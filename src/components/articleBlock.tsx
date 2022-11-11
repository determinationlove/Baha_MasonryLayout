import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ArticleBody from './ArticleBody';
import { eq } from 'cheerio/lib/api/traversing';
import { hasClass } from 'cheerio/lib/api/attributes';

export type Props = {
    code: any;
    setOpen: (open: boolean) => void;
    Set_ArticleData: (articl: any) => void;
};

const ArticleBlock = ({ code, setOpen, Set_ArticleData }: Props) => {
    
    return (
        <div
            className="
            lg:max-w-s mb-6 flex max-h-full w-52 
            max-w-sm flex-col overflow-hidden rounded-md
            bg-slate-50
            shadow-article lg:max-h-full lg:w-72 desktop:w-72
            "
            onClick={() => {
                // 因為 onClick 作為元件的一部份優先被渲染，這裡要加入等待 useEffect 執行完、為 Body 賦值後才運作的機制
                setOpen(true);
                Set_ArticleData(code);
            }}
        >
            <div className="relative min-h-noImg overflow-hidden">
                <div className="absolute flex h-full min-h-noImg w-full content-end items-end">
                    <div className="absolute z-10 flex h-28 w-full bg-gradient-to-t from-black opacity-70"></div>
                    <div
                        className="z-10 m-3 text-sm font-normal text-slate-50 drop-shadow-text
                    line-clamp-2 lg:text-xl xl:text-xl desktop:text-xl
                    "
                    >
                        {code.title}
                    </div>
                </div>
                <img src={code.img} className=" z-10 w-full"></img>
            </div>

            <div className="relative mt-2 flex h-full w-full flex-col content-center justify-end ">
                <div className="ml-3 flex w-full flex-col items-start justify-end">
                    <div
                        className="flex h-8 w-fit items-center justify-center  text-xs
                    lg:text-sm xl:text-sm desktop:text-sm
                    "
                    >
                        作者／{code.author}
                    </div>
                </div>

                <div
                    className="m-3 text-sm text-slate-600 line-clamp-3
                lg:text-base xl:text-base desktop:text-base
                "
                >
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
