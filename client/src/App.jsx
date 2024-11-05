import { useState } from "react";
import ReactLoading from "react-loading";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const websiteurl = "http://localhost:5000";

  function getYouTubeVideoID(url) {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  }

  const getData = async () => {
    const videoID = getYouTubeVideoID(url);
    if (!videoID) {
      setError("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setVideoData(null);
      const response = await fetch(
        `${websiteurl}/api/download?videoID=${videoID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] font-sans min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-16">
            <a className="text-xl font-bold" href="#">
              Online Video Downloader
            </a>
            <button className="lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-16 6h16"
                />
              </svg>
            </button>
            <div className="hidden lg:flex space-x-8 py-4">
              <a
                className="text-white hover:text-gray-300 transition"
                href="https://github.com/TheChirag356"
              >
                Chirag&apos;s Github
              </a>
              <a
                className="text-white hover:text-gray-300 transition"
                href="https://github.com/exxonracle"
              >
                Shivansh&apos;s Github
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <input
            type="url"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Youtube Video URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mt-4"
            onClick={getData}
          >
            Download
          </button>

          {loading && (
            <div className="flex justify-center mt-8">
              <ReactLoading
                type="bars"
                color="#ffffff"
                height={50}
                width={50}
              />
            </div>
          )}

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {videoData && (
            <div className="text-white mt-8">
              <h2 className="text-2xl font-bold">{videoData.title}</h2>
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className="mt-4"
              />
              <p>Uploader: {videoData.uploader}</p>
              <p>Duration: {videoData.duration}</p>
              <div>
                {videoData.downloads.map((download, index) => (
                  <a
                    key={index}
                    href={download.url}
                    className="text-blue-500 mt-2 block"
                  >
                    Download {download.format}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center mt-auto">
        <p>Made by Chirag Arora & Shivansh Yadav</p>
      </footer>
    </div>
  );
};

export default App;
