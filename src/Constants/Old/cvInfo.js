import react from '../Images/Pages/CVs/react.svg';
import figma from '../Images/Pages/CVs/figma.svg';
import js from '../Images/Pages/CVs/js.svg';
import npm from '../Images/Pages/CVs/npm.svg';
import python from '../Images/Pages/CVs/python.svg';
import sourcetree from '../Images/Pages/CVs/sourcetree.svg';
import vs from '../Images/Pages/CVs/vs.svg';
import css3 from '../Images/Pages/CVs/css3.svg';
import html from '../Images/Pages/CVs/html.svg';
import graphql from '../Images/Pages/CVs/graphql.svg';

import cardiac from '../Images/Pages/CVs/cardiac.svg';
import nano from '../Images/Pages/CVs/nano.png';
import mdm from '../Images/Pages/CVs/mdm.svg';
import biocare from '../Images/Pages/CVs/biocare.svg';

export const SOCICAL_DATA = [
  {
    title: 'Facebook',
    value: 'https://www.facebook.com/profile.php?id=100015087697713',
  },
  {
    title: 'LinkedIn',
    value: 'https://www.linkedin.com/in/tri%E1%BA%BFt-tr%C6%B0%C6%A1ng-thanh-89a92b161/',
  },
];
export const INDUSTRY_KNOWLEDGE_DATA = [
  'Web-App Develop',
  'Technical Research',
  'Team work',
  'Project progressing',
];
export const LANGUAGE_DATA = [
  'Vietnamese',
  'English',
];

export const EXPERIENCE_DATA = [
  {
    name: 'Impact Technical Resources VN',
    position: 'Software - Front-end developer',
    duration: 'Jan 2020 - Present - 1 year, Hochiminh city',
    content: ['I develop Web-App products by using React/React Native. Experienced with a lean product development process: research, design, coding, test, and iterate.'],
  },
  {
    name: 'Other',
    position: '',
    duration: '',
    content: [
      'Private tutor at Math and English for secondary student.',
      'Private tour guide for foreigner in Hochiminh city.',
    ],
  },
];

export const EDUCATION_DATA = [
  {
    name: 'Bachelor of Computer Science in Information Technology',
    position: 'University Of Science - Hochiminh',
    duration: '2015-2019, Hochiminh city',
  },
];

export const SKILLS_DATA = [
  {
    icon: react,
    title: 'React',
  },
  {
    icon: js,
    title: 'JavaScript',
  },
  {
    icon: npm,
    title: 'Npm',
  },
  {
    icon: css3,
    title: 'CSS3',
  },
  {
    icon: html,
    title: 'HTML5',
  },
];

export const OTHER_SKILLS_DATA = [
  {
    icon: sourcetree,
    title: 'Sourcetree',
  },
  {
    icon: vs,
    title: 'VisualStudioCode',
  },
  {
    icon: figma,
    title: 'Figma',
  },
  {
    icon: python,
    title: 'Python',
  },
  {
    icon: graphql,
    title: 'Graphql',
  },
];

export const TEAM_PRODUCTS = [
  {
    name: 'Biocare Cardiac',
    icon: cardiac,
    link: 'https://staging.cardiac.biotricity.com/',
  },
  {
    name: 'Nano Dashboard',
    icon: nano,
    link: 'http://admindashboard.fiot.vn',
  },
  {
    name: 'MD Matrix - Telemed',
    icon: mdm,
    link: 'https://telemed.alpha.bioflux.io',
  },
  {
    name: 'Biocare Pain Management',
    icon: biocare,
    link: 'https://play.google.com/store/apps/details?id=biotricity.bioflux.biocare.android.app',
  },

];
