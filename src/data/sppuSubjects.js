export const sppuSemesterOrder = [
  'semester1',
  'semester2',
  'semester3',
  'semester4',
  'semester5',
  'semester6',
  'semester7',
  'semester8',
];

export const sppuSemesterMeta = {
  semester1: {
    title: 'Semester 1',
    slug: 'semester-1',
  },
  semester2: {
    title: 'Semester 2',
    slug: 'semester-2',
  },
  semester3: {
    title: 'Semester 3',
    slug: 'semester-3',
  },
  semester4: {
    title: 'Semester 4',
    slug: 'semester-4',
  },
  semester5: {
    title: 'Semester 5',
    slug: 'semester-5',
  },
  semester6: {
    title: 'Semester 6',
    slug: 'semester-6',
  },
  semester7: {
    title: 'Semester 7',
    slug: 'semester-7',
  },
  semester8: {
    title: 'Semester 8',
    slug: 'semester-8',
  },
};

export const sppuSubjectBranchOrder = [
  'firstYearEngineering',
  'informationTechnology',
  'computerEngineering',
  'aids',
  'entc',
  'mechanicalEngineering',
  'civilEngineering',
];

export const sppuBranchMeta = {
  firstYearEngineering: {
    name: 'First Year Engineering',
    slug: 'first-year-engineering',
    description: 'Common foundation subjects for FE students before moving into branch-specific coursework.',
    catalogues: 8,
    resources: 92,
    activeNote: 'Foundation year',
  },
  informationTechnology: {
    name: 'Information Technology',
    slug: 'information-technology',
    description: 'Programming notes, DBMS material, web technology labs, PYQs, and practical resources for IT students.',
    catalogues: 12,
    resources: 186,
    activeNote: 'High PYQ demand',
  },
  computerEngineering: {
    name: 'Computer Engineering',
    slug: 'computer-engineering',
    description: 'Core computer engineering notes, operating systems, networks, algorithms, and exam-focused collections.',
    catalogues: 15,
    resources: 242,
    activeNote: 'Most catalogued',
  },
  aids: {
    name: 'AIDS',
    slug: 'aids',
    description: 'Artificial Intelligence and Data Science resources covering models, analytics, labs, and recent question papers.',
    catalogues: 9,
    resources: 118,
    activeNote: 'Fast growing',
  },
  entc: {
    name: 'ENTC',
    slug: 'entc',
    description: 'Electronics, communication, signals, embedded systems, and circuit-focused study material.',
    catalogues: 8,
    resources: 104,
    activeNote: 'Lab heavy',
  },
  mechanicalEngineering: {
    name: 'Mechanical Engineering',
    slug: 'mechanical-engineering',
    description: 'Mechanical systems, design, thermal engineering, manufacturing, and production resources in one place.',
    catalogues: 10,
    resources: 132,
    activeNote: 'Broad coverage',
  },
  civilEngineering: {
    name: 'Civil Engineering',
    slug: 'civil-engineering',
    description: 'Structural analysis, surveying, environmental engineering, construction, and design study resources.',
    catalogues: 7,
    resources: 96,
    activeNote: 'Steady uploads',
  },
};

export const sppuSubjects = {
  firstYearEngineering: {
    semester1: [
      'Engineering Mathematics-I',
      'Engineering Physics',
      'Engineering Chemistry',
      'Systems in Mechanical Engineering',
      'Basic Electrical Engineering',
      'Basic Electronics Engineering',
      'Programming and Problem Solving',
      'Engineering Mechanics',
      'Workshop',
      'Environmental Studies-I',
    ],
    semester2: [
      'Engineering Mathematics-II',
      'Engineering Physics',
      'Engineering Chemistry',
      'Basic Electrical Engineering',
      'Basic Electronics Engineering',
      'Programming and Problem Solving',
      'Engineering Mechanics',
      'Engineering Graphics',
      'Project Based Learning',
      'Environmental Studies-II',
      'Physical Education-Exercise and Field Activities',
    ],
  },
  informationTechnology: {
    semester3: [
      'Data Structures & Algorithms',
      'Object Oriented Programming',
      'Basics of Computer Network',
      'Digital Electronics and Logic Design',
      'Discrete Mathematics',
      'Logic Design and Computer Organization',
    ],
    semester4: [
      'Database Management System',
      'Computer Graphics',
      'Probability & Statistics',
      'Processor Architecture',
      'Engineering Mathematics-III',
      'Software Engineering',
    ],
    semester5: [
      'Theory of Computation',
      'Operating Systems',
      'Machine Learning',
      'Human Computer Interaction',
      'Design and Analysis of Algorithm',
      'Advanced Database and Management System',
      'Design Thinking',
      'Internet of Things',
    ],
    semester6: [
      'Computer Networks and Security',
      'Data Science and Big Data Analytics',
      'Web Application Development',
      'Artificial Intelligence',
      'Cyber Security',
      'Cloud Computing',
      'Software Modeling and Design',
    ],
    semester7: [
      'Information Storage and Retrieval',
      'Software Project Management',
      'Deep Learning',
      'Mobile Computing',
      'High Performance Computing',
      'Multimedia Technology',
      'Smart Computing',
      'Bioinformatics',
      'Introduction to DevOps',
      'Computer Vision',
      'Wireless Communications',
    ],
    semester8: [
      'Distributed Systems',
      'Startup and Entrepreneurship',
      'Software Defined Networks',
      'Social Computing',
      'Natural Language Processing',
      'Soft Computing',
      'Game Engineering',
      'Ethical Hacking and Security',
      'Augmented and Virtual Reality',
      'Business Analytics and Intelligence',
      'Blockchain Technology',
    ],
  },
  computerEngineering: {
    semester3: [
      'Data Structures',
      'Object Oriented Programming and Computer Graphics',
      'Operating Systems',
      'Discrete Mathematics',
      'Digital Electronics and Logic Design',
      'Fundamentals of Data Structures',
      'Computer Graphics',
    ],
    semester4: [
      'Database Management Systems',
      'Computer Organization and Microprocessor',
      'Probability and Statistics',
      'Advanced Data Structures',
      'Engineering Mathematics-III',
      'Software Engineering',
      'Principles of Programming Languages',
    ],
    semester5: [
      'Database Management Systems',
      'Theory of Computation',
      'Systems Programming and Operating System',
      'Computer Networks and Security',
      'Internet of Things and Embedded Systems',
      'Human Computer Interface',
      'Distributed Systems',
      'Software Project Management',
    ],
    semester6: [
      'Data Science and Big Data Analytics',
      'Web Technology',
      'Artificial Intelligence',
      'Information Security',
      'Augmented and Virtual Reality',
      'Cloud Computing',
      'Software Modeling and Architectures',
      'Internship',
    ],
    semester7: [
      'Design and Analysis of Algorithms',
      'Machine Learning',
      'Blockchain Technology',
      'Pervasive Computing',
      'Multimedia Techniques',
      'Cyber Security and Digital Forensics',
      'Object Oriented Modeling and Design',
      'Digital Signal Processing',
      'Information Retrieval',
      'GPU Programming and Architecture',
      'Mobile Computing',
      'Software Testing and Quality Assurance',
      'Compilers',
    ],
    semester8: [
      'High Performance Computing',
      'Deep Learning',
      'Natural Language Processing',
      'Image Processing',
      'Software Defined Networks',
      'Advanced Digital Signal Processing',
      'Pattern Recognition',
      'Soft Computing',
      'Business Intelligence',
      'Quantum Computing',
    ],
  },
  aids: {},
  entc: {},
  mechanicalEngineering: {},
  civilEngineering: {},
};

const branchSlugToKey = Object.fromEntries(
  Object.entries(sppuBranchMeta).map(([branchKey, branch]) => [branch.slug, branchKey]),
);

const semesterSlugToKey = Object.fromEntries(
  Object.entries(sppuSemesterMeta).map(([semesterKey, semester]) => [semester.slug, semesterKey]),
);

export function getSppuSubjectBranchKey(branchSlug) {
  return branchSlugToKey[branchSlug];
}

export function getSppuSubjectBranchBySlug(branchSlug) {
  const branchKey = getSppuSubjectBranchKey(branchSlug);

  if (!branchKey) {
    return null;
  }

  return {
    key: branchKey,
    ...sppuBranchMeta[branchKey],
  };
}

export function getSppuSemesterBySlug(semesterSlug) {
  const semesterKey = semesterSlugToKey[semesterSlug];

  if (!semesterKey) {
    return null;
  }

  return {
    key: semesterKey,
    ...sppuSemesterMeta[semesterKey],
  };
}

export function getSppuSemestersForBranchSlug(branchSlug) {
  const branchKey = getSppuSubjectBranchKey(branchSlug);
  const semesterMap = branchKey ? sppuSubjects[branchKey] || {} : {};

  return sppuSemesterOrder
    .filter((semesterKey) => Object.prototype.hasOwnProperty.call(semesterMap, semesterKey))
    .map((semesterKey) => {
      const subjects = semesterMap[semesterKey] || [];

      return {
        key: semesterKey,
        ...sppuSemesterMeta[semesterKey],
        subjects: subjects.length,
        catalogues: Math.max(0, subjects.length * 2),
      };
    });
}

export function getSppuSubjectsForRoute(branchSlug, semesterSlug) {
  const branchKey = getSppuSubjectBranchKey(branchSlug);
  const semesterKey = semesterSlugToKey[semesterSlug];

  if (!branchKey || !semesterKey) {
    return [];
  }

  return sppuSubjects[branchKey]?.[semesterKey] || [];
}

export function getAllSppuSubjects() {
  return Array.from(
    new Set(
      Object.values(sppuSubjects).flatMap((semesterMap) => Object.values(semesterMap).flat()),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

export function slugifyAcademicName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
