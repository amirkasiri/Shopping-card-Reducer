import React, { useReducer } from "react";

const initialState = [];

function reducer(cart, action) {
  switch (action.type) {
    case "ADD":
      const exists = cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { ...action.payload, quantity: 1 }];

    case "REMOVE":
      return cart
        .map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "DELETE":
      return cart.filter((item) => item.id !== action.payload.id);

    default:
      return cart;
  }
}

const products = [
  {
    id: 1,
    name: " هودی مشکی ",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/d2b235fde531237fba6e7d991f5663da12c4bff6_1606893121.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 2,
    name: "پیراهن مردانه",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/a2420017bf5c7d8b5598bb7cf24f16950d912cf8_1704628641.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 3,
    name: "کت چرم",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/81fa16322451ef963bf300fe7f2d60a80f36007d_1698468401.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 4,
    name: "پالتو مردانه",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/51b0f3fb73e2ba95bd133f1693b450b41e56f755_1699178642.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 5,
    name: "پافر",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/af1c72d2fc71a76ac59534821f14c629e27a6c57_1673965069.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 6,
    name: "هودی سفید",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/119585067.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
  {
    id: 7,
    name: "عینک خلبانی",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/abd66134990fb43522aaea9772cbdf3d1b58b5be_1700049006.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },

  {
    id: 8,
    name: "هودی اسپرت",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/478a6109439af55ae17d3ec190a7b72b81846ad4_1609757676.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },

  {
    id: 9,
    name: "نیم بوت چرم",
    image:
      "https://dkstatics-public.digikala.com/digikala-products/44b889f67162341c1f2bbcf767cc60c4a6c948a4_1664340163.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
  },
];

function ShoppingCart() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD", payload: product });
  };

  return (
    <div className="bg-[#E8F5E9] min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 my-6 ">محصولات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-lg shadow-lg bg-white transform hover:scale-110 transition-transform duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-md mb-4 mx-auto"
            />
            <p className="text-lg font-semibold text-center mb-4">
              {product.name}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-all hover:scale-x-105  p-2 font-serif"
            >
              افزودن به سبد خرید
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">سبد خرید</h2>
      <ul className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <span className="text-gray-800 ">
                <span className="font-bold"> {item.name} </span> - تعداد :{" "}
                {item.quantity}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({ type: "DELETE", payload: { id: item.id } })
                }
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition-all hover:scale-105 "
              >
                حذف
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE", payload: { id: item.id } })
                }
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all hover:scale-105"
              >
                -
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "ADD", payload: { id: item.id } })
                }
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all hover:scale-105"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
