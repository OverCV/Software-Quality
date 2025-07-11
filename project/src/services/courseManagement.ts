import { supabase } from '@/integrations/supabase/client';
import { CreateCourseData } from '@/types/courses';

const supabaseTyped = supabase as any;

export const checkUserVersion = async (
  entityId: string, 
  userId: string, 
  type: 'professor' | 'course'
): Promise<{ hasVersion: boolean; versionId?: string }> => {
  try {
    const table = type === 'professor' ? 'professor_versions' : 'course_versions';
    const idField = type === 'professor' ? 'professor_id' : 'course_id';

    const { data, error } = await supabaseTyped
      .from(table)
      .select('id')
      .eq(idField, entityId)
      .eq('author_id', userId);

    if (error) return { hasVersion: false };

    if (data && data.length > 0) {
      return { hasVersion: true, versionId: data[0].id };
    }

    return { hasVersion: false };
  } catch (error) {
    return { hasVersion: false };
  }
};

export const updateUserCourseVersion = async (
  versionId: string,
  data: CreateCourseData
): Promise<{ error?: string }> => {
  try {
    const { error } = await supabaseTyped
      .from('course_versions')
      .update(data)
      .eq('id', versionId);

    if (error) return { error: error.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al actualizar versión del curso' };
  }
};