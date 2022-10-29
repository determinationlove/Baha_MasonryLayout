import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import test from '../../assets/icon.png';
import axios from 'axios';
import * as cheerio from 'cheerio';
import App from 'renderer/App';

export type Props = {
    code_Body: any;
    setOpen: (open: boolean) => void;
};

const ArticleBody = ({ code_Body, setOpen }: Props) => {
    const ref = useRef(null);

    //console.log(code_Body.Body_content);

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

    const Tohtml = code_Body.Body_content;

    const url = code_Body.Body_link;

    return (
        <div className="absolute z-20 h-full w-full bg-black/70">
            <div className="flex h-screen w-full items-center justify-center">
                <div
                    ref={ref}
                    className=" max-w fixed flex h-content w-5/12 flex-col
				 items-start justify-start overflow-hidden rounded-2xl bg-white p-10 
                 lg:w-8/12 desktop:w-8/12
				"
                >
                    <div className="flex flex-row ">
                        <div className="flex w-40 mr-5">
                            <img
                                src={code_Body.Body_card}
                                className="flex h-gamercard w-gamercard "
                            />
                        </div>
                        
                        <div className="flex h-content w-full flex-col">
                            <div className="text-2xl ">
                                {code_Body.Body_title}
                            </div>
                            <div className="flex w-full flex-col  p-5">
                                <div className="flex w-full flex-row items-center justify-between">
                                    <div className="text-lg text-teal-700">
                                        {code_Body.Body_author_name}／
                                        {code_Body.Body_author_id}
                                    </div>
                                    <a
                                        href={url}
                                        target="_blank"
                                        className="font-medium text-blue-500"
                                    >
                                        查看文章來源
                                    </a>
                                </div>

                                <div className="mt-5 flex w-full flex-row items-center justify-between text-gray-500">
                                    <div>{code_Body.Body_date}</div>
                                    <div className="flex flex-row text-xl">
                                        推-
                                        <div className="mr-10 text-orange-500">
                                            {code_Body.Body_gp}
                                        </div>
                                        噓-
                                        <div className="text-violet-500">
                                            {code_Body.Body_bp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 w-full"></hr>
                            <div
                                dangerouslySetInnerHTML={{ __html: Tohtml }}
                                className="w-full overflow-x-visible overflow-y-scroll p-10 "
                            ></div>
                            <hr className="my-3 w-full"></hr>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleBody;
