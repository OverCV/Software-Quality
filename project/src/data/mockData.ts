
import { Professor, Analytics } from '../types';

export const mockProfessors: Professor[] = [
  {
    id: '1',
    name: 'Dr. María González',
    department: 'Ciencias de la Computación',
    email: 'maria.gonzalez@universidad.edu',
    phone: '+34 91 234 5678',
    office: 'Edificio A, 301',
    bio: 'Doctora en Ciencias de la Computación con especialización en Inteligencia Artificial. Más de 15 años de experiencia en investigación y docencia.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    personalRating: 4.8,
    teachingRating: 4.6,
    totalReviews: 89,
    authorName: 'Sistema',
    courses: [
      {
        id: '1',
        code: 'CS101',
        name: 'Introducción a la Programación',
        description: 'Curso fundamental que introduce los conceptos básicos de programación utilizando Python.',
        semester: 'Otoño',
        year: 2024,
        credits: 4,
        avgPersonalRating: 4.7,
        avgTeachingRating: 4.5,
        reviews: [
          {
            id: '1',
            studentName: 'Ana Martín',
            semester: 'Otoño',
            year: 2024,
            personalRating: 5,
            teachingRating: 5,
            comment: 'Excelente profesora, muy paciente y clara en sus explicaciones.',
            date: '2024-01-15'
          },
          {
            id: '2',
            studentName: 'Carlos Ruiz',
            semester: 'Otoño',
            year: 2024,
            personalRating: 4,
            teachingRating: 4,
            comment: 'Buen curso, aunque a veces va un poco rápido.',
            date: '2024-01-20'
          }
        ]
      },
      {
        id: '2',
        code: 'CS301',
        name: 'Inteligencia Artificial',
        description: 'Curso avanzado sobre algoritmos de IA, machine learning y redes neuronales.',
        semester: 'Primavera',
        year: 2024,
        credits: 3,
        avgPersonalRating: 4.9,
        avgTeachingRating: 4.7,
        reviews: []
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Jorge Fernández',
    department: 'Matemáticas',
    email: 'jorge.fernandez@universidad.edu',
    phone: '+34 91 234 5679',
    office: 'Edificio B, 205',
    bio: 'Profesor titular de Matemáticas con especialización en Análisis Matemático y Álgebra Lineal.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    personalRating: 4.2,
    teachingRating: 4.0,
    totalReviews: 67,
    authorName: 'Sistema',
    courses: [
      {
        id: '3',
        code: 'MATH201',
        name: 'Cálculo Diferencial',
        description: 'Fundamentos del cálculo diferencial y sus aplicaciones.',
        semester: 'Otoño',
        year: 2024,
        credits: 4,
        avgPersonalRating: 4.1,
        avgTeachingRating: 3.9,
        reviews: []
      }
    ]
  },
  {
    id: '3',
    name: 'Dra. Carmen López',
    department: 'Física',
    email: 'carmen.lopez@universidad.edu',
    phone: '+34 91 234 5680',
    office: 'Edificio C, 102',
    bio: 'Doctora en Física Teórica con investigación en mecánica cuántica y relatividad.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    personalRating: 4.9,
    teachingRating: 4.8,
    totalReviews: 145,
    authorName: 'Sistema',
    courses: [
      {
        id: '4',
        code: 'PHY101',
        name: 'Física General I',
        description: 'Introducción a los principios fundamentales de la física clásica.',
        semester: 'Otoño',
        year: 2024,
        credits: 4,
        avgPersonalRating: 4.8,
        avgTeachingRating: 4.7,
        reviews: []
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Antonio Jiménez',
    department: 'Química',
    email: 'antonio.jimenez@universidad.edu',
    phone: '+34 91 234 5681',
    office: 'Edificio D, 301',
    bio: 'Especialista en Química Orgánica con más de 20 años de experiencia en investigación.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    personalRating: 4.5,
    teachingRating: 4.3,
    totalReviews: 78,
    authorName: 'Sistema',
    courses: [
      {
        id: '5',
        code: 'CHEM201',
        name: 'Química Orgánica',
        description: 'Estudio de compuestos orgánicos y sus reacciones.',
        semester: 'Primavera',
        year: 2024,
        credits: 3,
        avgPersonalRating: 4.4,
        avgTeachingRating: 4.2,
        reviews: []
      }
    ]
  }
];

// Export professors as alias for compatibility
export const professors = mockProfessors;

export const mockAnalytics: Analytics = {
  totalProfessors: 4,
  totalCourses: 5,
  totalReviews: 379,
  avgPersonalRating: 4.6,
  avgTeachingRating: 4.4,
  departmentStats: [
    {
      department: 'Ciencias de la Computación',
      professorCount: 1,
      avgPersonalRating: 4.8,
      avgTeachingRating: 4.6,
      totalReviews: 89
    },
    {
      department: 'Matemáticas',
      professorCount: 1,
      avgPersonalRating: 4.2,
      avgTeachingRating: 4.0,
      totalReviews: 67
    },
    {
      department: 'Física',
      professorCount: 1,
      avgPersonalRating: 4.9,
      avgTeachingRating: 4.8,
      totalReviews: 145
    },
    {
      department: 'Química',
      professorCount: 1,
      avgPersonalRating: 4.5,
      avgTeachingRating: 4.3,
      totalReviews: 78
    }
  ],
  topRatedProfessors: mockProfessors.sort((a, b) => b.personalRating - a.personalRating).slice(0, 3),
  mostReviewedCourses: []
};
