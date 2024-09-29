export default function Social() {
  return (
    <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-4">
      <div className="size-10 rounded-lg">
        <img src="../public/2r6C.gif" alt="" />
      </div>
      <div>
        <span className="font-bold text-pink-300">Share Solo Hub</span>
        <p className="text-sm font-semibold text-black dark:text-white">
          to your friends
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-500 p-2 px-4 transition-all hover:-translate-y-1 hover:bg-blue-600">
          <img src="../public/telegram.png" alt="" className="size-6" />
          <span className="font-semibold text-white">Share</span>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black p-2 px-4 transition-all hover:-translate-y-1">
          <img src="../public/twitter (1).png" alt="" className="size-6" />
          <span className="font-semibold text-white">Share</span>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-500 p-2 px-4 transition-all hover:-translate-y-1 hover:bg-blue-600">
          <img src="../public/facebook.png" alt="" className="size-6" />
          <span className="font-semibold text-white">Share</span>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 p-2 px-4 transition-all hover:-translate-y-1">
          <img src="../public/web.png" alt="" className="size-4" />
        </div>
      </div>
    </div>
  );
}
