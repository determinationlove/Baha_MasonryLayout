import React from 'react';
import { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';

export type Props = {
    DKMlogo: (dkm: boolean) => void;
    UserBG: (dkm: boolean) => void;
};

const setting = ({ DKMlogo, UserBG }: Props) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('DARK_MODE'));
    const root = window.document.documentElement;

    const setThemeInStorage = (darkMode: any) => {
        localStorage.setItem('DARK_MODE', darkMode);
    };

    function toggleDarkMode() {
        if (darkMode == 'dark') {
            setThemeInStorage(darkMode);
            root.classList.add('dark');
            DKMlogo(true);
            //console.log('闇黑模式！');
        } else {
            setThemeInStorage(darkMode);
            root.classList.remove('dark');
            DKMlogo(false);
        }
    }
    toggleDarkMode();

    let check: boolean;
    if (darkMode == 'dark') {
        check = true;
    } else {
        check = false;
    }

    return (
        <div className="absolute flex w-40 flex-col dark:text-gray-200">
            <div className="flex w-full flex-row">
                <input
                    type="checkbox"
                    id="DarkMode_toggle"
                    defaultChecked={check}
                    onClick={() => {
                        let checked = document.querySelector(
                            '[id=DarkMode_toggle]:checked'
                        );
                        if (checked) {
                            setDarkMode('dark');
                        } else {
                            setDarkMode('light');
                        }
                    }}
                />
                <label htmlFor="DarkMode_toggle" />
                闇黑模式
            </div>
        </div>
    );
};

export default setting;
