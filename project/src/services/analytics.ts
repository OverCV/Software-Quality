import { supabase } from '@/integrations/supabase/client';
import { Analytics, DepartmentStats, Professor } from '@/types';

const supabaseTyped = supabase as any;

export const getAnalytics = async (): Promise<Analytics> => {
  try {
    // Get all professors with their data
    const { data: professorsData, error: professorsError } = await supabaseTyped
      .from('professors')
      .select(`
        id,
        professor_versions (
          name,
          department,
          image_url,
          vote_count,
          author_id
        ),
        courses (
          id,
          course_versions (
            id,
            vote_count
          ),
          reviews (
            personal_rating,
            teaching_rating
          )
        )
      `);

    if (professorsError) {
      console.error('Error fetching analytics data:', professorsError);
      return getEmptyAnalytics();
    }

    if (!professorsData) return getEmptyAnalytics();

    // Get user profiles for author names
    const userIds = new Set<string>();
    professorsData.forEach(professor => {
      professor.professor_versions?.forEach(version => {
        if (version.author_id) userIds.add(version.author_id);
      });
    });

    const { data: profiles } = await supabaseTyped
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', Array.from(userIds));

    const profileMap = new Map(
      profiles?.map(profile => [profile.user_id, profile.display_name]) || []
    );

    // Process data
    const processedProfessors: Professor[] = [];
    const departmentMap = new Map<string, DepartmentStats>();
    let totalReviews = 0;
    let totalPersonalRating = 0;
    let totalTeachingRating = 0;
    let totalCourses = 0;

    professorsData.forEach(professor => {
      const mostVotedVersion = professor.professor_versions
        ?.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0];

      if (!mostVotedVersion) return;

      // Calculate ratings from all reviews for this professor
      const allReviews = professor.courses?.flatMap(course => course.reviews || []) || [];
      const professorPersonalRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.personal_rating, 0) / allReviews.length 
        : 0;
      const professorTeachingRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.teaching_rating, 0) / allReviews.length 
        : 0;

      totalReviews += allReviews.length;
      totalPersonalRating += professorPersonalRating * allReviews.length;
      totalTeachingRating += professorTeachingRating * allReviews.length;
      totalCourses += professor.courses?.length || 0;

      // Update department stats
      const dept = mostVotedVersion.department;
      if (!departmentMap.has(dept)) {
        departmentMap.set(dept, {
          department: dept,
          professorCount: 0,
          avgPersonalRating: 0,
          avgTeachingRating: 0,
          totalReviews: 0
        });
      }

      const deptStats = departmentMap.get(dept)!;
      deptStats.professorCount++;
      deptStats.totalReviews += allReviews.length;
      deptStats.avgPersonalRating += professorPersonalRating;
      deptStats.avgTeachingRating += professorTeachingRating;

      processedProfessors.push({
        id: professor.id,
        name: mostVotedVersion.name,
        department: mostVotedVersion.department,
        email: '', // Not needed for analytics
        phone: '',
        office: '',
        bio: '',
        image: mostVotedVersion.image_url || '',
        personalRating: professorPersonalRating,
        teachingRating: professorTeachingRating,
        totalReviews: allReviews.length,
        authorName: (profileMap.get(mostVotedVersion.author_id) as string) || 'Usuario desconocido',
        courses: []
      });
    });

    // Calculate department averages
    const departmentStats = Array.from(departmentMap.values()).map(dept => ({
      ...dept,
      avgPersonalRating: dept.professorCount > 0 ? dept.avgPersonalRating / dept.professorCount : 0,
      avgTeachingRating: dept.professorCount > 0 ? dept.avgTeachingRating / dept.professorCount : 0
    }));

    // Get top rated professors
    const topRatedProfessors = processedProfessors
      .sort((a, b) => (b.personalRating + b.teachingRating) / 2 - (a.personalRating + a.teachingRating) / 2)
      .slice(0, 3);

    return {
      totalProfessors: processedProfessors.length,
      totalCourses,
      totalReviews,
      avgPersonalRating: totalReviews > 0 ? totalPersonalRating / totalReviews : 0,
      avgTeachingRating: totalReviews > 0 ? totalTeachingRating / totalReviews : 0,
      departmentStats,
      topRatedProfessors,
      mostReviewedCourses: [] // Can be implemented later if needed
    };

  } catch (error) {
    console.error('Error in getAnalytics:', error);
    return getEmptyAnalytics();
  }
};

const getEmptyAnalytics = (): Analytics => ({
  totalProfessors: 0,
  totalCourses: 0,
  totalReviews: 0,
  avgPersonalRating: 0,
  avgTeachingRating: 0,
  departmentStats: [],
  topRatedProfessors: [],
  mostReviewedCourses: []
});