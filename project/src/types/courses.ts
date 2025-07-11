export interface CreateCourseData {
  code: string;
  name: string;
  description: string;
  semester: string;
  year: number;
  credits: number;
}

export interface CourseVersion {
  id: string;
  course_id: string;
  author_id: string;
  code: string;
  name: string;
  description: string;
  semester: string;
  year: number;
  credits: number;
  version: number;
  vote_count: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
}