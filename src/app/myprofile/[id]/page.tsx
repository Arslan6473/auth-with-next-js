import React from "react";

function page({ params }: any) {
  return (
    <>
      <div className="flex flex-col min-h-screen gap-y-3 justify-center items-center">
        <h1 className="text-lg">User Details</h1>
        <div className="bg-yellow-500 px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]">
          {params.id}
        </div>
      </div>
    </>
  );
}

export default page;
