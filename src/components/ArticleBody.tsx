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

	console.log(code_Body);

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
        <div ref={ref} className="fixed z-20 flex h-96 w-96 bg-slate-300">
			<div>{code_Body.Body_title}</div>
		</div>
    );
};

export default ArticleBody;
