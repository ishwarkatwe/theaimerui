import { useEffect, useState } from "react";
import CardView from "../common/cardView";
import type { Item } from "../utils/interface/Items";
import useStore from "../utils/states/notes";

function Home() {
  const search = useStore((state: any) => state.search);
  const notes = useStore((state: any) => state.notes);
  const [filteredNotes, setFilteredNotes] = useState<Item[]>([]);

  useEffect(() => {
    const filtered = (notes || []).filter((item: Item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [search, notes]);

  return (
    <section>
      {search && <p>Search results for : {search}</p>}
      <div className="py-2">
        {filteredNotes.length === 0 && <p>Please wait...</p>}
        {filteredNotes.map((item: Item) => (
          <CardView key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Home;
