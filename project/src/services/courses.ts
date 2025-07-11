// Re-export all course-related functionality from specialized modules
export { createNewCourse, createNewCourseVersion } from './courseCreation';
export { getCourseVersions } from './courseVersions';
export { getUserVotesForCourse, voteForCourseVersion } from './courseVoting';
export { addReview } from './courseReviews';
export { checkUserVersion, updateUserCourseVersion } from './courseManagement';

// Re-export types
export type { CreateCourseData, CourseVersion } from '@/types/courses';