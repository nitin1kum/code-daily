import Header from "./_components/Header";
import MainBody from "./_components/MainBody";

function Home() {

  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4 w-full">
        <Header />

        <MainBody/>
      </div>
    </div>
  );
}

export default Home;
