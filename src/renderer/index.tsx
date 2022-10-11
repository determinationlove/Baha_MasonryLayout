import { createRoot } from 'react-dom/client';
import App from './App';

import axios from "axios";
import * as cheerio from "cheerio";

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

export const Baha = () => {
	axios.get('https://forum.gamer.com.tw/B.php?bsn=60076')
		.then(res => {
			const data = [];
			const $ = cheerio.load(res.data); // 載入 body
			const list = $(".b-list__row");
			for (let i = 0; i < list.length; i++) {
				const title = list.eq(i).find('.b-list__main__title ').text();
				const author = list.eq(i).find('.b-list__count__user a').text();
				const date = list.eq(i).find('.b-list__time__edittime a').text();
				const sort = list.eq(i).find('.b-list__summary__sort').text();
				const gp = list.eq(i).find('.b-list__summary__gp').text();
				//const img = list.eq(i).find('.b-list__img lazyloaded').attr('data-thumbnail');
				const link = "https://forum.gamer.com.tw/" + list.eq(i).find('.b-list__main a').attr('href');

				data.push({ title, author, date, sort, gp, link });

			}

			return data;
			//console.log(data);
		})
}

export default Baha;