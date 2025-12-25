import plant1 from "../assets/images/plants1.webp";
import { Heart } from "lucide-react";
import { Link } from "react-router";

const PlantCard = (props) => {
  // const [showAll, setShowAll] = useState(false);

  const { classname, plants } = props;

  return (
    <div className={`justify-between gap-4 ${classname}`}>
      {plants?.map((plant, index) => (
        // iterasi pertama index ke 0 > 1 kan false brrti data dengan index ke 0 kita tidak hidden kan, begitu juga smpe index ke 1, index ke 2 > 1 kan true jadi ukuran mobile datanya kita tidak tampilkan di ukuran dektop tampil
        <Link
          to={`/plant/${plant.id}`}
          key={plant.id}
          className={`flex flex-col mb-7 w-full gap-1 ${
            index > 1 ? "hidden md:flex" : " "
          }`}
        >
          <img src={plant1} alt="" className="h-100 object-cover" />
          <div className="flex justify-between gap-3">
            <h3>{plant.nama}</h3>
            <Heart size={20} />
          </div>
          <p>Rp. {plant.harga.toLocaleString()}</p>
          <button className="text-[#f5f5f5] py-3 px-6 bg-[#1B1B1B] text-center w-full">
            Buy
          </button>
        </Link>
      ))}
    </div>
  );
};

export default PlantCard;