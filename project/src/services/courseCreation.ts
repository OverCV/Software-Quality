import { supabase } from '@/integrations/supabase/client';
import { CreateCourseData } from '@/types/courses';

const supabaseTyped = supabase as any;

export const createNewCourse = async (
  professorId: string,
  data: CreateCourseData
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // Create course
    const { data: course, error: courseError } = await supabaseTyped
      .from('courses')
      .insert({ professor_id: professorId })
      .select()
      .single();

    if (courseError) return { error: courseError.message };

    // Create first version with version number
    const { error: versionError } = await supabaseTyped
      .from('course_versions')
      .insert({
        course_id: course.id,
        author_id: user.id,
        version: 1,
        ...data
      });

    if (versionError) return { error: versionError.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al crear curso' };
  }
};

export const createNewCourseVersion = async (
  courseId: string,
  data: CreateCourseData
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // Get the latest version number for this course
    const { data: latestVersion } = await supabaseTyped
      .from('course_versions')
      .select('version')
      .eq('course_id', courseId)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (latestVersion?.version || 0) + 1;

    // Create new version
    const { error } = await supabaseTyped
      .from('course_versions')
      .insert({
        course_id: courseId,
        author_id: user.id,
        version: nextVersion,
        ...data
      });

    if (error) return { error: error.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al crear versión del curso' };
  }
};