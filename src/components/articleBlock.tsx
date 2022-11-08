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
    SetArticleDataFunction: (articl: any) => void;
};

const ArticleBlock = ({ code, setOpen, SetArticleDataFunction }: Props) => {
    const [Body, setBody] = useState<any>();
    let ArticleBody_Data: any = [];
    const Body_Data: any = [];
    useEffect(() => {
        axios.get(code.link).then((res) => {
            const $ = cheerio.load(res.data);
            const list = $('.c-section');
            let li = -2;
            let ri = 0;

            // 先把來源不可用的attr修正
            for (let i = 0; i < list.length; i++) {
                $('img').each(function () {
                    //將 <img> 的屬性新增 src
                    var old_src = $(this).attr('data-src');
                    $(this).attr('src', old_src);
                    $(this).attr('class', 'max-w-full mb-2 max-h-fit');
                });

                $('a').each(function () {
                    //將 <a> 的屬性新增 blank
                    $(this).attr('target', '_blank');
                    $(this).addClass('text-teal-600');
                });

                $('iframe').each(function () {
                    //將 <iframe> 的屬性新增 src
                    var old_src = $(this).attr('data-src');
                    $(this).attr('src', old_src);
                    $(this).attr(
                        'class',
                        'w-iframe h-iframe max-w-full max-h-full mb-2'
                    );
                });

                $('div')
                    .find('.photoswipe-image')
                    .each(function () {
                        //將 <iframe> 的屬性新增 src
                        $(this).removeAttr('href');
                    });

                // ------ 留言區整理 ------
                list.eq(i)
                    .find('.c-reply__head')
                    .filter('.nocontent')
                    .each(function () {
                        // 刪除查看所有留言（來源就不是預設給出所有資料，所以放棄顯示完整留言）
                        $(this).remove();
                    });

                list.eq(i)
                    .find('.material-icons')
                    .each(function () {
                        // 刪除頭像的雜物
                        $(this).remove();
                    });

                list.eq(i)
                    .find('.buttonbar')
                    .each(function () {
                        // 刪除留言回覆
                        $(this).remove();
                    });

                list.eq(i)
                    .find('.c-reply__editor')
                    .each(function () {
                        // 刪除訪客留言
                        $(this).remove();
                    });
            }

            for (let i = 0; i < list.length; i++) {
                //================= 樓層 =================//
                let Body_title = null;
                let Body_sort = null;
                let Body_author_id = null;
                let Body_author_name = null;
                let Body_date = null;
                let Body_device = null;
                let Body_gp = null;
                let Body_bp = null;
                let Body_content = null;
                let Body_link = null;
                let Body_card = null;
                let Reply: any = [];

                if (
                    list.eq(i).attr('id') != undefined && 
                    !list.eq(i).children('.c-disable').length &&
                    !list.eq(i).children('.page').length &&
                    !list.eq(i).children('.popular').length
                ) {
                    li += 1;

                    Body_title = list
                        .eq(i)
                        .find('.c-post__header__title')
                        .text();

                    Body_sort = code.sort;

                    Body_author_id = code.author;

                    Body_author_name = list.eq(i).find('.username').text();

                    Body_date = list
                        .eq(i)
                        .find('.c-post__header__info')
                        .find('a')
                        .eq(0)
                        .text();

                    Body_device = list
                        .eq(i)
                        .find('.c-post__header__info')
                        .find('a')
                        .eq(1)
                        .attr('title');
                    if (Body_device == undefined) {
                        Body_device = '電腦發文';
                    }

                    Body_gp = list.eq(i).find('.gp a').text();

                    Body_bp = list.eq(i).find('.bp a').text();

                    //================= 主樓內容 =================//
                    Body_content = list
                        .eq(i)
                        .find('.c-article__content')
                        .html();

                    if (Body_content?.length == 0) {
                        console.log(
                            'Body_content.length == 0, 第一層判斷: 只有一行文字'
                        );
                        Body_content = list
                            .eq(i)
                            .find('.c-article__content')
                            .text();
                    }
                    if (Body_content == null) {
                        if (list.eq(i).children('.c-disable').length) {
                            console.log(
                                '樓層：',
                                i,
                                '第二層判斷: 原文被噓到摺疊'
                            );
                            Body_content =
                                '<div class="text-red-600">[噓到摺疊]</div>';
                        } else if (list.eq(i).children('.popular').length) {
                            console.log('樓層：', i, '第三層判斷: 猜你喜歡');
                            Body_content =
                                '<div class="text-red-600">[猜你喜歡]</div>';
                        } else if (list.eq(i).children('.page').length) {
                            console.log('樓層：', i, '第四層判斷: 總頁碼');
                            Body_content =
                                '<div class="text-red-600">[猜你喜歡]</div>';
                        } else {
                            console.log(
                                '樓層：',
                                i,
                                '第五層判斷: 原文已被站方刪除'
                            );
                            Body_content =
                                '<div class="text-red-600">[oh！ 這文章沒有內容，許是死了！ 你可以點擊 "查看來源" 確認是否真是如此]</div>';
                        }
                    }

                    Body_link = 'https://forum.gamer.com.tw/' + list.eq(i).find('.c-post__header__author a').attr('href');

                    Body_card = list.eq(i).find('.c-user a img').attr('src');
                } else {
                    li += 1;
                }

                if (Body_title?.length == 0) {
                    Body_title = li + '樓 回覆 →';
                }

                //================= 留言區 =================//

                // 這裡的 eq(0) 指的不是以原本的 DOM 上面排序的 eq(0)
                // 而是把所有的 $('.c-section').find('.c-post__footer.c-reply') 篩出來之後開始數的第一順位
                let Reply_list = null;
                //console.log(Reply_list.length);

                if (
                    list.eq(i).attr('id') != undefined &&
                    !list.eq(i).children('.c-disable').length &&
                    !list.eq(i).children('.page').length &&
                    !list.eq(i).children('.popular').length
                ) {
                    /*console.log(
                        '迴圈：',
                        i,
                        '　留言區：',
                        list.eq(i).attr('id') != undefined &&
                            !list.eq(i).children('.c-disable').length &&
                            !list.eq(i).children('.page').length &&
                            !list.eq(i).children('.popular').length
                    );*/

                    Reply_list = $('.c-section')
                        .find('.c-post__footer.c-reply')
                        .eq(ri);

                    for (
                        let r = 0;
                        r < Reply_list.find('.c-reply__item').length;
                        r++
                    ) {
                        //if (list.eq(i).children('.c-disable').length) { continue; }

                        $('a').each(function () {
                            if ($(this).text() == 'https://') {
                                $(this).attr('href', $(this).text());
                            }
                        });

                        // 大頭貼
                        const Reply_pic: any = Reply_list.find('.c-reply__item')
                            .eq(r)
                            .find('.reply-avatar.user--sm')
                            .html();

                        // 暱稱
                        const Reply_name: any = Reply_list.find(
                            '.c-reply__item'
                        )
                            .eq(r)
                            .find('.reply-content__user')
                            .html();

                        // 內容
                        const Reply_concent: any = Reply_list.find(
                            '.c-reply__item'
                        )
                            .eq(r)
                            .find('.comment_content')
                            .html();

                        // 留言時間
                        const Reply_time: any = Reply_list.find(
                            '.c-reply__item'
                        )
                            .eq(r)
                            .find('.reply-content__footer')
                            .html();

                        Reply.push({
                            Reply_pic,
                            Reply_name,
                            Reply_concent,
                            Reply_time,
                        });

                        // 迴圈1的時候因為偵測到猜你喜歡
                        // 雖然打包了所有留言區的第1個留言區，但被下方的條件判斷式阻擋合成，然後就直接到迴圈2了
                        // 導致第1個留言區直接被吃，由下一個遞補，因此從二樓開始每樓層的留言區都變成下一層的留言區
                    }

                    ri += 1;
                }

                //================= 樓層元素合成 =================//
                if (list.eq(i).attr('id') != undefined) {
                    //console.log(list.eq(i).eq(0).html());
                    //console.log(list.eq(i).children('.c-disable').length);
                    if (
                        !list.eq(i).children('.c-disable').length &&
                        !list.eq(i).children('.page').length &&
                        !list.eq(i).children('.popular').length
                    ) {
                        Body_Data.push({
                            Body_title,
                            Body_sort,
                            Body_author_id,
                            Body_author_name,
                            Body_date,
                            Body_device,
                            Body_gp,
                            Body_bp,
                            Body_content,
                            Body_link,
                            Body_card,
                            Reply,
                        });
                    }
                }
            }

            //================= 整個討論串賦值 =================//

            ArticleBody_Data.push({
                Body_Data,
            });

            setBody(ArticleBody_Data);
        });
    }, []);

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
                if (Body != null) {
                    SetArticleDataFunction(Body?.[0]);
                    setOpen(true);
                }

                //console.log(Body);
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
