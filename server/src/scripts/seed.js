const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Sermon = require('../models/Sermon');
const Event = require('../models/Event');
const Ministry = require('../models/Ministry');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@fciministries.ma',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      name: 'Editor User',
      email: 'editor@fciministries.ma',
      password: await bcrypt.hash('editor123', 10),
      role: 'editor',
    },
  ];

  await User.deleteMany();
  await User.insertMany(users);
  console.log('✅ Users seeded');
  return users[0]._id; // Return admin ID for use in other seeds
};

const seedSermons = async (adminId) => {
  const sermons = [
    {
      title: {
        en: 'The Power of Faith in Difficult Times',
        fr: 'Le Pouvoir de la Foi dans les Temps Difficiles',
        ar: 'قوة الإيمان في الأوقات الصعبة',
      },
      description: {
        en: 'Discover how faith can transform your life and bring you closer to God even in the midst of trials. This powerful message explores the biblical foundations of faith and how to apply them in your daily walk, with practical examples from Scripture and real-life testimonies.',
        fr: 'Découvrez comment la foi peut transformer votre vie et vous rapprocher de Dieu même au milieu des épreuves. Ce message puissant explore les fondements bibliques de la foi et comment les appliquer dans votre marche quotidienne, avec des exemples pratiques de l\'Écriture et des témoignages réels.',
        ar: 'اكتشف كيف يمكن للإيمان أن يحول حياتك ويقربك من الله حتى في وسط التجارب. تستكشف هذه الرسالة القوية الأسس الكتابية للإيمان وكيفية تطبيقها في سيرك اليومي، مع أمثلة عملية من الكتاب المقدس وشهادات من الحياة الواقعية.',
      },
      speaker: 'Pastor John Smith',
      date: new Date('2025-01-15'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Sunday Service',
      tags: ['faith', 'christian living', 'inspiration', 'trials', 'trust'],
      series: 'Living by Faith',
      duration: 45,
      views: 1250,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Walking in God\'s Love Every Day',
        fr: 'Marcher dans l\'Amour de Dieu Chaque Jour',
        ar: 'السير في محبة الله كل يوم',
      },
      description: {
        en: 'Learn how to walk in God\'s love and extend that love to others in practical ways. A transformative message about the greatest commandment and how love changes everything in our relationships, families, and communities.',
        fr: 'Apprenez à marcher dans l\'amour de Dieu et à étendre cet amour aux autres de manière pratique. Un message transformateur sur le plus grand commandement et comment l\'amour change tout dans nos relations, nos familles et nos communautés.',
        ar: 'تعلم كيف تسير في محبة الله وتمد تلك المحبة للآخرين بطرق عملية. رسالة تحويلية عن الوصية الأعظم وكيف تغير المحبة كل شيء في علاقاتنا وعائلاتنا ومجتمعاتنا.',
      },
      speaker: 'Pastor Sarah Johnson',
      date: new Date('2025-01-22'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Bible Study',
      tags: ['love', 'relationships', 'commandments', 'compassion'],
      series: 'The Love Series',
      duration: 38,
      views: 890,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Prayer That Moves Mountains',
        fr: 'La Prière qui Déplace les Montagnes',
        ar: 'الصلاة التي تحرك الجبال',
      },
      description: {
        en: 'Unlock the power of prayer in your life. This sermon teaches the principles of effective prayer and how to see breakthrough in your circumstances. Learn the secrets of persistent prayer, prayer with faith, and praying God\'s will.',
        fr: 'Débloquez le pouvoir de la prière dans votre vie. Ce sermon enseigne les principes de la prière efficace et comment voir une percée dans vos circonstances. Apprenez les secrets de la prière persistante, de la prière avec foi et de prier la volonté de Dieu.',
        ar: 'أطلق قوة الصلاة في حياتك. تعلم هذه العظة مبادئ الصلاة الفعالة وكيفية رؤية الاختراق في ظروفك. تعلم أسرار الصلاة المثابرة والصلاة بالإيمان والصلاة بمشيئة الله.',
      },
      speaker: 'Pastor David Lee',
      date: new Date('2025-01-29'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Prayer Meeting',
      tags: ['prayer', 'faith', 'breakthrough', 'persistence'],
      series: 'Power in Prayer',
      duration: 42,
      views: 1450,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Living in Your God-Given Purpose',
        fr: 'Vivre dans Votre But Donné par Dieu',
        ar: 'العيش في هدفك الممنوح من الله',
      },
      description: {
        en: 'God has a unique purpose for your life. Discover how to identify and fulfill your divine calling through prayer, seeking godly counsel, and stepping out in faith. Learn the steps to discovering your spiritual gifts and using them for God\'s glory.',
        fr: 'Dieu a un but unique pour votre vie. Découvrez comment identifier et accomplir votre appel divin par la prière, en cherchant des conseils pieux et en sortant dans la foi. Apprenez les étapes pour découvrir vos dons spirituels et les utiliser pour la gloire de Dieu.',
        ar: 'لله هدف فريد لحياتك. اكتشف كيفية تحديد وتحقيق دعوتك الإلهية من خلال الصلاة وطلب المشورة التقوية والخروج بالإيمان. تعلم الخطوات لاكتشاف مواهبك الروحية واستخدامها لمجد الله.',
      },
      speaker: 'Pastor John Smith',
      date: new Date('2025-02-05'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Sunday Service',
      tags: ['purpose', 'calling', 'destiny', 'spiritual gifts'],
      series: 'Kingdom Purpose',
      duration: 50,
      views: 2100,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'The Transforming Grace of God',
        fr: 'La Grâce Transformatrice de Dieu',
        ar: 'نعمة الله المحولة',
      },
      description: {
        en: 'Experience the transforming power of God\'s amazing grace. This message will encourage you in your walk with Christ and help you understand the depth of God\'s love and mercy. Grace is not just forgiveness - it\'s the power to live victoriously.',
        fr: 'Expérimentez le pouvoir transformateur de la grâce incroyable de Dieu. Ce message vous encouragera dans votre marche avec Christ et vous aidera à comprendre la profondeur de l\'amour et de la miséricorde de Dieu. La grâce n\'est pas seulement le pardon - c\'est le pouvoir de vivre victorieusement.',
        ar: 'جرب القوة التحويلية لنعمة الله المذهلة. هذه الرسالة ستشجعك في مسيرتك مع المسيح وتساعدك على فهم عمق محبة الله ورحمته. النعمة ليست مجرد مغفرة - إنها القوة للعيش بانتصار.',
      },
      speaker: 'Pastor Sarah Johnson',
      date: new Date('2025-02-12'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Sunday Service',
      tags: ['grace', 'salvation', 'freedom', 'transformation'],
      series: 'Understanding Grace',
      duration: 43,
      views: 1680,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Building Strong Families on Biblical Foundations',
        fr: 'Construire des Familles Fortes sur des Fondations Bibliques',
        ar: 'بناء عائلات قوية على أسس كتابية',
      },
      description: {
        en: 'Learn God\'s design for the family and how to build a home that honors Him. Practical teaching on marriage, parenting, and creating a Christ-centered household that will stand the test of time.',
        fr: 'Apprenez le plan de Dieu pour la famille et comment construire une maison qui L\'honore. Enseignement pratique sur le mariage, l\'éducation des enfants et la création d\'un foyer centré sur Christ qui résistera à l\'épreuve du temps.',
        ar: 'تعلم تصميم الله للعائلة وكيفية بناء منزل يكرمه. تعليم عملي حول الزواج وتربية الأطفال وإنشاء أسرة تتمحور حول المسيح ستصمد أمام اختبار الزمن.',
      },
      speaker: 'Pastor Michael Brown',
      date: new Date('2025-02-19'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Special Event',
      tags: ['family', 'marriage', 'parenting', 'relationships'],
      series: 'Family Matters',
      duration: 48,
      views: 1120,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Spiritual Warfare: Standing Strong in Christ',
        fr: 'Combat Spirituel: Rester Fort en Christ',
        ar: 'الحرب الروحية: الوقوف بقوة في المسيح',
      },
      description: {
        en: 'Understanding the spiritual battle we face and how to stand firm in God\'s power. Learn about the armor of God and how to effectively resist the enemy\'s attacks through prayer, God\'s Word, and faith.',
        fr: 'Comprendre la bataille spirituelle à laquelle nous sommes confrontés et comment rester ferme dans la puissance de Dieu. Apprenez l\'armure de Dieu et comment résister efficacement aux attaques de l\'ennemi par la prière, la Parole de Dieu et la foi.',
        ar: 'فهم المعركة الروحية التي نواجهها وكيفية الثبات في قوة الله. تعلم عن درع الله وكيفية مقاومة هجمات العدو بفعالية من خلال الصلاة وكلمة الله والإيمان.',
      },
      speaker: 'Pastor David Lee',
      date: new Date('2025-02-26'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Conference',
      tags: ['spiritual warfare', 'victory', 'armor of God', 'faith'],
      series: 'Victory in Christ',
      duration: 52,
      views: 1890,
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'The Joy of Serving Others',
        fr: 'La Joie de Servir les Autres',
        ar: 'فرح خدمة الآخرين',
      },
      description: {
        en: 'Discover the blessing and joy that comes from serving others in Jesus\' name. Learn practical ways to serve your church, community, and the world, following Christ\'s example of servant leadership.',
        fr: 'Découvrez la bénédiction et la joie qui viennent du service aux autres au nom de Jésus. Apprenez des moyens pratiques de servir votre église, votre communauté et le monde, en suivant l\'exemple du Christ de leadership serviteur.',
        ar: 'اكتشف البركة والفرح التي تأتي من خدمة الآخرين باسم يسوع. تعلم طرقًا عملية لخدمة كنيستك ومجتمعك والعالم، متبعًا مثال المسيح في القيادة الخادمة.',
      },
      speaker: 'Pastor James Anderson',
      date: new Date('2025-03-05'),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'Sunday Service',
      tags: ['service', 'compassion', 'outreach', 'love in action'],
      series: 'Servant Leadership',
      duration: 40,
      views: 980,
      isPublished: true,
      createdBy: adminId,
    },
  ];

  await Sermon.deleteMany();
  // Use create instead of insertMany to trigger the pre-save hook for slug generation
  for (const sermon of sermons) {
    await Sermon.create(sermon);
  }
  console.log('✅ Sermons seeded');
};

const seedEvents = async (adminId) => {
  const events = [
    {
      title: {
        en: 'Sunday Worship Service',
        fr: 'Service de Culte du Dimanche',
        ar: 'خدمة العبادة يوم الأحد',
      },
      description: {
        en: 'Join us for our weekly Sunday worship service with inspiring worship, powerful preaching, and great fellowship. All are welcome! Enjoy passionate worship, relevant biblical teaching, and connect with our community. Children\'s ministry available.',
        fr: 'Rejoignez-nous pour notre service de culte hebdomadaire du dimanche avec une adoration inspirante, une prédication puissante et une grande communion. Tous sont les bienvenus! Profitez d\'une adoration passionnée, d\'un enseignement biblique pertinent et connectez-vous avec notre communauté. Ministère des enfants disponible.',
        ar: 'انضم إلينا في خدمة العبادة الأسبوعية يوم الأحد مع عبادة ملهمة ووعظ قوي وشراكة رائعة. الجميع مرحب بهم! استمتع بعبادة شغوفة وتعليم كتابي ذي صلة وتواصل مع مجتمعنا. خدمة الأطفال متاحة.',
      },
      startDate: new Date('2026-01-25T12:00:00'),
      endDate: new Date('2026-01-25T14:00:00'),
      location: {
        name: 'FCI Ministries Main Chapel',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Worship Service',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
      capacity: 200,
      rsvps: [],
      isRecurring: true,
      recurrencePattern: 'weekly',
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Youth Night - Game & Worship Night',
        fr: 'Soirée Jeunesse - Soirée Jeux et Adoration',
        ar: 'ليلة الشباب - ليلة الألعاب والعبادة',
      },
      description: {
        en: 'Join us for an exciting game night for youth ages 13-25! Fun games, great music, snacks, and powerful worship. We\'ll have team competitions, worship time, and a short devotional. Bring your friends and invite others! It\'s a great way to connect with other young believers.',
        fr: 'Rejoignez-nous pour une soirée de jeux passionnante pour les jeunes de 13 à 25 ans! Jeux amusants, bonne musique, collations et adoration puissante. Nous aurons des compétitions d\'équipe, un temps d\'adoration et un court dévotionnel. Amenez vos amis et invitez d\'autres! C\'est un excellent moyen de se connecter avec d\'autres jeunes croyants.',
        ar: 'انضم إلينا لقضاء ليلة ألعاب مثيرة للشباب من سن 13 إلى 25 عامًا! ألعاب ممتعة وموسيقى رائعة ووجبات خفيفة وعبادة قوية. سيكون لدينا مسابقات جماعية ووقت عبادة وتأمل قصير. أحضر أصدقائك وادع الآخرين! إنها طريقة رائعة للتواصل مع المؤمنين الشباب الآخرين.',
      },
      startDate: new Date('2026-01-23T19:00:00'),
      endDate: new Date('2026-01-23T21:30:00'),
      location: {
        name: 'Youth Center - FCI Ministries',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Youth Event',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      capacity: 50,
      rsvps: [],
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Community Outreach - Food Distribution',
        fr: 'Action Communautaire - Distribution de Nourriture',
        ar: 'التواصل المجتمعي - توزيع الطعام',
      },
      description: {
        en: 'Help us serve our community by participating in our monthly food distribution program. We will be distributing food packages to families in need throughout the city. Volunteers needed for packing, distribution, and prayer ministry. Come be the hands and feet of Jesus!',
        fr: 'Aidez-nous à servir notre communauté en participant à notre programme mensuel de distribution de nourriture. Nous distribuerons des colis alimentaires aux familles dans le besoin dans toute la ville. Bénévoles nécessaires pour l\'emballage, la distribution et le ministère de prière. Venez être les mains et les pieds de Jésus!',
        ar: 'ساعدنا في خدمة مجتمعنا من خلال المشاركة في برنامج توزيع الطعام الشهري. سنقوم بتوزيع طرود الطعام على الأسر المحتاجة في جميع أنحاء المدينة. نحتاج متطوعين للتعبئة والتوزيع وخدمة الصلاة. تعال وكن يدي ورجلي يسوع!',
      },
      startDate: new Date('2026-01-24T09:00:00'),
      endDate: new Date('2026-01-24T13:00:00'),
      location: {
        name: 'Community Center',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Outreach',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      capacity: 30,
      rsvps: [],
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Prayer & Fasting Conference 2025',
        fr: 'Conférence de Prière et Jeûne 2025',
        ar: 'مؤتمر الصلاة والصيام 2025',
      },
      description: {
        en: 'Join us for three powerful days of prayer, worship, and teaching. Experience breakthrough and encounter God in a fresh way. Special guest speakers, extended worship sessions, and corporate prayer times. This is a transformative event you don\'t want to miss!',
        fr: 'Rejoignez-nous pour trois jours puissants de prière, d\'adoration et d\'enseignement. Expérimentez une percée et rencontrez Dieu d\'une manière nouvelle. Conférenciers invités spéciaux, séances d\'adoration prolongées et temps de prière collective. C\'est un événement transformateur que vous ne voulez pas manquer!',
        ar: 'انضم إلينا لمدة ثلاثة أيام قوية من الصلاة والعبادة والتعليم. جرب الاختراق والقاء الله بطريقة جديدة. متحدثون ضيوف خاصون، وجلسات عبادة ممتدة، وأوقات صلاة جماعية. هذا حدث تحويلي لا تريد أن تفوته!',
      },
      startDate: new Date('2026-02-04T18:00:00'),
      endDate: new Date('2026-02-06T21:00:00'),
      location: {
        name: 'FCI Ministries Main Chapel',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800',
      capacity: 150,
      rsvps: [],
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Wednesday Bible Study - Book of Romans',
        fr: 'Étude Biblique du Mercredi - Livre des Romains',
        ar: 'دراسة الكتاب المقدس يوم الأربعاء - سفر الرومان',
      },
      description: {
        en: 'Deep dive into the book of Romans verse by verse. Learn about grace, righteousness, and living by faith. Weekly study every Wednesday with discussion groups and practical application. Open to all levels - from new believers to mature Christians.',
        fr: 'Plongée profonde dans le livre des Romains verset par verset. Apprenez la grâce, la justice et la vie par la foi. Étude hebdomadaire tous les mercredis avec des groupes de discussion et une application pratique. Ouvert à tous les niveaux - des nouveaux croyants aux chrétiens matures.',
        ar: 'الغوص العميق في سفر الرومان آية بآية. تعلم عن النعمة والبر والعيش بالإيمان. دراسة أسبوعية كل يوم أربعاء مع مجموعات نقاش وتطبيق عملي. مفتوح لجميع المستويات - من المؤمنين الجدد إلى المسيحيين الناضجين.',
      },
      startDate: new Date('2026-01-28T19:00:00'),
      endDate: new Date('2026-01-28T20:30:00'),
      location: {
        name: 'Fellowship Hall - FCI Ministries',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Bible Study',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
      capacity: 40,
      rsvps: [],
      isRecurring: true,
      recurrencePattern: 'weekly',
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Women\'s Empowerment Breakfast',
        fr: 'Petit-Déjeuner d\'Autonomisation des Femmes',
        ar: 'إفطار تمكين المرأة',
      },
      description: {
        en: 'Ladies, join us for a special morning of fellowship, encouragement, and inspiration. Guest speaker Sister Grace Thompson will share on "Finding Your Strength in God." Includes breakfast, worship, and breakout sessions. Register today!',
        fr: 'Mesdames, rejoignez-nous pour une matinée spéciale de communion, d\'encouragement et d\'inspiration. La conférencière invitée Sœur Grace Thompson partagera sur "Trouver votre force en Dieu." Comprend le petit-déjeuner, l\'adoration et des sessions en petits groupes. Inscrivez-vous aujourd\'hui!',
        ar: 'أيتها السيدات، انضموا إلينا في صباح خاص من الشراكة والتشجيع والإلهام. ستشارك المتحدثة الضيفة الأخت جريس طومسون حول "إيجاد قوتك في الله." يشمل الإفطار والعبادة والجلسات الفرعية. سجل اليوم!',
      },
      startDate: new Date('2026-02-14T10:00:00'),
      endDate: new Date('2026-02-14T13:00:00'),
      location: {
        name: 'Fellowship Hall - FCI Ministries',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Other',
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800',
      capacity: 60,
      rsvps: [],
      isPublished: true,
      createdBy: adminId,
    },
    {
      title: {
        en: 'Men\'s Breakfast & Fellowship',
        fr: 'Petit-Déjeuner et Communion des Hommes',
        ar: 'إفطار ورفقة الرجال',
      },
      description: {
        en: 'Men, start your Saturday with great food, worship, and biblical teaching. This month\'s topic: "Leading Your Family with Integrity." Connect with other men, build accountability relationships, and be equipped to be the man God called you to be.',
        fr: 'Hommes, commencez votre samedi avec de la bonne nourriture, de l\'adoration et un enseignement biblique. Sujet de ce mois: "Diriger votre famille avec intégrité." Connectez-vous avec d\'autres hommes, établissez des relations de responsabilité et soyez équipé pour être l\'homme que Dieu vous a appelé à être.',
        ar: 'أيها الرجال، ابدأ يوم السبت بطعام رائع وعبادة وتعليم كتابي. موضوع هذا الشهر: "قيادة عائلتك بنزاهة." تواصل مع رجال آخرين، وبناء علاقات المساءلة، وكن مجهزًا لتكون الرجل الذي دعاك الله لتكونه.',
      },
      startDate: new Date('2026-02-07T07:00:00'),
      endDate: new Date('2026-02-07T09:30:00'),
      location: {
        name: 'Fellowship Hall - FCI Ministries',
        address: 'Casablanca, Morocco',
        coordinates: { lat: 33.5731, lng: -7.5898 },
      },
      category: 'Other',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      capacity: 50,
      rsvps: [],
      isPublished: true,
      createdBy: adminId,
    },
  ];

  await Event.deleteMany();
  await Event.insertMany(events);
  console.log('✅ Events seeded');
};

const seedMinistries = async (adminId) => {
  const ministries = [
    {
      name: {
        en: 'Children\'s Ministry',
        fr: 'Ministère des Enfants',
        ar: 'خدمة الأطفال',
      },
      description: {
        en: 'Building strong foundations in children through Bible teaching, worship, and fun activities. We provide a safe and nurturing environment for children ages 0-12 to learn about God\'s love through age-appropriate lessons, crafts, games, and worship.',
        fr: 'Construire des fondations solides chez les enfants grâce à l\'enseignement biblique, l\'adoration et des activités amusantes. Nous offrons un environnement sûr et stimulant pour les enfants de 0 à 12 ans pour apprendre l\'amour de Dieu à travers des leçons, des bricolages, des jeux et l\'adoration adaptés à leur âge.',
        ar: 'بناء أسس قوية في الأطفال من خلال تعليم الكتاب المقدس والعبادة والأنشطة الممتعة. نحن نوفر بيئة آمنة ورعاية للأطفال من سن 0 إلى 12 عامًا لتعلم محبة الله من خلال الدروس والحرف والألعاب والعبادة المناسبة لأعمارهم.',
      },
      leader: 'Pastor Emily Chen',
      contactEmail: 'children@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Sundays 12:00 PM during service',
        fr: 'Dimanches 12h00 pendant le service',
        ar: 'الأحد 12:00 مساءً أثناء الخدمة',
      },
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
      isActive: true,
      order: 1,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Youth Ministry',
        fr: 'Ministère de la Jeunesse',
        ar: 'خدمة الشباب',
      },
      description: {
        en: 'Empowering young people ages 13-25 to live radically for Jesus. Weekly gatherings include worship, teaching, games, and authentic fellowship. We\'re building the next generation of leaders through discipleship, mentorship, and hands-on ministry opportunities.',
        fr: 'Donner aux jeunes de 13 à 25 ans les moyens de vivre radicalement pour Jésus. Les rassemblements hebdomadaires comprennent l\'adoration, l\'enseignement, des jeux et une communion authentique. Nous construisons la prochaine génération de leaders par le discipulat, le mentorat et les opportunités de ministère pratiques.',
        ar: 'تمكين الشباب من سن 13 إلى 25 عامًا من العيش بشكل جذري ليسوع. تشمل الاجتماعات الأسبوعية العبادة والتعليم والألعاب والشراكة الحقيقية. نحن نبني الجيل القادم من القادة من خلال التلمذة والإرشاد وفرص الخدمة العملية.',
      },
      leader: 'Pastor Mark Williams',
      contactEmail: 'youth@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Fridays 7:00 PM',
        fr: 'Vendredis 19h00',
        ar: 'الجمعة 7:00 مساءً',
      },
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
      isActive: true,
      order: 2,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Worship Ministry',
        fr: 'Ministère de l\'Adoration',
        ar: 'خدمة العبادة',
      },
      description: {
        en: 'Leading people into the presence of God through music and worship. We\'re always looking for singers, musicians, sound technicians, and media volunteers to join our team. No experience required - just a heart for worship!',
        fr: 'Conduire les gens dans la présence de Dieu à travers la musique et l\'adoration. Nous recherchons toujours des chanteurs, des musiciens, des techniciens du son et des bénévoles médias pour rejoindre notre équipe. Aucune expérience requise - juste un cœur pour l\'adoration!',
        ar: 'قيادة الناس إلى حضور الله من خلال الموسيقى والعبادة. نبحث دائمًا عن مغنين وموسيقيين وفنيي صوت ومتطوعين في الإعلام للانضمام إلى فريقنا. لا حاجة للخبرة - فقط قلب للعبادة!',
      },
      leader: 'David Martinez',
      contactEmail: 'worship@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Practice: Wednesdays 7:00 PM',
        fr: 'Répétition: Mercredis 19h00',
        ar: 'التدريب: الأربعاء 7:00 مساءً',
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      isActive: true,
      order: 3,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Prayer Ministry',
        fr: 'Ministère de Prière',
        ar: 'خدمة الصلاة',
      },
      description: {
        en: 'Interceding for our church, community, and nation. Join us for weekly prayer meetings and be part of our 24/7 prayer chain. Prayer changes everything! We believe in the power of united prayer and invite you to join us in seeking God\'s face.',
        fr: 'Intercéder pour notre église, notre communauté et notre nation. Rejoignez-nous pour des réunions de prière hebdomadaires et faites partie de notre chaîne de prière 24h/24 et 7j/7. La prière change tout! Nous croyons au pouvoir de la prière unie et vous invitons à nous rejoindre pour chercher la face de Dieu.',
        ar: 'الشفاعة من أجل كنيستنا ومجتمعنا وأمتنا. انضم إلينا لاجتماعات الصلاة الأسبوعية وكن جزءًا من سلسلة الصلاة على مدار الساعة طوال أيام الأسبوع. الصلاة تغير كل شيء! نحن نؤمن بقوة الصلاة المتحدة وندعوك للانضمام إلينا في طلب وجه الله.',
      },
      leader: 'Sister Grace Thompson',
      contactEmail: 'prayer@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Wednesdays 6:00 AM & 7:00 PM',
        fr: 'Mercredis 6h00 et 19h00',
        ar: 'الأربعاء 6:00 صباحًا و 7:00 مساءً',
      },
      image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=800',
      isActive: true,
      order: 4,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Community Outreach',
        fr: 'Action Communautaire',
        ar: 'التواصل المجتمعي',
      },
      description: {
        en: 'Serving our community with the love of Christ through food drives, homeless outreach, prison ministry, and community programs. Love in action makes a difference. Join us in bringing hope and practical help to those in need.',
        fr: 'Servir notre communauté avec l\'amour du Christ à travers des collectes de nourriture, des actions pour les sans-abri, le ministère en prison et des programmes communautaires. L\'amour en action fait la différence. Rejoignez-nous pour apporter espoir et aide pratique à ceux qui en ont besoin.',
        ar: 'خدمة مجتمعنا بمحبة المسيح من خلال حملات الطعام والتواصل مع المشردين وخدمة السجون والبرامج المجتمعية. الحب العملي يحدث فرقًا. انضم إلينا في جلب الأمل والمساعدة العملية لمن هم في حاجة.',
      },
      leader: 'Pastor James Anderson',
      contactEmail: 'outreach@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Monthly: 3rd Saturday 9:00 AM',
        fr: 'Mensuel: 3ème Samedi 9h00',
        ar: 'شهريًا: السبت الثالث 9:00 صباحًا',
      },
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
      isActive: true,
      order: 5,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Women\'s Ministry',
        fr: 'Ministère des Femmes',
        ar: 'خدمة النساء',
      },
      description: {
        en: 'Empowering women to grow in faith and fellowship. Monthly gatherings, Bible studies, conferences, and special events designed to encourage and equip women of all ages to live out their God-given purpose with confidence.',
        fr: 'Donner aux femmes les moyens de grandir dans la foi et la communion. Rassemblements mensuels, études bibliques, conférences et événements spéciaux conçus pour encourager et équiper les femmes de tous âges à vivre leur but donné par Dieu avec confiance.',
        ar: 'تمكين النساء من النمو في الإيمان والشراكة. اجتماعات شهرية ودراسات كتابية ومؤتمرات وأحداث خاصة مصممة لتشجيع وتجهيز النساء من جميع الأعمار للعيش في هدفهن الممنوح من الله بثقة.',
      },
      leader: 'Sister Rachel Brown',
      contactEmail: 'women@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Monthly: 2nd Saturday 10:00 AM',
        fr: 'Mensuel: 2ème Samedi 10h00',
        ar: 'شهريًا: السبت الثاني 10:00 صباحًا',
      },
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800',
      isActive: true,
      order: 6,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Men\'s Ministry',
        fr: 'Ministère des Hommes',
        ar: 'خدمة الرجال',
      },
      description: {
        en: 'Equipping men to be godly leaders in their homes, workplaces, and communities. Bible studies, accountability groups, and fellowship activities for men of all ages. Be the man God created you to be.',
        fr: 'Équiper les hommes pour être des leaders pieux dans leurs foyers, leurs lieux de travail et leurs communautés. Études bibliques, groupes de responsabilité et activités de communion pour les hommes de tous âges. Soyez l\'homme que Dieu vous a créé pour être.',
        ar: 'تجهيز الرجال ليكونوا قادة أتقياء في منازلهم وأماكن عملهم ومجتمعاتهم. دراسات كتابية ومجموعات المساءلة وأنشطة الشراكة للرجال من جميع الأعمار. كن الرجل الذي خلقك الله لتكونه.',
      },
      leader: 'Pastor Michael Brown',
      contactEmail: 'men@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Monthly: 1st Saturday 7:00 AM',
        fr: 'Mensuel: 1er Samedi 7h00',
        ar: 'شهريًا: السبت الأول 7:00 صباحًا',
      },
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      isActive: true,
      order: 7,
      createdBy: adminId,
    },
    {
      name: {
        en: 'Marriage Ministry',
        fr: 'Ministère du Mariage',
        ar: 'خدمة الزواج',
      },
      description: {
        en: 'Strengthening marriages through biblical principles, couples\' retreats, date nights, and counseling. Building strong families starts with strong marriages. Whether newlywed or celebrating decades together, we\'re here to support your journey.',
        fr: 'Renforcer les mariages à travers les principes bibliques, les retraites de couples, les soirées en amoureux et le conseil. Construire des familles solides commence par des mariages solides. Que vous soyez jeunes mariés ou que vous célébriez des décennies ensemble, nous sommes là pour soutenir votre voyage.',
        ar: 'تقوية الزيجات من خلال المبادئ الكتابية، ومعتكفات الأزواج، وأمسيات المواعدة، والإرشاد. بناء عائلات قوية يبدأ بزيجات قوية. سواء كنت حديث الزواج أو تحتفل بعقود معًا، نحن هنا لدعم رحلتك.',
      },
      leader: 'Pastor John & Sarah Smith',
      contactEmail: 'marriage@fciministries.ma',
      contactPhone: '+212 5XX-XXXXXX',
      meetingTime: {
        en: 'Quarterly: Marriage Enrichment Retreats',
        fr: 'Trimestriel: Retraites d\'Enrichissement du Mariage',
        ar: 'ربع سنوي: معتكفات إثراء الزواج',
      },
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
      isActive: true,
      order: 8,
      createdBy: adminId,
    },
  ];

  await Ministry.deleteMany();
  await Ministry.insertMany(ministries);
  console.log('✅ Ministries seeded');
};

const seedNewsletters = async () => {
  const newsletters = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      language: 'en',
      isSubscribed: true
    },
    {
      email: 'marie.dubois@example.com',
      name: 'Marie Dubois',
      language: 'fr',
      isSubscribed: true
    },
    {
      email: 'ahmed.hassan@example.com',
      name: 'Ahmed Hassan',
      language: 'ar',
      isSubscribed: true
    },
    {
      email: 'sarah.johnson@example.com',
      name: 'Sarah Johnson',
      language: 'en',
      isSubscribed: true
    },
  ];

  await Newsletter.deleteMany();
  await Newsletter.insertMany(newsletters);
  console.log('✅ Newsletter subscribers seeded');
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seed...\n');

    const adminId = await seedUsers();
    await seedSermons(adminId);
    await seedEvents(adminId);
    await seedMinistries(adminId);
    await seedNewsletters();

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('   Admin: admin@fciministries.ma / admin123');
    console.log('   Editor: editor@fciministries.ma / editor123');
    console.log('\n📊 Data Summary:');
    console.log('   - 8 Sermons with multilingual content (EN/FR/AR)');
    console.log('   - 7 Events including recurring services');
    console.log('   - 8 Ministries fully described');
    console.log('   - 4 Newsletter subscribers\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
