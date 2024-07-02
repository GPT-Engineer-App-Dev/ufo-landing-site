import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const fetchSightings = async () => {
  const response = await fetch("https://api.example.com/ufo-sightings");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["ufoSightings"],
    queryFn: fetchSightings,
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/ufo-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold">Discover the Mysteries of the Skies</h1>
          <p className="mt-4 text-xl">Join us in exploring the unknown</p>
          <Button className="mt-8">Learn More</Button>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>About UFOs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unidentified Flying Objects (UFOs) have fascinated people for decades. From mysterious lights in the sky to close encounters, UFO sightings have sparked curiosity and debate. Join us as we delve into the world of UFOs and explore the evidence, theories, and stories surrounding these enigmatic phenomena.</p>
          </CardContent>
        </Card>
      </section>

      {/* Sightings Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Recent Sightings</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading sightings: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((sighting) => (
              <Card key={sighting.id}>
                <img src={sighting.image} alt={sighting.title} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{sighting.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{format(new Date(sighting.date), "MMMM dd, yyyy")}</p>
                  <p>{sighting.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} UFO Sightings. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;