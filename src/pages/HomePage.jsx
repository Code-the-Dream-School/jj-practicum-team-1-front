import { Link } from "react-router-dom";
// import Navbar from "../components/shared/Navbar";
import Button from "../components/shared/Button";

export default function HomePage() {
  return (
    <>
      {/* <Navbar /> */}

      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] min-h-[350px] max-h-[90vh]">
          <img
            src="/plant-hero.jpg"
            alt="Plant sprouting"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Hero content: mobile center → sm left → lg right */}
          <div
            className="
              absolute inset-0 z-10 text-white
              max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
              flex flex-col justify-center
              items-center text-center
              sm:items-start sm:text-left
              lg:items-end lg:text-right
            "
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2">
              Plant observation
            </h1>
            <p className="text-sm sm:text-base lg:text-xl mb-4 max-w-md">
              An app for recording and identifying plants
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/plants">
                <Button>Explore Plants</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mt-12 sm:mt-16 lg:mt-24 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Upload a plant photo, identify it using our database, and save it
              to your profile.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
