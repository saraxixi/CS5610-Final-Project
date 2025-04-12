import React from "react";
import "../styles/Studies.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Studies = () => {
  return (
    <>
      <Navbar />

      <div className="studies_banner">
        <h3>Studies & History</h3>
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

        <div className="history_main_box">
          <h3>
            Historical Introduction
          </h3>
          <div className="history_main_txt">
            <p>
              Dunhuang has over 2,000 years of history. Before the Qin and Han dynasties, it was inhabited by nomadic
              tribes such as the Yuezhi and Wusun. In the early Western Han period, the Xiongnu occupied the area until
              121 BCE when the Han army defeated them. By 111 BCE, Dunhuang became one of the four commanderies in the
              Hexi Corridor. From this time, it served as a key portal for military and cultural exchange between Central
              China and the Western Regions.
            </p>
            <p>
              During the Sixteen Kingdoms period, although war ravaged the Central Plains, Dunhuang remained relatively
              peaceful. It became a cultural refuge where Confucian classics were preserved and Buddhist monks translated
              scriptures. The Mogao Grottoes were first established in 366 CE by a monk named Le Zun, inspired by a vision
              of a thousand Buddhas.
            </p>
            <p>
              In the Sui and early Tang periods, Buddhism flourished and military governance strengthened the region.
              Dunhuang developed into a vital hub for trade, religion, and cultural convergence along the Silk Road.
            </p>
            <p>
              Following the An Lushan Rebellion in 755 CE, Dunhuang fell to the Tibetan Empire in 781. Although under
              Tibetan rule, Buddhism continued to grow and the Mogao Grottoes expanded.
            </p>
            <p>
              In 848 CE, Zhang Yichao reclaimed Dunhuang and founded the Guiyi Army regime, which lasted over 200 years.
              The regime promoted Sinicization and maintained peaceful relations with neighboring ethnic groups and the
              Song Dynasty. These policies helped preserve Buddhist heritage and cultural exchange.
            </p>
            <p>
              In 1036 and 1227, Dunhuang was successively occupied by the Tangut (Western Xia) and Mongols. Although still
              revered as a Buddhist site, its importance as a Silk Road hub gradually declined with the rise of maritime
              trade routes.
            </p>
            <p>
              By the Ming Dynasty, Dunhuang was isolated and the Mogao Grottoes largely abandoned. However, restoration
              efforts in the Qing era resumed under imperial policies. The accidental discovery of the Library Cave in
              1900 brought global attention, but foreign explorers took away large numbers of invaluable manuscripts and
              relics.
            </p>
            <p>
              Despite this loss, the artistic and cultural richness of the Mogao Grottoes continues to amaze. Their art
              embodies a synthesis of Indian, Central Asian, Middle Eastern, and Chinese influences, symbolizing a grand
              convergence of civilizations.
            </p>
            <p>
              After the founding of the People's Republic of China, real protection and research efforts began. Recognized
              as a national heritage site, Dunhuang has become a symbol of Chinese civilization. Since the 1980s, the
              Dunhuang Studies field has expanded globally, and the 100th anniversary of the Library Cave's discovery in
              2000 marked a new era in international scholarship.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Studies;
