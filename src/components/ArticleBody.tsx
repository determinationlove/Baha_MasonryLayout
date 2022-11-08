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

    return (
        <div className="absolute z-20 h-full w-full bg-black/70">
            <div className="flex h-screen w-full items-center justify-center">
                <div
                    ref={ref}
                    className=" max-w fixed flex h-content w-11/12 flex-col
				 items-start justify-start overflow-y-hidden rounded-2xl bg-white p-5
                 lg:w-8/12 desktop:w-8/12 desktop:p-10
				"
                >
                    <div className="flex flex-col overflow-y-scroll h-full relative bg-slate-100 
                    desktop:bg-white w-full desktop:w-full">
                        {code_Body?.map((id: any, index: any) => {
                            const Tohtml = id.Body_content;
                            const url = id.Body_link;

                            return (
                                <div className="flex h-auto w-full flex-row overflow-visible relative 
                                my-2 desktop:my-10 bg-white ml-2 desktop:ml-0 p-5 desktop:p-0">
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
                </div>
            </div>
        </div>
    );
};

export default ArticleBody;
