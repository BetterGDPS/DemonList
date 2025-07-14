"use client"

import { useState, useEffect } from "react";
import { Loader2, Search as SearchIcon } from "lucide-react";
import Card from "./card";
import { getLevels, Demon } from "./levels";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [demons, setDemons] = useState<Demon[]>([]);
  const [filteredDemons, setFilteredDemons] = useState<Demon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDemons = async () => {
      try {
        const data = await getLevels();
        setDemons(data);
        setFilteredDemons(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading demons:", error);
        setIsLoading(false);
      }
    };

    loadDemons();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredDemons(demons);
    } else {
      const filtered = demons.filter(demon =>
        demon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredDemons(filtered);
    }
  }, [searchValue, demons]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchValue(query);
  };

  if (isLoading) {
    return (
		<div className="fixed inset-0 flex items-center justify-center">
			<Loader2 className="animate-spin h-20 w-20 text-main-light" />
		</div>
	)
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto px-2 mt-20">
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
      <ul className="flex flex-col gap-8 mt-8">
        {filteredDemons.length > 0 ? (
          filteredDemons.map((demon) => (
            <li key={demon._id}>
              <Card
                id={demon._id}
                name={demon.name}
                place={demon.place}
                author={demon.author}
                url={demon.url}
              />
            </li>
          ))
        ) : (
          <div className="text-center py-8">No demons found</div>
        )}
      </ul>
    </div>
  );
}