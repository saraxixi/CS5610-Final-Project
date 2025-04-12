import React from "react";
import "../styles/Studies.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Studies = () => {
  return (
    <>
      <Navbar />

      <div className="studies_banner">
        <h3>The Emergence of Dunhuang Studies</h3>
        <p>Ancient manuscripts and cultural treasures</p>
      </div>

      <div className="studies_main_box">
        <h3>
          The Emergence of Dunhuang Studies
        </h3>
        <div className="studies_main_txt">
          <img className="wenhua" src="../src/assets/images/wenhua.png" alt="Cultural Illustration" />
          <p>
            On May 26, 1900 (Lunar Calendar), an unforgettable date, a hidden cave was discovered in the Mogao Grottoes
            of Dunhuang. The cave was filled with ancient manuscripts. Among the over 50,000 documents unearthed, about
            90% were Buddhist scriptures, with the rest consisting of Taoist, Manichaean, Nestorian texts, official
            documents, classical literature, secular writings, and more. These documents were written not only in
            Chinese but also in Tibetan, Tangut, Khotanese, Sanskrit, Uighur, Sogdian, Turkic, Kuchean, Brahmi, Hebrew,
            and other ancient scripts. Aside from manuscripts, numerous bronze Buddhas, ritual instruments, banners,
            scrolls, silk paintings, and mural sketches were also discovered.
          </p>
          <p>
            The discovery of these materials is of great importance. Alongside oracle bones from Yinxu, the Grand
            Secretariat archives of the Ming and Qing dynasties, and Han bamboo slips from Dunhuang, the Dunhuang cave
            library is considered one of the four greatest ancient Chinese document finds of the 20th century. The
            manuscripts and material culture provide invaluable firsthand resources for the study of medieval China and
            the Silk Road. Dunhuang studies emerged as a global academic discipline, offering scholars new perspectives
            and earning the title “key to unlocking the medieval world.”
          </p>
          <p>
            Unfortunately, the corrupt Qing government failed to protect the cave. Many manuscripts and relics were
            looted by foreign “expeditions,” and ended up scattered across institutions in the UK, France, Japan, the
            US, Russia, and beyond. Only a small number remain in China, marking a tragic loss in Chinese cultural
            history.
          </p>
          <p>
            In 1910, the remaining manuscripts from the Dunhuang cave were transferred to the Imperial Library of
            Peking, the predecessor of the National Library of China. Today, over a century since the discovery, the
            National Library remains the world's largest collection site for Dunhuang manuscripts and has made
            significant contributions to Dunhuang research.
          </p>
          <p>
            To commemorate the centennial of the Dunhuang discovery, the National Library of China and the Chinese
            Dunhuang Turfan Society held a special exhibition. The event aimed to present the cultural value and global
            journey of the manuscripts, promote ongoing conservation and study, and foster cultural exchange and pride
            in Chinese heritage.
          </p>
          <p>
            Dunhuang belongs to all of humanity. It is located in China, but Dunhuang studies span the entire world.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Studies;
