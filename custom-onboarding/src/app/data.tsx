import React from "react";

export default function DataPage() {
  // Retrieve all user data from localStorage
  const [userData, setUserData] = React.useState<{ name: string; email: string }[]>([]);

  React.useEffect(() => {
    const data = localStorage.getItem("userDataList");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      {userData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
