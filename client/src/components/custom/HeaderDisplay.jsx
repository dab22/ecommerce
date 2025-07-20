import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeaderDisplay = () => {

    const imageData = [
        "/images/pexels-pixabay-207589.jpg",

        "/images/pexels-pixabay-356056.jpg?auto=compress&cs=tinysrgb&w=600",

        "/images/pexels-jessbaileydesign-788946.jpg",

        "/images/pexels-soulful-pizza-2080276-3780681.jpg?auto=compress&cs=tinysrgb&w=600"
    ]

  return (
    <Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible">
      <CarouselContent>
        {imageData.map((image)=>(
            <CarouselItem key={image}>
                <img
                    src={image}
                    loading="lazy" className="object-cover w-full h-[60vh] rounded-3xl"
                />
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeaderDisplay;
