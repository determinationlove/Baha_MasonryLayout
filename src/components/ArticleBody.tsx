import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import App from 'renderer/App';
import ArticleReply from './ArticleReply';
import { toString } from 'cheerio/lib/api/manipulation';

export type Props = {
    code: any;
    OpenCheck: boolean;
};

const ArticleBody = ({ code, OpenCheck }: Props) => {
    const Body_Data: any = [];
    let P: any = useRef(1);
    let clink: string = code.link + P.current;
    let canChangePage: any = useRef(false);

    const [Body, setBody] = useState<any>();
    const [Page, setPage] = useState<any>(clink);

    console.log(Page, clink);
    console.log(P.current);

    //let liRef: any = useRef(-2);
    //let li: number = liRef.current;

    useEffect(() => {
        axios.get(Page).then((res) => {
            const $ = cheerio.load(res.data);
            const list = $('.c-section');
            let li = -3;
            let ri = 0;

            if (P.current > 20) {
                li = -2;
            }

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

                    if (li > 1 && P <= 20) {
                        Body_link =
                            'https://forum.gamer.com.tw/' +
                            list
                                .eq(i)
                                .find('.c-post__header__author a')
                                .attr('href') +
                            '&to=' +
                            li;
                    } else {
                        Body_link = code.link + '&to=' + (li + P.current);
                    }

                    Body_card = list.eq(i).find('.c-user a img').attr('src');
                } 
                else  {
                    li += 1;
                }

                if (
                    list.eq(i).attr('id') != undefined &&
                    list.eq(i).children('.c-disable').length && list.eq(i).find('.show').text() == '展開文章'
                ) {
                    li -= 1;
                }

                if (Body_title?.length == 0) {
                    if (P == 1) {
                        Body_title = li + '樓 回覆 →';
                    } else {
                        Body_title = (li + P.current) + '樓 回覆 →';
                    }
                }

                if (
                    list.eq(0).attr('id') == undefined &&
                    list.eq(0).children('.page').length
                ) {
                    canChangePage.current = false;
                } else {
                    canChangePage.current = true;
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

            setBody(Body_Data);
        });
    }, [Page]);

    console.log(canChangePage.current);

    return (
        <div
            className="relative flex h-full w-full flex-col overflow-y-scroll 
            bg-slate-100 desktop:w-full desktop:bg-white"
        >
            <div className="flex flex-row h-10 mb-5">
                <button
                    className="relative  flex h-10 w-20 items-center justify-center bg-emerald-300 p-2"
                    onClick={() => {
                        P.current += 20;
                        clink = code.link + P.current;
                        setPage(clink);
                    }}
                >
                    下一頁
                </button>
                <div
                    className={
                        canChangePage.current
                            ? 'relative  flex h-10 w-auto items-center justify-center ml-5 text-zinc-400'
                            : 'hidden'
                    }
                >
                    沒有下一頁啦
                </div>
            </div>

            {Body?.map((id: any, index: any) => {
                const Tohtml = id.Body_content;
                const url = id.Body_link;

                return (
                    <div
                        className="relative my-2 ml-2 flex h-auto w-full 
                                flex-row overflow-visible bg-white p-5 desktop:my-10 desktop:ml-0 desktop:p-0"
                    >
                        <div className="flex lg:m-2 lg:w-40 desktop:m-2 desktop:w-40">
                            <img
                                src={id.Body_card}
                                className="flex h-0 w-0 rounded-md border-slate-400 outline-offset-2 outline-cyan-500
                                lg:h-gamercard lg:min-h-gamercard lg:w-gamercard lg:min-w-gamercard lg:border-2 lg:outline
                                xl:h-gamercard xl:min-h-gamercard xl:w-gamercard xl:min-w-gamercard xl:border-2 xl:outline
                                desktop:h-gamercard desktop:w-gamercard desktop:border-2 desktop:outline"
                            />
                        </div>

                        <div className="flex h-full w-full flex-col ">
                            <div className="text-xl desktop:text-2xl ">
                                {id.Body_title}
                            </div>
                            <div className="flex w-full flex-col p-2 desktop:p-5">
                                <div className="flex w-full flex-row items-center justify-between">
                                    <div className="text-base text-teal-700 desktop:text-lg">
                                        {id.Body_author_name}／
                                        {id.Body_author_id}
                                    </div>
                                    <a
                                        href={url}
                                        target="_blank"
                                        className="text-sm text-blue-500 desktop:text-lg desktop:font-medium"
                                    >
                                        查看來源
                                    </a>
                                </div>

                                <div className="mt-2 flex w-full flex-row items-center justify-between text-gray-500 desktop:mt-5">
                                    <div className="text-sm desktop:text-lg">
                                        {id.Body_date}
                                    </div>
                                    <div className="flex flex-row desktop:text-xl">
                                        推-
                                        <div className="mr-2  text-orange-500 desktop:mr-10">
                                            {id.Body_gp}
                                        </div>
                                        噓-
                                        <div className="text-violet-500">
                                            {id.Body_bp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 w-full"></hr>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Tohtml,
                                }}
                                className="w-full p-2 desktop:p-10 "
                            ></div>
                            <hr className="my-3 w-full"></hr>

                            {id.Reply.map((_id: any, index: any) => {
                                return (
                                    <ArticleReply
                                        Body_Reply={_id}
                                    ></ArticleReply>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ArticleBody;
