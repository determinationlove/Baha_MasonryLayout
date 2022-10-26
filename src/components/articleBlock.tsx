import React from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';

export type Props = {
    code: any;
    onfocus: (link: any) => void;
};

function ArticleBlock({ code, onfocus }: Props) {
    let link = code.link;
    return (
        <div
            className="
            mb-6 flex max-h-full min-h-noImg w-72 max-w-sm 
            flex-col overflow-hidden rounded-md bg-slate-50
            shadow-article
            "
            onClick={() => onfocus(true)}
        >
            <div className="relative min-h-noImg overflow-hidden">
                <div className="absolute flex h-full min-h-noImg w-full content-end items-end">
                    <div className="absolute z-10 flex h-28 w-full bg-gradient-to-t from-black opacity-70"></div>
                    <div className="z-10 m-3 font-normal text-slate-50 drop-shadow-text line-clamp-2">
                        {code.title}
                    </div>
                </div>
                <img src={code.img} className=" z-10 w-full"></img>
            </div>

            <div className="relative mt-2 flex h-full w-full flex-col content-center justify-end ">
                <div className="ml-3 flex w-full flex-col items-start justify-end">
                    <div className="flex h-8 w-fit items-center justify-center  text-sm">
                        作者／{code.author}
                    </div>
                </div>

                <div className="m-3 text-base text-slate-600 line-clamp-3">
                    {code.brief}
                </div>

                <div className="container box-border flex flex-row justify-between p-3 text-sm text-teal-800">
                    <div className="flex ">{code.sort}</div>
                    <div className="flex ">{code.date}</div>
                </div>
            </div>
        </div>
        
    );
}

function Get_ArticleBody() {
    axios.get('').then((response) => {
        const data = [];
        const $ = cheerio.load(response.data); // 載入 body
        const list = $('.b-list__row');
        for (let i = 0; i < list.length; i++) {
            const title = list.eq(i).find('.b-list__main__title ').text();
            const brief = list.eq(i).find('.b-list__brief').text();
            let img = list
                .eq(i)
                .find('.b-list__main a div')
                .attr('data-thumbnail');
            const author = list.eq(i).find('.b-list__count__user a').text();
            const date = list.eq(i).find('.b-list__time__edittime a').text();
            const sort = list.eq(i).find('.b-list__summary__sort').text();
            const gp = list.eq(i).find('.b-list__summary__gp').text();
            const link =
                'https://forum.gamer.com.tw/' +
                list.eq(i).find('.b-list__main a').attr('href');

            data.push({
                title,
                brief,
                img,
                author,
                date,
                sort,
                gp,
                link,
            });
        }

        //setItem(data);
    });
}

export default ArticleBlock;
