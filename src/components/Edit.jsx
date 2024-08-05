import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';

const Edit = () => {
  
    const [products, setproducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setproduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category:""
    });

    const ChangeHandler = () => {
        setproduct({ ...product, [e.target.name]:e.target.value })
    }
	// const [title, settitle] = useState("");
	// const [image, setimage] = useState("");
	// const [category, setcategory] = useState("");
	// const [price, setprice] = useState("");
    // const [description, setdescription] = useState("");
    
 

    useEffect(() => { 
        setproduct(products.filter((p) => p.id == id)[0]
        );
        
    }, [id]);
   

	const AddProductHandler = (e) => {
		e.preventDefault();
		if (product.title.trim().length < 5 || product.image.trim().length < 5) {
			alert("Provide Product details completely");
        }
        
        const pi = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pi] = { ...products[pi], ...product }; 
		
		
		setproducts(copyData);
		localStorage.setItem("products", JSON.stringify(copyData));
		navigate(-1 );
    };
      
		return (
			<form
				onSubmit={AddProductHandler}
				className="flex flex-col items-center p-[5%] w-screen h-screen "
			>
				<h1 className="mb-5 w-1/2 text-3xl">Edit Your Product</h1>
				<input
					type="url"
					placeholder="image link"
					className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
					name='image'   
                    onChange={ChangeHandler}
					value={product && product.image}
				/>
				<input
					type="text"
					placeholder="title"
					className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
					name='title'   
                    onChange={ChangeHandler}
					value={product && product.title}
				/>
				<div className="flex justify-between w-1/2">
					<input
						type="text"
						placeholder="category"
						className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
						name='category'   
                    onChange={ChangeHandler}
						value={product && product.category}
					/>
					<input
						type="text"
						placeholder="price"
						className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
						name='price'   
                    onChange={ChangeHandler}
						value={product && product.price}
					/>
				</div>
				<textarea
					name='description'   
                    onChange={ChangeHandler}
					placeholder="Describe your product"
					value={product && product.description}
					className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
					rows="10"
				></textarea>
				<div className="w-1/2">
					<button className="py-2 px-5 border rounder border-blue-200 text-blue-400">
						Update Your Product
					</button>
				</div>
			</form>
		);
}

export default Edit
