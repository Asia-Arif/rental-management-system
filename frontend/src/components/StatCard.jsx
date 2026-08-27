const StatCard = ({ title, value, icon, description }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

                {/* Text */}
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-2 text-xs text-slate-500">
                            {description}
                        </p>
                    )}
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                    {icon}
                </div>

            </div>
        </div>
    );
};

export default StatCard;