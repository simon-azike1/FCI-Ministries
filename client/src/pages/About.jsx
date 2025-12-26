import { motion } from 'framer-motion';
import { Phone, Linkedin, MessageCircle, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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
  name: 'Elliot Lamptey',
  role: 'Pastor',
  image: 'https://scontent.fcmn1-1.fna.fbcdn.net/v/t51.82787-15/600022844_18097310674884407_729885962315168550_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFDAXNcTxrFJd9pw8Vjg3lX5zHYBI8qo67nMdgEjyqjriwbWvl_4eqPv9KdaiECILXT2DLIF9VL_TQP_9796p1T&_nc_ohc=GzcOX8o6Hw4Q7kNvwEtcyKt&_nc_oc=AdncmbDgYEnwYB-nSaUKkyxSsoOMTZW5ebLQHVgB8qHva00LlM3wxbCnR6h5fX23Qyc&_nc_zt=23&_nc_ht=scontent.fcmn1-1.fna&_nc_gid=sPalaLyqomdIo6REyOkKhw&oh=00_AfloLXGmaivqqIae5zmkX6opeTakFYyYDT3uYOYkgzsidw&oe=6954B09B',
  bio: "Dedicated spiritual leader and visionary pastor, committed to guiding the congregation with wisdom, compassion, and a heart for worship, discipleship, and community impact.",
  whatsapp: '212622603713',
  linkedin: 'https://web.facebook.com/elliot.lamptey.5',
}
,
 {
  name: 'Christine Womba Kasoka',
  role: 'Church Elder',
  image: './leader1.jpg',
  bio: "Leading FCI Ministries with vision, passion, and a commitment to fostering spiritual growth and community impact.",
  whatsapp: '212762713334',
  linkedin: 'https://www.linkedin.com/in/christine-womba-kasoka-1314aa1a1/',
},
{
  name: 'Lavinia Dorothea',
  role: 'Church Elder',
  image: './leader2.jpg',
  bio: "Passionate about worship and discipleship, empowering others to grow spiritually and thrive within the church community.",
  whatsapp: '212640351190',
  linkedin: 'https://www.linkedin.com/in/lavinia-dorothea-f-joseph-msc-7390aa2b5/',
},
  
  {
    name: 'Albert Acheampemhene',
    role: 'Church Elder',
    image: './leader3.jpg',
    bio: 'Empowering the next generation to live boldly for Christ.',
    whatsapp: '212627079168',
    linkedin: 'https://www.linkedin.com/in/albert-acheampemhene-asamoah-fosu-972639263/',
  },
  
  {
  name: 'Iyanou Eraste',
  role: 'Church Elder',
  image: './leader8.jpg',
  bio: "Dedicated to inspiring and guiding the next generation to grow in faith, embrace their God-given potential, and live boldly for Christ.",
  whatsapp: '212658152858',
  linkedin: 'https://www.linkedin.com/in/iyanou-eraste-akande/',
}
,
  {
  name: 'Damilare Oladimeji',
  role: 'Church Elder',
  image: './leader4.jpg',
  bio: "Committed church elder focused on nurturing spiritual growth, mentoring the congregation, and fostering a loving, faith-filled environment for children and families.",
  whatsapp: '212762732631',
  linkedin: 'https://www.linkedin.com/in/damilare-oladimeji-564a21129/',
}
,
  {
    name: 'Daini Adebusayo',
    role: 'Minister Shepherd',
    image: './leader7.jpg',
    bio: 'Building strong spiritual foundations in youths through love and teaching.',
    whatsapp: '212762866309',
    linkedin: 'https://www.linkedin.com/in/daini-adebusayo',
  }
  ,
  {
  name: 'JOSEPH AMONOO',
  role: 'Minister Shepherd',
  image: './leader12.png',
  bio: "Committed minister shepherd nurturing children’s spiritual growth through love, guidance, and Christ-centered teaching.",
  whatsapp: '212771359008',
  linkedin: 'https://www.linkedin.com/in/joseph-amonoo',
}

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
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors">

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
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 dark:text-white">
          {t('about.title')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-2xl opacity-90">
          {t('about.subtitle')}
        </p>
      </motion.div>
    </section>
      {/* ================= OUR STORY ================= */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold font-serif mb-4 dark:text-white">{t('about.ourStory')}</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {t('about.storyText1')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
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
<section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
  <div className="container mx-auto px-4">
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-4xl font-bold text-center font-serif mb-12 text-gray-900 dark:text-white"
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
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md overflow-hidden"
        >
          {/* Image */}
          <img
            src={belief.img}
            alt={belief.title}
            className="h-44 w-full object-cover"
          />

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {belief.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {belief.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ================= LEADERSHIP ================= */}
   <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
  <div className="container mx-auto px-4">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">
        {t('about.leadership')}
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto" />
    </motion.div>

    {/* Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {leadership.map((leader, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 }}
          whileHover={{ y: -6 }}
          className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
        >

          {/* Image Container */}
          <div className="relative h-72 overflow-hidden">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center gap-4
                         opacity-0 translate-y-4 group-hover:opacity-100
                         group-hover:translate-y-0 transition-all duration-300"
            >

              {/* WhatsApp */}
              {leader.whatsapp && (
                <a
                  href={`https://wa.me/${leader.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/90 text-green-600
                             hover:bg-green-500 hover:text-white transition"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={22} />
                </a>
              )}

              {/* LinkedIn */}
              {leader.linkedin && (
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/90 text-blue-600
                             hover:bg-blue-600 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {leader.name}
            </h3>
            <p className="text-primary font-semibold mb-3">
              {leader.role}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {leader.bio}
            </p>
          </div>

        </motion.div>
      ))}
    </div>

  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 text-center transition-colors">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto px-4"
        >
          <h2 className="text-4xl font-bold font-serif mb-6 dark:text-white">
            {t('about.joinFamily')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 mb-8">
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
