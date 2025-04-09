import shoesboy from "../../images/categories/casual.jpg";
import sunGlasses from "../../images/categories/sunglassess-man.svg";
import women from "../../images/categories/women.svg";
import gym from "../../images/categories/portrait-handsome-smiling-young-model-man-dressed-jeans-clothes-sunglasses-posing-isolated.jpg";
import { Link } from "react-router-dom";

export default function DressStyle() {
  const categories = [
    { name: "Casual", image: shoesboy },
    { name: "Formal", image: sunGlasses },
    { name: "Party", image: women },
    { name: "Creative", image: gym },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="py-8 bg-gray-200 rounded-3xl shadow-lg overflow-hidden">
        <h3 className="text-4xl font-bold py-6 text-center text-black">
          BROWSE BY DRESS DETAILS
        </h3>

        <div className="grid grid-cols-12 gap-10 justify-items-center items-center px-0 sm:px-4 md:px-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`category/${category.name}`}
              className={`cursor-pointer relative col-span-12 ${
                index % 2 === 0 ? "md:col-span-4" : "md:col-span-8"
              } rounded-none sm:rounded-2xl bg-cover bg-center h-[350px] w-full shadow-md transition-transform md:hover:scale-105 duration-400`}
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div>
                <span className="absolute text-black left-5 top-4 text-xl font-semibold bg-white px-3 py-1 rounded-md shadow">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
