import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>홈</h1>
			<p>하이드앤시크에 오신것을 환영합니다.</p>
			<a href='https://fuzzyline.co.kr/admin/login' target='_blank'>
				관리자페이지 - 홍대점
			</a>
			<br></br>
			<Link to='/exerciseroom' target='_blank'>
				훈련소
			</Link>
			<br></br>
			<Link to='/iotglove' target='_blank'>
				iotglove
			</Link>
			<br></br>
			<Link to='/cyberpunk' target='_blank'>
				사이버펑크
			</Link>
		</div>
	);
};

export default Home;
