export const LandMap = () => {
    return (
        <div>
                    <div className="max-w-5xl mx-auto">
                <div className=' py-12'>
                <div className='grid grid-cols-4'>
                  <div className="col-span-3">
                  <div className="flex flex-row px-4">
                  <div className='text-3xl text-primary font-bold'>Land map</div>
                  <div className="grow"></div>
                  
                  </div>
                  </div>
                </div>
                  <div className="border border-primary p-2 my-8">
                  <iframe src="https://map.district53.io" className="w-full h-[500px] rounded"></iframe>
                  </div>
</div></div>
        </div>
    );
}
