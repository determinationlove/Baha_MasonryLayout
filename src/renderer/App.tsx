import {
    MemoryRouter as Router,
    Routes,
    Route,
    BrowserRouter,
    HashRouter,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import svg_B from '../../assets/./icons/svg/BahaMasonryLayout.svg';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useRef, useState } from 'react';
import ArticleBlock from 'components/articleBlock';

export type Props = {
    bahaData: {
        title: string;
        author: string;
        date: string;
        sort: string;
        gp: string;
        link: string;
    }[];
};

const Hello = ({ bahaData }: Props) => {
    const [Item, setItem] = useState<any>();

    useEffect(() => {
        axios
            .get('https://forum.gamer.com.tw/B.php?bsn=60076')
            .then((response) => {
                const data = [];
                const $ = cheerio.load(response.data); // 載入 body
                const list = $('.b-list__row');
                for (let i = 0; i < list.length; i++) {
                    if (list.eq(i).find('.b-list__main__title ').text() != '') {
                        const title = list
                            .eq(i)
                            .find('.b-list__main__title ')
                            .text();
                        const author = list
                            .eq(i)
                            .find('.b-list__count__user a')
                            .text();
                        const date = list
                            .eq(i)
                            .find('.b-list__time__edittime a')
                            .text();
                        const sort = list
                            .eq(i)
                            .find('.b-list__summary__sort')
                            .text();
                        const gp = list
                            .eq(i)
                            .find('.b-list__summary__gp')
                            .text();
                        //const img = list.eq(i).find('.b-list__img lazyloaded').attr('data-thumbnail');
                        const link =
                            'https://forum.gamer.com.tw/' +
                            list.eq(i).find('.b-list__main a').attr('href');

                        data.push({ title, author, date, sort, gp, link });
                    }
                }
                setItem(data);
            });
    }, []);

    if (!Item) return null;

    console.log(Item);

    return (
        <div className="flex flex-col">
            <div className="flex justify-center my-16">
                <img
                    src={svg_B}
                    className="flex w-20 justify-center"
                ></img>
            </div>

            <div className='flex'>
                <div className="gap-8 columns-3 text-2xl">
                    {Item.map((id: any, index: any) => {
                        return <ArticleBlock key={index} code={id} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default function App() {
    let BahaData: {
        title: string;
        author: string;
        date: string;
        sort: string;
        gp: string;
        link: string;
    }[] = [];

    //BahaData = Baha();

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Hello bahaData={BahaData} />} />
            </Routes>
        </HashRouter>
    );
}
