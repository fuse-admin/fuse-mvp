import Loading from "@/components/shared/Loading";

const LoadingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen min-w-screen gap-5">
      <Loading />
      <div>Loading....</div>
    </main>
  );
};

export default LoadingPage;
