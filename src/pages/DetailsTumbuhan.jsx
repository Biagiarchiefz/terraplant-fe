import PlantDetail from "../components/PlantDetail";
import ficusImg from "../assets/Images/ficus.jpg";

const DetailsTumbuhan = () => {
  const plants = [
  {
    name: "Ficus Lirata",
    image: ficusImg,
    description: "Ficus Lirata is a popular indoor plant...",
    height: 75,
    price: "Rp.60.000",
  },
];
  
  return (
    <div>
      {plants.map((item, index) => (
        <PlantDetail
          key={index}
          name={item.name}
          image={item.image}
          description={item.description}
          height={item.height}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default DetailsTumbuhan;
