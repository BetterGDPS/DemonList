"use client"

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Card from "./card";
import { demons } from "./demon"

export default function Search() {
	const [query, setQuery] = useState("");
	const [searchValue, setSearchValue] = useState("");

	const filtered = demons.filter(demon =>
		demon.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchValue(query);
	};

	return (
		<div className="w-full max-w-screen-lg mx-auto px-2 mt-4">
			<form
				className="flex items-center rounded-xl overflow-hidden bg-main-dark"
				onSubmit={handleSubmit}
			>
				<input
					type="search"
					placeholder="Search..."
					value={query}
					onChange={e => setQuery(e.target.value)}
					className="w-full h-12 px-4 bg-main-light text-white placeholder-white outline-none focus:bg-main-light/90"
				/>
				<button
					type="submit"
					className="h-12 w-20 flex items-center justify-center bg-main-darklight hover:bg-main-darklight/80"
				>
					<SearchIcon size={24} className="text-black" />
				</button>
			</form>
			<ul className="flex flex-col gap-8 mt-4">
				{filtered.map(demon => (
					<li key={demon.id}>
						<Card
							id={demon.id}
							name={demon.name}
							place={demon.place}
							author={demon.author}
							url={demon.url}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}