import { supabase } from '@/integrations/supabase/client';
import { Analytics, DepartmentStats, Professor } from '@/types';

const supabaseTyped = supabase as any;

export const getAnalytics = async (): Promise<Analytics> => {
  try {
    // Fetch all professor IDs
    const { data: professors, error: profError } = await supabaseTyped
      .from('professors')
      .select('id');

    if (profError) throw profError;

    const professorIds = professors?.map(p => p.id) || [];

    if (professorIds.length === 0) return getEmptyAnalytics();

    // Fetch all professor versions
    const { data: profVersions, error: profVerError } = await supabaseTyped
      .from('professor_versions')
      .select('id, professor_id, name, department, image_url, vote_count, author_id')
      .in('professor_id', professorIds);

    if (profVerError) throw profVerError;

    // Group versions by professor_id and find most voted
    const mostVotedByProf = new Map<string, any>();
    const versionsByProf = new Map<string, any[]>();
    profVersions?.forEach(v => {
      if (!versionsByProf.has(v.professor_id)) versionsByProf.set(v.professor_id, []);
      versionsByProf.get(v.professor_id)!.push(v);
    });
    professorIds.forEach(profId => {
      const vers = versionsByProf.get(profId) || [];
      const mostVoted = vers.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0];
      if (mostVoted) mostVotedByProf.set(profId, mostVoted);
    });

    // Fetch all courses for these professors
    const { data: coursesData, error: coursesError } = await supabaseTyped
      .from('courses')
      .select('id, professor_id')
      .in('professor_id', professorIds);

    if (coursesError) throw coursesError;

    const courseIds = coursesData?.map(c => c.id) || [];

    // Group courses by professor_id
    const coursesByProf = new Map<string, any[]>();
    coursesData?.forEach(c => {
      if (!coursesByProf.has(c.professor_id)) coursesByProf.set(c.professor_id, []);
      coursesByProf.get(c.professor_id)!.push(c);
    });

    // Fetch all course versions (only need vote_count for most voted, but we'll get all for consistency)
    const { data: courseVersions, error: cvError } = await supabaseTyped
      .from('course_versions')
      .select('id, course_id, vote_count')
      .in('course_id', courseIds);

    if (cvError) throw cvError;

    // Fetch all reviews
    const { data: reviewsData, error: revError } = await supabaseTyped
      .from('reviews')
      .select('id, course_id, personal_rating, teaching_rating')
      .in('course_id', courseIds);

    if (revError) throw revError;

    // Group reviews by course_id
    const revByCourse = new Map<string, any[]>();
    reviewsData?.forEach(r => {
      if (!revByCourse.has(r.course_id)) revByCourse.set(r.course_id, []);
      revByCourse.get(r.course_id)!.push(r);
    });

    // Collect author IDs for profiles
    const userIds = new Set<string>();
    profVersions?.forEach(v => { if (v.author_id) userIds.add(v.author_id); });

    const { data: profiles } = await supabaseTyped
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', Array.from(userIds));

    const profileMap = new Map(profiles?.map(profile => [profile.user_id, profile.display_name]) || []);

    // Process data
    const processedProfessors: Professor[] = [];
    const departmentMap = new Map<string, DepartmentStats>();
    let totalReviews = 0;
    let totalPersonalRating = 0;
    let totalTeachingRating = 0;
    let totalCourses = 0;

    professorIds.forEach(profId => {
      const mostVotedVersion = mostVotedByProf.get(profId);
      if (!mostVotedVersion) return;

      // Get courses for this professor
      const profCourses = coursesByProf.get(profId) || [];

      // Get all reviews for these courses
      const allReviews = profCourses.flatMap(course => revByCourse.get(course.id) || []);

      const professorPersonalRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.personal_rating, 0) / allReviews.length 
        : 0;
      const professorTeachingRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.teaching_rating, 0) / allReviews.length 
        : 0;

      totalReviews += allReviews.length;
      totalPersonalRating += professorPersonalRating * allReviews.length;
      totalTeachingRating += professorTeachingRating * allReviews.length;
      totalCourses += profCourses.length;

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
        id: profId,
        name: mostVotedVersion.name,
        department: mostVotedVersion.department,
        email: '',
        phone: '',
        office: '',
        bio: '',
        image: mostVotedVersion.image_url || '',
        personalRating: professorPersonalRating,
        teachingRating: professorTeachingRating,
        totalReviews: allReviews.length,
        authorName: profileMap.get(mostVotedVersion.author_id) || 'Usuario desconocido',
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