const SetQuantity = ({
  quantity,
  cardCounter,
  handeQtyIncrease,
  handleQtyDecrease,
}) => {
  const btnStyles =
    "w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 active:scale-95";

  return (
    <div className="flex items-center gap-4">
      {!cardCounter && (
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          Quantity
        </span>
      )}

      <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm">
        <button
          type="button"
          className={`${btnStyles} border-0 border-r border-gray-200 rounded-none`}
          onClick={handleQtyDecrease}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className="w-12 text-center font-semibold text-gray-800 select-none">
          {quantity}
        </span>

        <button
          type="button"
          className={`${btnStyles} border-0 border-l border-gray-200 rounded-none`}
          onClick={handeQtyIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;