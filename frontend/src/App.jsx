import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  const previewData = async () => {
    const res = await fetch("http://localhost:3000/api/data");
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      setData(data);
    }
  };

  const downloadData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/download");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "candidates.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="   w-screen h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="justify-center mx-auto">
        <h1 className="text-white text-4xl font-bold underline text-center pt-36">
          Welcome to Team Tailor!
        </h1>
        <div className=" flex gap-x-20 mx-auto justify-center my-12">
          <button
            className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            onClick={previewData}
          >
            <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
              Preview Data
            </span>
          </button>

          <button
            className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            onClick={downloadData}
          >
            <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
              Download CSV file
            </span>
          </button>
        </div>

        <div className=" max-w-screen-lg mx-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Candidate ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  First Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Last Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Application ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Application creation timestamp
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item) => (
                <tr
                  className="odd:bg-gray-50 dark:odd:bg-gray-800/50"
                  key={item.candidate_id}
                >
                  <>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.candidate_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.first_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.last_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.job_application_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {item.job_application_created_at}
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-y-4 mx-auto justify-center"></div>
      </div>
    </div>
  );
}

export default App;
