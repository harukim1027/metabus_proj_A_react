function Forbidden() {
  return (
    <div className="h-screen">
      <h2 className="text-center text-4xl font-bold pt-52 pb-28">
        접근 권한이 없어요..!
      </h2>
      <div className="flex justify-center">
        <img src="/403dog.jpg" alt="" className="w-2/5" />
      </div>
    </div>
  );
}

export default Forbidden;
