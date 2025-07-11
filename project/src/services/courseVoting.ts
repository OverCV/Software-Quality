import { supabase } from '@/integrations/supabase/client';

const supabaseTyped = supabase as any;

export const getUserVotesForCourse = async (courseId: string): Promise<Set<string>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Set();

    // Obtener todas las versiones del curso
    const { data: versions } = await supabaseTyped
      .from('course_versions')
      .select('id')
      .eq('course_id', courseId);

    if (!versions || versions.length === 0) return new Set();

    const versionIds = versions.map(v => v.id);

    // Obtener votos del usuario para estas versiones (solo positivos)
    const { data: votes } = await supabaseTyped
      .from('version_votes')
      .select('course_version_id')
      .eq('user_id', user.id)
      .eq('vote_value', 1) // Solo votos positivos
      .in('course_version_id', versionIds);

    // Crear Set de IDs de versiones que el usuario ha votado
    return new Set(votes?.map(vote => vote.course_version_id) || []);
  } catch (error) {
    console.error('Error fetching user votes:', error);
    return new Set();
  }
};

export const voteForCourseVersion = async (
  versionId: string,
  voteType: 'toggle'
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // Verificar si el usuario ya tiene un voto para esta versión
    const { data: existingVotes, error: fetchError } = await supabaseTyped
      .from('version_votes')
      .select('id, vote_value')
      .eq('course_version_id', versionId)
      .eq('user_id', user.id);

    // Solo verificar error real, no PGRST116
    if (fetchError && fetchError.code !== 'PGRST116') {
      return { error: fetchError.message };
    }

    const existingVote = existingVotes && existingVotes.length > 0 ? existingVotes[0] : null;

    if (existingVote) {
      // Ya existe un voto -> removerlo (toggle off)
      const { error } = await supabaseTyped
        .from('version_votes')
        .delete()
        .eq('id', existingVote.id);

      if (error) return { error: error.message };
    } else {
      // No existe voto -> crear uno positivo (toggle on)
      const { error } = await supabaseTyped
        .from('version_votes')
        .insert({
          course_version_id: versionId,
          user_id: user.id,
          vote_value: 1 // Solo votos positivos
        });

      if (error) return { error: error.message };
    }

    return {};
  } catch (error) {
    return { error: 'Error inesperado al votar' };
  }
};