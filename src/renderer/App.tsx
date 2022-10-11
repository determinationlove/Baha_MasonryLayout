import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import axios from "axios";
import * as cheerio from "cheerio";
import { title } from 'process';



const Baha = () => {
	let data: { title: string; author: string; date: string; sort: string; gp: string; link: string; }[]  = [];

	axios.get('https://forum.gamer.com.tw/B.php?bsn=60076')
		.then(res => {
			//const data = [];
			const $ = cheerio.load(res.data); // 載入 body
			const list = $(".b-list__row");
			for (let i = 0; i < list.length; i++) {

				if (list.eq(i).find('.b-list__main__title ').text() != '') {
					const title = list.eq(i).find('.b-list__main__title ').text();
					const author = list.eq(i).find('.b-list__count__user a').text();
					const date = list.eq(i).find('.b-list__time__edittime a').text();
					const sort = list.eq(i).find('.b-list__summary__sort').text();
					const gp = list.eq(i).find('.b-list__summary__gp').text();
					//const img = list.eq(i).find('.b-list__img lazyloaded').attr('data-thumbnail');
					const link = "https://forum.gamer.com.tw/" + list.eq(i).find('.b-list__main a').attr('href');

					data.push({ title, author, date, sort, gp, link });
				}
			}
			console.log(data);
		});
		
		return data;
		//BahaData = data;
}

export type Props = {
    bahaData: { title: string; author: string; date: string; sort: string; gp: string; link: string; }[],
};

const Hello = ( {bahaData} : Props ) => {

	var array;
	array = bahaData;

	console.log(array);

	return (
		<div>
			<div className="Hello">
				<img width="200" alt="icon" src={icon} />
			</div>
			<h1>electron-react-boilerplate</h1>

			 <p>
				{array.map((id, index) => { 
					return (
						<h3 key={"data" + index}>
							{id.title} 
						</h3>
					)
				})}
			 </p>

			
		</div>
  );
};

export default function App() {

	let BahaData: { title: string; author: string; date: string; sort: string; gp: string; link: string; }[]  = [];
	BahaData = Baha();

	

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Hello bahaData={BahaData}/>} />
			</Routes>
		</Router>
	);
}
