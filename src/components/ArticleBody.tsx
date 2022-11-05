import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import App from 'renderer/App';
import ArticleReply from './ArticleReply';

export type Props = {
    code_Body: any;
    setOpen: (open: boolean) => void;
};

const ArticleBody = ({ code_Body, setOpen }: Props) => {
    const ref = useRef(null);

    //文章區域外部點擊檢測
    function useOutsideCheck(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    //console.log("關閉文章");
                    setOpen(false);
                }
            }
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideCheck(ref);

    const Tohtml = code_Body?.Body_content;

    const url = code_Body?.Body_link;

    return (
        <div className="absolute z-20 h-full w-full bg-black/70">
            <div className="flex h-screen w-full items-center justify-center">
                <div
                    ref={ref}
                    className=" max-w fixed flex h-content w-5/12 flex-col
				 items-start justify-start overflow-y-hidden rounded-2xl bg-white p-5 lg:w-8/12
                 desktop:w-8/12 desktop:p-10
				"
                >
                    <div className="flex h-full w-full flex-row  overflow-x-visible overflow-y-scroll">
                        <div className="flex lg:w-40 lg:m-2 desktop:m-2 desktop:w-40">
                            <img
                                src={code_Body?.Body_card}
                                className="flex h-0 w-0 rounded-md border-slate-400 outline-offset-2 outline-cyan-500
                                lg:h-gamercard lg:w-gamercard lg:border-2 lg:outline lg:min-w-gamercard lg:min-h-gamercard
                                xl:h-gamercard xl:w-gamercard xl:border-2 xl:outline xl:min-w-gamercard xl:min-h-gamercard
                                desktop:h-gamercard desktop:w-gamercard desktop:border-2 desktop:outline"
                            />
                        </div>

                        <div className="flex h-full w-full flex-col ">
                            <div className="text-2xl ">
                                {code_Body?.Body_title}
                            </div>
                            <div className="flex w-full flex-col p-2 desktop:p-5">
                                <div className="flex w-full flex-row items-center justify-between">
                                    <div className="text-sm text-teal-700 desktop:text-lg">
                                        {code_Body?.Body_author_name}／
                                        {code_Body?.Body_author_id}
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
                                        {code_Body?.Body_date}
                                    </div>
                                    <div className="flex flex-row desktop:text-xl">
                                        推-
                                        <div className="mr-2  text-orange-500 desktop:mr-10">
                                            {code_Body?.Body_gp}
                                        </div>
                                        噓-
                                        <div className="text-violet-500">
                                            {code_Body?.Body_bp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 w-full"></hr>
                            <div
                                dangerouslySetInnerHTML={{ __html: Tohtml }}
                                className="w-full p-2 desktop:p-10 "
                            ></div>
                            <hr className="my-3 w-full"></hr>

                            {code_Body?.Reply.map((id: any, index: any) => {
                                return (
                                    <ArticleReply
                                        Body_Reply={id}
                                    ></ArticleReply>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleBody;
