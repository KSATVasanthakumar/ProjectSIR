import { useParams, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { slno } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded bg-gray-200"
      >
        ⬅ Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Details Page</h1>

      <div className="p-4 rounded border shadow">
        <p className="text-lg">
          Selected Sl No in Part:
          <span className="font-bold ml-2">{slno}</span>
        </p>
      </div>
    </div>
  );
}
