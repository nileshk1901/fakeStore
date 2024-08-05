import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const Create = () => {
	const navigate = useNavigate();
    const [products, setproducts] = useContext(ProductContext);


    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();
        if (title.trim().length < 5 || image.trim().length < 5){
            alert("Provide Product details");
        }
        const product = { id: nanoid(), title, image, category, price, description };
        console.log(product);
		setproducts([...products, product]);
		localStorage.setItem("products", JSON.stringify([...products, product]));
		TransformStream.success("Product Added Successfully");
		navigate("/");
    };

    
 

  return (
		<form onSubmit={AddProductHandler} className="flex flex-col items-center p-[5%] w-screen h-screen ">
			<h1 className="mb-5 w-1/2 text-3xl">Add New Product</h1>
			<input
				type="url"
				placeholder="image link"
				className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
				onChange={(e) => {
					setimage(e.target.value);
				}}
				value={image}
			/>
			<input
				type="text"
				placeholder="title"
				className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
				onChange={(e) => {
					settitle(e.target.value);
				}}
				value={title}
			/>
			<div className='flex justify-between w-1/2'>
				<input
					type="text"
					placeholder="category"
					className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
					onChange={(e) => {
						setcategory(e.target.value);
					}}
					value={category}
				/>
				<input
					type="text"
					placeholder="price"
					className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
					onChange={(e) => {
						setprice(e.target.value);
					}}
					value={price}
				/>
          </div>
          <textarea onChange={(e)=> setdescription(e.target.value) } placeholder='Describe your product' value={description}
          className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' rows="10">
              
          </textarea>
          <div className='w-1/2'>
              <button className='py-2 px-5 border rounder border-blue-200 text-blue-400'>Add Your Product</button>
          </div>
		</form>
	);
}

export default Create
