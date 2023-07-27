interface Props {
  title: string;
  data: number;
  icon: string;
}

export default function DashboardCard({ title, data, icon }: Props) {
  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 text-base font-semibold leading-normal">
                  {title}
                </p>
                <h5 className="mb-0 font-bold">{data}</h5>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-blue-600 to-cyan-400">
                <i
                  className={`ni ${icon} leading-none ni-money-coins text-lg relative top-3.5 text-white`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
