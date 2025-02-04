import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import MainBody from "./_components/MainBody";
import OutputPanel from "./_components/OutputPanel";

function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-2 sm:p-4 w-full">
        <Header />
        <div className="block lg:hidden">
          <div className="relative flex-col lg:flex-row gap-2 flex lg:gap-0 mt-2 w-full">
            <EditorPanel width={100} />
            <OutputPanel width={100} overlay={false} />
          </div>
        </div>
        <MainBody />
      </div>
    </div>
  );
}

export default Home;
