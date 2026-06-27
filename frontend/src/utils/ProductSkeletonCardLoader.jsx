const ProductSkeletonCardLoader = () => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            {/* Image placeholder */}
            <div className="bg-gray-400 h-56 w-full" />
            
            {/* Content placeholder */}
            <div className="p-4 flex flex-col gap-3">
                <div className="bg-gray-400 h-4 w-3/4 rounded-full" />
                <div className="bg-gray-200 h-4 w-1/2 rounded-full" />
                <div className="bg-gray-200 h-4 w-1/4 rounded-full" />
                <div className="bg-gray-200 h-9 w-full rounded-xl mt-2" />
            </div>
        </div>
    );
};

export default ProductSkeletonCardLoader;