function NotFound() {
  return (
    <div className=" h-screen">
      <h2 className="text-center text-4xl font-bold pt-52 pb-28">
        페이지를 찾을 수 없어요..!
      </h2>
      <div className="flex justify-center w-full">
        <img src="/404dog.png" alt="" />
      </div>
    </div>
  );
}

export default NotFound;
