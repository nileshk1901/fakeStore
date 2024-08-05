import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useParams } from "react-router-dom"; // Use useParams to get route parameters
import { ProductContext } from "./../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
	const [products] = useContext(ProductContext);
	const { category } = useParams(); // Get category from route parameters
	const [filteredProducts, setFilteredProducts] = useState(products);

	const getProductsByCategory = async () => {
		try {
			const { data } = await axios.get(`/products/category/${category}`);
			setFilteredProducts(data);
		} catch (error) {
			console.error("Error fetching products by category:", error);
		}
	};

	useEffect(() => {
		if (category) {
			getProductsByCategory();
		} else {
			setFilteredProducts(products);
		}
	}, [category, products]);

	return filteredProducts ? (
		<>
			<Nav />
			<div className="h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-y-auto">
				{filteredProducts.map((p) => (
					<Link
						key={p.id}
						to={`/details/${p.id}`}
						className="mr-3 mb-3 card p-3 border shadow rounded w-[17%] h-[30vh] flex-col flex justify-center items-center"
					>
						<div
							className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
							style={{
								backgroundImage: `url(${p.image})`,
							}}
						></div>
						<h1 className="hover:text-blue-300">{p.title}</h1>
					</Link>
				))}
			</div>
		</>
	) : (
		<Loading />
	);
};

export default Home;
