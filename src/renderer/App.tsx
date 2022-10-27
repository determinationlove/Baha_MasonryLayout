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
import png_B from '../../assets/bahamut.png';

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

function refreshPage() {
    window.location.reload();
}

const Hello = ({ bahaData }: Props) => {
    const [Item, setItem] = useState<any>();

    useEffect(() => {
        axios
            .get('https://forum.gamer.com.tw/B.php?bsn=60076')
            .then((response) => {
                const data = [];
                const $ = cheerio.load(response.data); // 載入 body
                const list = $('.b-list__row');
                const png = png_B;
                for (let i = 0; i < list.length; i++) {
                    if (
                        list.eq(i).find('.b-list__main__title').text() != '' &&
                        list
                            .eq(i)
                            .find('.b-list__main div div')
                            .attr('title') != '置頂' &&
                        list
                            .eq(i)
                            .find('.b-list__main div div')
                            .attr('class') !=
                            'b-list__summary__mark b-mark b-mark--feature'
                    ) {
                        const title = list
                            .eq(i)
                            .find('.b-list__main__title ')
                            .text();
                        const brief = list.eq(i).find('.b-list__brief').text();
                        
                        let img = list
                            .eq(i)
                            .find('.b-list__main a div')
                            .attr('data-thumbnail');
                        if (
                            list
                                .eq(i)
                                .find('.b-list__main a div')
                                .attr('data-thumbnail') == undefined
                        ) {
                            img = png.toString();
                        }

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
                }
                setItem(data);
            });
    }, []);

    if (!Item) return null;

    //console.log(Item[0].img);

    return (
        <div className="flex flex-col">
            <div className="my-16 flex justify-center">
                <img
                    src={svg_B}
                    className="flex w-20 justify-center drop-shadow-logo"
                ></img>
            </div>

            <div className="flex">
                <div className="columns-2 desktop:columns-5 xl:columns-4 lg:columns-3 sm:columns-2 gap-5 text-xl ">
                    {Item.map((id: any, index: any) => {
                        return (
                            <ArticleBlock
                                key={index}
                                code={id}
                                //onfocus={id.link}
                            />
                        );
                    })}
                </div>
            </div>

            <div className=' h-40 w-full flex justify-center items-center content-center'>
                <button
                    className=" h-40 w-full bg-emerald-400 justify-center items-center content-center"
                    onClick={refreshPage}
                ></button>
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
