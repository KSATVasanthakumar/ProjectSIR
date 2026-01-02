import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";

import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [formData, setFormData] = useState({
    Lang: "E",
    FirstName: "",
    RelName: "",
    Age: "",
    Gender: "",
    RelationShip: "",
    Choice: "",
    Option: "",
    Value: 0,
  });

  const [result, setResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false); // modal state
  const [modalMessage, setModalMessage] = useState(""); // dynamic modal message

  const ipAddress = "128.0.0.58";
  const currentLangAttr = formData.Lang === "K" ? "kn" : "en";
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Age" || name === "Value" ? parseInt(value || 0, 10) : value,
    }));
  };

  const handleDuplicationChange = (e) => {
    const value = e.target.value;
    let mainType = "";
    let subType = "";
    let val = 0;

    switch (value) {
      case "1":
        mainType = "Ex";
        subType = "AC";
        break;
      case "2":
        mainType = "Ex";
        subType = "District";
        break;
      case "3":
        mainType = "Pr";
        subType = "AC";
        break;
      case "4":
        mainType = "Pr";
        subType = "District";
        break;
      case "5":
        mainType = "Ex";
        subType = "State";
        break;
      case "6":
        mainType = "Pr";
        subType = "State";
        break;
      default:
        mainType = "";
        subType = "";
        break;
    }

    setFormData((prev) => ({
      ...prev,
      Choice: mainType,
      Option: subType,
      Value: val,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!formData.FirstName) missingFields.push("Name");
    if (!formData.Gender) missingFields.push("Gender");
    if (!formData.RelationShip) missingFields.push("Relationship");
    if (!formData.Choice) missingFields.push("Duplication Type");

    // Age validation
    const age = parseInt(formData.Age, 10);
    if (isNaN(age) || age < 18 || age > 110) {
      missingFields.push("Age (18-110)");
    }

    // AC/District No validation
    if (formData.Option === "AC") {
      if (formData.Value < 1 || formData.Value > 224) {
        missingFields.push("AC No (1-224)");
      }
    } else if (formData.Option === "District") {
      if (formData.Value < 1 || formData.Value > 27) {
        missingFields.push("District No (1-27)");
      }
    }

    if (missingFields.length > 0) {
      setModalMessage(
        formData.Lang === "K"
          ? `ದಯವಿಟ್ಟು ಈ ಕ್ಷೇತ್ರಗಳನ್ನು ಸರಿಪಡಿಸಿ: ${missingFields.join(", ")}`
          : `Please correct the following fields: ${missingFields.join(", ")}`
      );
      setShowModal(true);
      return;
    }

    setLoading(true);
    setSearched(false);

    try {
      const response = await axiosInstance.post(
        "/api/revision/search",
        formData
      );
      const data = response.data;

      setResult(Array.isArray(data) ? data : data ? [data] : []);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getGenderText = (g) =>
    ({ M: "Male", F: "Female", O: "Others" }[g] || "");
  const getRelationText = (r) =>
    ({ F: "Father", M: "Mother", H: "Husband", W: "Wife", O: "Others" }[r] ||
    "");

  const onEdit = (row) => {
    console.log("Edit clicked:", row);
    // open modal / navigate / populate form etc.
  };
  return (
    <>
      <Header language={formData.Lang} />

      <div className="w-full p-4">
        <h2 className="text-xl font-semibold text-center mb-4">
          {formData.Lang === "K" ? "ಹುಡುಕು ಮಾನದಂಡ" : "Search Criteria"}
        </h2>

        <form
          onSubmit={handleSearch}
          className="w-full p-4 rounded-md shadow bg-white flex flex-col gap-6"
        >
          {/* Language Toggle */}
          <div className="flex justify-center">
            <div className="flex flex-col w-full md:w-64">
              <label className="text-sm font-light mb-2">
                {formData.Lang === "K" ? "ಭಾಷೆ" : "Language"}
              </label>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    formData.Lang === "E" ? "font-semibold" : "opacity-60"
                  }`}
                >
                  English
                </span>
                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      Lang: prev.Lang === "E" ? "K" : "E",
                    }))
                  }
                  className="w-12 h-6 rounded-full px-1 flex items-center cursor-pointer"
                  style={{
                    backgroundColor:
                      formData.Lang === "E" ? "#E5E7EB" : "#BFDBFE",
                  }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="w-5 h-5 rounded-full bg-gray-800"
                    style={{ x: formData.Lang === "E" ? 0 : 24 }}
                  />
                </div>
                <span
                  className={`text-sm ${
                    formData.Lang === "K" ? "font-semibold" : "opacity-60"
                  }`}
                >
                  ಕನ್ನಡ
                </span>
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col w-full md:w-56">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ಹೆಸರು" : "Name"}
              </label>
              <input
                lang={currentLangAttr}
                type="text"
                name="FirstName"
                value={formData.FirstName}
                maxLength={75}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </div>

            <div className="flex flex-col w-full md:w-56">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ಸಂಬಂಧ ಹೆಸರು" : "Relation Name"}
              </label>
              <input
                lang={currentLangAttr}
                type="text"
                name="RelName"
                value={formData.RelName}
                maxLength={100}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </div>

            <div className="flex flex-col w-full md:w-32">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ವಯಸ್ಸು" : "Age"}
              </label>
              <input
                type="number"
                name="Age"
                value={formData.Age || ""} // show empty if 0
                min={18}
                max={110}
                onChange={handleChange}
                maxLength={3}
                className="border px-3 py-2 rounded"
              />
            </div>

            <div className="flex flex-col w-full md:w-32">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ಲಿಂಗ" : "Gender"}
              </label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">
                  {formData.Lang === "K" ? "ಆರಿಸಿ" : "Select"}
                </option>
                <option value="M">
                  {formData.Lang === "K" ? "ಪುರುಷ" : "Male"}
                </option>
                <option value="F">
                  {formData.Lang === "K" ? "ಮಹಿಳೆ" : "Female"}
                </option>
                <option value="O">
                  {formData.Lang === "K" ? "ಇತರ" : "Other"}
                </option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-56">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ಸಂಬಂಧ" : "Relationship"}
              </label>
              <select
                name="RelationShip"
                value={formData.RelationShip}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">
                  {formData.Lang === "K" ? "ಆರಿಸಿ" : "Select"}
                </option>
                <option value="F">
                  {formData.Lang === "K" ? "ತಂದೆ" : "Father"}
                </option>
                <option value="M">
                  {formData.Lang === "K" ? "ತಾಯಿ" : "Mother"}
                </option>
                <option value="H">
                  {formData.Lang === "K" ? "ಪತಿ" : "Husband"}
                </option>
                <option value="O">
                  {formData.Lang === "K" ? "ಇತರ" : "Other"}
                </option>
              </select>
            </div>
          </div>

          {/* Duplication Dropdown */}
          <div className="flex flex-wrap gap-4 justify-center items-start">
            <div className="flex flex-col w-full md:w-64">
              <label className="text-sm font-light">
                {formData.Lang === "K" ? "ನಕಲಿ ಪ್ರಕಾರ" : "Duplication Type"}
              </label>
              <select
                onChange={handleDuplicationChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">
                  {formData.Lang === "K" ? "ಆರಿಸಿ" : "Select"}
                </option>
                <option value="1">Exact Duplication AC</option>
                <option value="2">Exact Duplication District</option>
                <option value="3">Probable Duplication AC</option>
                <option value="4">Probable Duplication District</option>
                <option value="5">Exact Duplication State</option>
                <option value="6">Probable Duplication State</option>
              </select>
            </div>

            {(formData.Option === "AC" || formData.Option === "District") && (
              <div className="flex flex-col w-full md:w-56">
                <label className="text-sm font-light">
                  {formData.Option === "AC" ? "AC No" : "District No"}
                </label>
                <input
                  type="number"
                  name="Value"
                  value={formData.Value || ""}
                  onChange={handleChange}
                  min={formData.Option === "AC" ? 1 : 1}
                  max={formData.Option === "AC" ? 224 : 27}
                  className="border px-3 py-2 rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF6C0C] text-white px-6 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
            >
              {loading && (
                <span className="loader-border h-4 w-4 rounded-full border-2 border-t-white animate-spin"></span>
              )}
              {formData.Lang === "K" ? "ಹುಡುಕಿ" : "Search"}
            </button>
          </div>
          <span>IP Address : {ipAddress}</span>
        </form>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-6 w-80 md:w-96 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  &times;
                </button>

                <h2 className="text-lg font-semibold mb-3 text-center">
                  {formData.Lang === "K"
                    ? "ಅನುಭವಿಸಲಾಗದ ಕ್ರಮ"
                    : "Missing Fields"}
                </h2>
                <p className="text-gray-700 text-sm mb-5 text-center">
                  {modalMessage}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#FF6C0C] hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg"
                  >
                    {formData.Lang === "K" ? "ಒಪ್ಪಿಗೆ" : "OK"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Results Section */}
        {searched && !loading && (
          <div className="mt-6">
            {result.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <div className="text-gray-600 font-semibold text-lg">
                  {formData.Lang === "K"
                    ? "ಫಲಿತಾಂಶ ಕಂಡುಬಂದಿಲ್ಲ"
                    : "No result found"}
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border">
                  <table className="min-w-full bg-white rounded-2xl">
                    <thead className="bg-red-700 text-white sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left">Elector Name</th>
                        <th className="px-4 py-3 text-left">Relation Name</th>
                        <th className="px-4 py-3 text-center">Age</th>
                        <th className="px-4 py-3 text-center">Gender</th>
                        <th className="px-4 py-3 text-center">Relationship</th>
                        <th className="px-4 py-3 text-center">AC No</th>
                        <th className="px-4 py-3 text-left">AC Name</th>
                        <th className="px-4 py-3 text-center">Part No</th>
                        <th className="px-4 py-3 text-center">Sl No In Part</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((r, i) => (
                        <tr
                          key={i}
                          className="hover:bg-orange-50 transition border-b"
                        >
                          <td className="px-4 py-2 font-medium">
                            {r.Elector_Name}
                          </td>
                          <td className="px-4 py-2">{r.Relation_Name}</td>
                          <td className="px-4 py-2 text-center">{r.Age}</td>
                          <td className="px-4 py-2 text-center">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {getGenderText(r.Gender)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              {getRelationText(r.RelationShip)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-center">{r.AC_No}</td>
                          <td className="px-4 py-2">{r.ACName}</td>
                          <td className="px-4 py-2 text-center">{r.Part_No}</td>
                          <td className="px-4 py-2 text-center">
                            {r.SlNoInpart}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                navigate(`/details/${r.SlNoInpart}`)
                              }
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100"
                              title="Edit"
                            >
                              {/* Edit pencil icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-red-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4 mt-4">
                  {result.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-2xl shadow-lg bg-gradient-to-br from-white to-red-50 border border-red-200"
                    >
                      <div className="px-4 py-3 rounded-t-2xl bg-red-500 text-white">
                        <div className="text-xs opacity-90">Elector Name</div>
                        <div className="text-lg font-semibold leading-tight">
                          {r.Elector_Name}
                        </div>
                      </div>

                      <div className="p-4 text-sm text-gray-700">
                        <div className="flex justify-between mb-2">
                          <div>
                            <span className="text-gray-500">AC Name: </span>
                            <span className="font-medium">{r.ACName}</span>
                          </div>

                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 border">
                            AC No: {r.AC_No}
                          </span>
                        </div>

                        <div className="border-t my-2" />

                        {/* details grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-gray-500">Relation Name</div>
                            <div className="font-medium">{r.Relation_Name}</div>
                          </div>

                          <div>
                            <div className="text-gray-500">Age</div>
                            <div className="font-medium">{r.Age}</div>
                          </div>

                          <div>
                            <div className="text-gray-500">Gender</div>
                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                              {getGenderText(r.Gender)}
                            </span>
                          </div>

                          <div>
                            <div className="text-gray-500">Relationship</div>
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                              {getRelationText(r.RelationShip)}
                            </span>
                          </div>

                          <div>
                            <div className="text-gray-500">Part No</div>
                            <div className="font-medium">{r.Part_No}</div>
                          </div>

                          <div>
                            <div className="text-gray-500">Sl No In Part</div>
                            <div className="font-medium">{r.SlNoInpart}</div>
                          </div>
                        </div>

                        {/* action row */}
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => navigate(`/details/${r.SlNoInpart}`)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-100"
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.8}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="loader-border h-8 w-8 rounded-full border-4 border-t-orange-500 animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
