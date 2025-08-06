import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center text-center pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full h-[550px]">
          <img
            src="/plant-hero.jpg"
            alt="Plant sprouting"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

          {/* Hero content aligned right */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-end pr-8 md:pr-24 text-white z-10 text-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Plant observation
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-md">
              An app for recording and identifying plants
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <Link to="/explore">
                <Button>Explore</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mt-16 px-6 md:px-12 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-base text-gray-600">
            Upload a plant photo, identify it using our database, and save it to your profile.
          </p>
        </section>
      </main>
    </>
  );
}