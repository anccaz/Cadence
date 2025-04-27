export default function SearchPage() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <form>
          <input
            type="text"
            placeholder="Type to search..."
            className="border rounded p-2 w-full max-w-md"
          />
        </form>
        {/* Add search results UI here */}
      </div>
    );
  }