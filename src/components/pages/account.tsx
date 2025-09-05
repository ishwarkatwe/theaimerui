import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { API_ADD_POST } from "../utils/constants/endpoints";
import useStore from "../utils/states/notes";
import { showToast } from "../utils/toastr";

const fetchData = async () => {
  const res = await fetch(API_ADD_POST, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  return await res.json();
};

function Account() {
  const user = useStore((state: any) => state.user);
  const [list, setList] = useState<{
    data: Array<{
      _id: string;
      name: string;
      category: {
        name: string;
      };
    }>;
    total: number;
  }>();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      setReload(false);
      setLoading(true);
      const list = await fetchData();
      setList(list);
      setLoading(false);
    })();
  }, [reload]);

  const onDelete = async (id: string) => {
    const c = confirm("Are you sure to delete");
    if (c) {
      const res = await fetch(`${API_ADD_POST}/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      await res.json();

      if (res.ok) {
        showToast("Post deleted successfully");
        setReload(true);
      }
    }
  };

  return (
    <div className="mt-2">
      <Label className="capitalize text-lg">
        Welcome: {user ? user.username : "Guest"}
      </Label>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">React Posts</h2>
        {loading ? "Loading..." : ""}
        {list?.data.length == 0 && <p>No posts available.</p>}

        {!loading && Boolean(list?.data.length) && (
          <table className=" table table-auto">
            <tr>
              <th className="w-2xs text-left">Name</th>
              <th className="w-2xs text-left">Category</th>
              <th></th>
            </tr>
            {list?.data.map((l) => (
              <tr>
                <td>{l.name}</td>
                <td>{l.category.name}</td>
                <td>
                  <button onClick={() => onDelete(l._id)}>X</button>
                </td>
              </tr>
            ))}
          </table>
        )}
      </section>
    </div>
  );
}

export default Account;
