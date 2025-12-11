import PlantDetail from "../components/PlantDetail";

const DetailsTumbuhan = () => {
  const plants = [
    {
      name: "Ficus Lirata",
      image: "/assets/ficus.jpg",
      description: "Ficus Lirata is a popular indoor plant...",
      height: 80,
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
