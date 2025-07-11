import { supabase } from '@/integrations/supabase/client';
import { CourseVersion } from '@/types/courses';

const supabaseTyped = supabase as any;

export const getCourseVersions = async (courseId: string): Promise<CourseVersion[]> => {
  try {
    // Primero, obtener las versiones sin intentar unir con profiles
    const { data, error } = await supabaseTyped
      .from('course_versions')
      .select(`
        id,
        course_id,
        author_id,
        code,
        name,
        description,
        semester,
        year,
        credits,
        version,
        vote_count,
        created_at,
        updated_at
      `)
      .eq('course_id', courseId)
      .order('vote_count', { ascending: false });

    if (error) {
      console.error('Error fetching course versions:', error);
      return [];
    }

    if (!data || data.length === 0) return [];

    // Obtener los IDs únicos de autores
    const authorIds = [...new Set(data.map(version => version.author_id))];

    // Consulta separada para obtener los perfiles
    const { data: profiles } = await supabaseTyped
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', authorIds);

    // Crear un mapa para búsqueda rápida
    const profileMap = new Map(
      profiles?.map(profile => [profile.user_id, profile.display_name]) || []
    );

    // Combinar los datos
    return data.map(version => ({
      ...version,
      author_name: profileMap.get(version.author_id) || 'Usuario desconocido'
    }));
  } catch (error) {
    console.error('Error in getCourseVersions:', error);
    return [];
  }
};