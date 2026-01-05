import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import axiosInstance from "../../../axiosInstance";

export default function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Ac_No_2025: "",
    Part_No_2025: "",
    SlNoInPart_2025: "",
    Name_2025: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!form.Ac_No_2025.trim()) e.Ac_No_2025 = "AC No 2025 is required";
    if (!form.Part_No_2025.trim()) e.Part_No_2025 = "Part No 2025 is required";
    if (!form.SlNoInPart_2025.trim())
      e.SlNoInPart_2025 = "SlNo Part No 2025 is required";
    if (!form.Name_2025.trim()) e.Name_2025 = "Name 2025 is required";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (
      !form.Ac_No_2025 ||
      !form.Part_No_2025 ||
      !form.SlNoInPart_2025 ||
      !form.Name_2025
    ) {
      alert("All four fields are mandatory");
      return;
    }

    try {
      const payload = {
        // ------- OLD DATA (2002) -------
        Ac_No_2002: state.AC_No,
        Part_No_2002: state.Part_No,
        SlNoinPart_2002: state.SlNoInpart,
        Name_2002: state.Elector_Name,
        RelationName_2002: state.Relation_Name,
        Age_2002: state.Age,
        Gender_2002: state.Gender,
        Relation_Ship: state.RelationShip,

        // ------- NEW DATA (2025) -------
        Ac_No_2025: form.Ac_No_2025,
        Part_No_2025: form.Part_No_2025,
        SlNoinpart_2025: form.SlNoInPart_2025,
        Name_2025: form.Name_2025,
      };

      const response = await axiosInstance.post(
        "/api/revision/insert",
        payload
      );

      if (response.data.success) {
        alert("Saved Successfully ✅");
        navigate(-1);
      } else {
        alert("Insert failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ❌");
    }
  };

  if (!state) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">No data received.</p>
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto px-6 mt-4">
        <button
          className="mb-3 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-500 text-white px-5 py-3 rounded-t-2xl shadow">
          <h2 className="text-lg font-semibold">
            Elector Details – {state.Elector_Name}
          </h2>
        </div>

        <div className="border border-red-200 rounded-b-2xl shadow-lg p-6 bg-gradient-to-br from-white to-red-50">
          {/* existing values */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <p>
              <span className="font-semibold">Elector Name:</span>{" "}
              {state.Elector_Name}
            </p>
            <p>
              <span className="font-semibold">Relation Name:</span>{" "}
              {state.Relation_Name}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {state.Age}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {state.Gender}
            </p>
            <p>
              <span className="font-semibold">Relation:</span>{" "}
              {state.RelationShip}
            </p>
            <p>
              <span className="font-semibold">AC No:</span> {state.AC_No}
            </p>
            <p>
              <span className="font-semibold">AC Name:</span> {state.ACName}
            </p>
            <p>
              <span className="font-semibold">Part No:</span> {state.Part_No}
            </p>
            <p>
              <span className="font-semibold">Sl No in Part:</span>{" "}
              {state.SlNoInpart}
            </p>
          </div>

          <h3 className="font-semibold text-red-600 mb-2">New 2025 Entry</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* AC 2025 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                AC No 2025 *
              </label>
              <input
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.Ac_No_2025 && "border-red-500"
                }`}
                value={form.Ac_No_2025}
                onChange={(e) =>
                  setForm({ ...form, Ac_No_2025: e.target.value })
                }
              />
              {errors.Ac_No_2025 && (
                <p className="text-red-600 text-xs mt-1">{errors.Ac_No_2025}</p>
              )}
            </div>

            {/* Part 2025 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Part No 2025 *
              </label>
              <input
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.Part_No_2025 && "border-red-500"
                }`}
                value={form.Part_No_2025}
                onChange={(e) =>
                  setForm({ ...form, Part_No_2025: e.target.value })
                }
              />
              {errors.Part_No_2025 && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.Part_No_2025}
                </p>
              )}
            </div>

            {/* SlNo */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                SlNo In Part 2025 *
              </label>
              <input
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.SlNoInPart_2025 && "border-red-500"
                }`}
                value={form.SlNoInPart_2025}
                onChange={(e) =>
                  setForm({ ...form, SlNoInPart_2025: e.target.value })
                }
              />
              {errors.SlNoInPart_2025 && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.SlNoInPart_2025}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Name 2025 *
              </label>
              <input
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.Name_2025 && "border-red-500"
                }`}
                value={form.Name_2025}
                onChange={(e) =>
                  setForm({ ...form, Name_2025: e.target.value })
                }
              />
              {errors.Name_2025 && (
                <p className="text-red-600 text-xs mt-1">{errors.Name_2025}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              Save / Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
