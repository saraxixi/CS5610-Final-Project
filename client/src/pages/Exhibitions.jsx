import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExhibitionCard from "../components/ExhibitionCard";
import EventsCard from "../components/EventsCard";
import "../styles/Exhibitions.css";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);

  const events = [
    {
      title: "The way of tea",
      description:
        "Discover the history of tea drinking and gathering in Japan in this free demonstration of a Japanese tea ceremony.",
      image: "../src/assets/images/event1.jpg",
      category: "Demonstration",
      date: "Various dates",
      price: "Free",
      buttonLabel: "Find out more",
    },
    {
      title: "Relaxed evening: Bollywood dancing",
      description:
        "Inclusive dance workshops designed for neurodivergent children and adults.",
      image: "../src/assets/images/event2.jpg",
      category: "Accessible / Family activity",
      date: "3 May 2025",
      price: "Free",
      buttonLabel: "Book now",
    },
    {
      title: "Psalms from the horse's mouth",
      description:
        "Unravel timeless connections between humans and horses through myths, stories, and performances.",
      image: "../src/assets/images/event3.jpg",
      category: "Performance",
      date: "25 May 2025",
      price: "£10",
      buttonLabel: "Book now",
    },
  ];

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/exhibitions");
        const formatted = res.data.map((ex) => ({
          title: ex.title,
          subtitle: ex.theme,
          image: ex.image,
          startDate: ex.startDate,
          endDate: ex.endDate,
          buttonColor: "yellow",
        }));
        setExhibitions(formatted);
      } catch (err) {
        console.error("Failed to fetch exhibitions", err);
      }
    };
    fetchExhibitions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="exhibitions-page">
        <div className="container">
          <h1>Exhibitions and Events</h1>

          <div className="guide-tour">
            <h2>Guided Tour</h2>
            <div className="event-grid">
              {events.map((ev, index) => (
                <EventsCard
                  key={index}
                  image={ev.image}
                  category={ev.category}
                  date={ev.date}
                  price={ev.price}
                  title={ev.title}
                  description={ev.description}
                  buttonLabel={ev.buttonLabel}
                />
              ))}
            </div>
          </div>

          <h2>Special Exhibitions</h2>
          <div className="exhibition-grid">
            {exhibitions.map((ex, index) => (
              <ExhibitionCard key={index} {...ex} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exhibitions;
