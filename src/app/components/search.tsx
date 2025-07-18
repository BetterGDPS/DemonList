"use client"

import { useState, useEffect } from "react";
import { Loader2, Search as SearchIcon } from "lucide-react";
import Card from "./card";
import { getLevels, Demon } from "./levels";
import { useSearchParams } from 'next/navigation'

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [demons, setDemons] = useState<Demon[]>([]);
  const [filteredDemons, setFilteredDemons] = useState<Demon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState<'main' | 'unlisted'>('main');
  const searchParams = useSearchParams()

  useEffect(() => {
    const type = searchParams.get('type') === 'unlisted' ? 'unlisted' : 'main';
    setListType(type);
  }, [searchParams])

  useEffect(() => {
    const loadDemons = async () => {
      try {
        setIsLoading(true);
        const data = await getLevels(listType);
        setDemons(data);
        setFilteredDemons(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading demons:", error);
        setIsLoading(false);
      }
    };

    loadDemons();
  }, [listType]);

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

  return (
    <div className="w-full max-w-screen-lg mx-auto px-2 mt-36 sm:mt-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {listType === 'main' ? 'Main List' : 'Unlisted Levels'}
        </h2>
      </div>
      
      <form
        className="flex items-center rounded-xl overflow-hidden bg-main-dark mb-8"
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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-20 w-20 text-main-light" />
        </div>
      ) : (
        <ul className="flex flex-col gap-8">
          {filteredDemons.length > 0 ? (
            filteredDemons.map((demon) => (
              <li key={demon._id}>
                <Card
                  id={demon._id}
                  name={demon.name}
                  place={demon.place}
                  author={demon.author}
                  url={demon.url}
                  unlisted={demon.unlisted}
                />
              </li>
            ))
          ) : (
            <div className="text-center py-8">
              {searchValue ? "No matching demons found" : "No demons in this list"}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}