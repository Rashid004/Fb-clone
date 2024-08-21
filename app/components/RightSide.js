/** @format */
export default function RightSidebar() {
  return (
    <aside className="w-64 p-4 hidden lg:flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Right Sidebar</h2>
      {/* Add your widgets or additional components here */}
      <div className="bg-white p-4 rounded-md shadow-md">Widget 1</div>
      <div className="bg-white p-4 rounded-md shadow-md">Widget 2</div>
      <div className="bg-white p-4 rounded-md shadow-md">Widget 3</div>
    </aside>
  );
}
