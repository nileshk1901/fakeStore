import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {

	const [products] = useContext(ProductContext);

	let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], []);
	distinct_category = [...new Set(distinct_category)];

	

	const color = () => {
		return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.4`
		
	};

         

	return (
		<nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
			<a
				className="py-2 px-5 border rounded border-blue-200 text-blue-300"
				href="/create"
			>
				Add new product
			</a>
			<hr className="my-3 w-[80%]" />
			<h1 className="text-2xl font-regular mb-3 w-[80%]"> Category filter</h1>
			<div className=" w-[80%]">
				{distinct_category.map((c, i) => (
					<Link
						key={i}
						to={`/category/${encodeURIComponent(c)}`}
						className="flex items-center mb-3"
					>
						<span
							style={{ backgroundColor: color() }}
							className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-100"
						></span>{" "}
						{c}
					</Link>
				))}
			</div>
		</nav>
	);
}

export default Nav
