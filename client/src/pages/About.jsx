import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

function About() {
  const { t, i18n } = useTranslation();

  // Force re-render when language changes
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  const leadership = [
    {
      name: 'Christine Womba Kasoka',
      role: 'Church Elder',
      image: './leader1.jpg',
      bio: 'Leading FCI Ministries with passion and dedication for over 15 years.',
    },
    {
      name: 'Lavinia Dorothea',
      role: 'Church Elder',
      image: './leader2.jpg',
      bio: "Passionate about worship, women's ministry, and spiritual growth.",
    },

     {
      name: 'Alfred Balenor',
      role: "Church Elder",
      image: './leader9.jpg',
      bio: 'Building strong spiritual foundations in children through love and teaching.',
    },
    {
      name: 'Albert Acheampemhene',
      role: 'Church Elder',
      image: './leader3.jpg',
      bio: 'Empowering the next generation to live boldly for Christ.',
    },
    {
      name: 'Iyanou Eraste',
      role: 'Church Elder',
      image: './leader8.jpg',
      bio: 'Empowering the next generation to live boldly for Christ.',
    },
    {
      name: 'Damilare Oladimeji',
      role: "Church Elder",
      image: './leader4.jpg',
      bio: 'Building strong spiritual foundations in children through love and teaching.',
    },
    {
      name: 'Daini Adebusayo',
      role: "Minister Shepherd",
      image: './leader7.jpg',
      bio: 'Building strong spiritual foundations in children through love and teaching.',
    },
    
    {
      name: 'JOSEPH AMONOO',
      role: "Minister Shepherd",
      image: './leader12.png',
      bio: 'Building strong spiritual foundations in children through love and teaching.',
    },
   
  ];

  const beliefs = [
    { title: 'The Bible', description: 'Inspired Word of God and final authority.', img: 'https://images.unsplash.com/photo-1554355409-7d69eaad80d9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9seSUyMGJpYmxlfGVufDB8fDB8fHww' },
    { title: 'The Trinity', description: 'One God: Father, Son, and Holy Spirit.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1zIUGpAh7gDjGZ-rAvg68JpVKlfxiIAMJQ&s' },
    { title: 'Salvation', description: 'By grace through faith in Jesus Christ.', img: './fci_worship.jpg' },
    { title: 'The Church', description: 'The body of Christ on earth.', img: 'https://media.istockphoto.com/id/147712110/photo/church-with-symmetrical-design.jpg?s=612x612&w=0&k=20&c=e40FAFyJWRG46U4j4sxEi1iQnTzOhxKy1qenCUGFnjo=' },
    { title: 'The Great Commission', description: 'Making disciples of all nations.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL-LN3-CuJal6dxogSrILOJDw6pzSyBWY74g&s' },
    { title: 'Eternal Life', description: 'Resurrection and eternal life in Christ.', img: './person1.jpg' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen overflow-hidden">

      {/* ================= HERO SECTION (VIDEO) ================= */}
     <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/fci_worship.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Text Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
          {t('about.title')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-2xl opacity-90">
          {t('about.subtitle')}
        </p>
      </motion.div>
    </section>
      {/* ================= OUR STORY ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold font-serif mb-4">{t('about.ourStory')}</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-lg text-gray-700 mb-4">
              {t('about.storyText1')}
            </p>
            <p className="text-lg text-gray-700">
              {t('about.storyText2')}
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            src="./pastors wife.jpg"
            alt="Church community"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* ================= BELIEFS ================= */}
     {/* ================= BELIEFS ================= */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-4xl font-bold text-center font-serif mb-12"
    >
      {t('about.beliefs')}
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {beliefs.map((belief, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden"
        >
          {/* Image */}
          <img
            src={belief.img}
            alt={belief.title}
            className="h-44 w-full object-cover"
          />

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              {belief.title}
            </h3>
            <p className="text-gray-600">
              {belief.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ================= LEADERSHIP ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center font-serif mb-12">
            {t('about.leadership')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
              >
                <img src={leader.image} alt={leader.name} className="h-64 w-full object-cover" />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg">{leader.name}</h3>
                  <p className="text-primary font-semibold">{leader.role}</p>
                  <p className="text-sm text-gray-600 mt-2">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gray-50 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto px-4"
        >
          <h2 className="text-4xl font-bold font-serif mb-6">
            {t('about.joinFamily')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-8">
            {t('about.joinText')}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/events"
              className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:scale-105 transition"
            >
              {t('about.visitUs')}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold hover:bg-black hover:text-white transition"
            >
              {t('about.contactUs')}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
