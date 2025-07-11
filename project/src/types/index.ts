
export interface Professor {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  image: string;
  personalRating: number; // 1-5 hearts
  teachingRating: number; // 1-5 stars
  totalReviews: number;
  authorName: string;
  courses: Course[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  semester: string;
  year: number;
  credits: number;
  reviews: Review[];
  avgPersonalRating: number;
  avgTeachingRating: number;
  authorName?: string;
}

export interface Review {
  id: string;
  studentName: string;
  semester: string;
  year: number;
  personalRating: number; // 1-5 hearts
  teachingRating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface Analytics {
  totalProfessors: number;
  totalCourses: number;
  totalReviews: number;
  avgPersonalRating: number;
  avgTeachingRating: number;
  departmentStats: DepartmentStats[];
  topRatedProfessors: Professor[];
  mostReviewedCourses: Course[];
}

export interface DepartmentStats {
  department: string;
  professorCount: number;
  avgPersonalRating: number;
  avgTeachingRating: number;
  totalReviews: number;
}
