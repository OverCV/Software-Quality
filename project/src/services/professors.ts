import { supabase } from '@/integrations/supabase/client';
import { Professor } from '@/types';

// Type assertion for Supabase client to bypass empty schema
const supabaseTyped = supabase as any;

export interface ProfessorVersion {
  id: string;
  professor_id: string;
  author_id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  image_url: string;
  version: number;
  vote_count: number;
  created_at: string;
  author_name?: string;
}

export interface CreateProfessorData {
  name: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  image_url: string;
}

export const createProfessor = async (data: CreateProfessorData): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // Create professor
    const { data: professor, error: professorError } = await supabaseTyped
      .from('professors')
      .insert({})
      .select()
      .single();

    if (professorError) return { error: professorError.message };

    // Create first version
    const { error: versionError } = await supabaseTyped
      .from('professor_versions')
      .insert({
        professor_id: professor.id,
        author_id: user.id,
        version: 1,
        ...data
      });

    if (versionError) return { error: versionError.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al crear profesor' };
  }
};

export const createProfessorVersion = async (
  professorId: string, 
  data: CreateProfessorData
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // Get the latest version number for this professor
    const { data: latestVersion } = await supabaseTyped
      .from('professor_versions')
      .select('version')
      .eq('professor_id', professorId)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (latestVersion?.version || 0) + 1;

    // Create new version
    const { error } = await supabaseTyped
      .from('professor_versions')
      .insert({
        professor_id: professorId,
        author_id: user.id,
        version: nextVersion,
        ...data
      });

    if (error) return { error: error.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al crear versión' };
  }
};

export const getProfessors = async (): Promise<Professor[]> => {
  try {
    // Get all professors with their most voted versions
    const { data, error } = await supabaseTyped
      .from('professors')
      .select(`
        id,
        professor_versions (
          id,
          name,
          department,
          email,
          phone,
          office,
          bio,
          image_url,
          version,
          vote_count,
          created_at,
          author_id
        ),
        courses (
          id,
           course_versions (
             id,
             code,
             name,
             description,
             semester,
             year,
             credits,
             version,
             vote_count,
             author_id
           ),
          reviews (
            id,
            personal_rating,
            teaching_rating,
            comment,
            semester,
            year,
            created_at,
            user_id
          )
        )
      `);

    if (error) {
      console.error('Error fetching professors:', error);
      return [];
    }

    if (!data) return [];

    // Obtener los IDs de usuario únicos para hacer una consulta separada
    const userIds = new Set<string>();
    data.forEach(professor => {
      professor.professor_versions?.forEach(version => {
        if (version.author_id) userIds.add(version.author_id);
      });
      professor.courses?.forEach(course => {
        course.course_versions?.forEach(version => {
          if (version.author_id) userIds.add(version.author_id);
        });
        course.reviews?.forEach(review => {
          if (review.user_id) userIds.add(review.user_id);
        });
      });
    });

    // Obtener los perfiles de usuario en una consulta separada
    const { data: profiles } = await supabaseTyped
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', Array.from(userIds));

    // Crear un mapa para búsqueda rápida
    const profileMap = new Map(
      profiles?.map(profile => [profile.user_id, profile.display_name]) || []
    );

    // Transform data to match Professor interface
    return data.map(professor => {
      // Get most voted version
      const mostVotedVersion = professor.professor_versions
        ?.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0];

      if (!mostVotedVersion) return null;

      // Process courses
      const courses = professor.courses?.map(course => {
        const mostVotedCourseVersion = course.course_versions
          ?.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))[0];

        if (!mostVotedCourseVersion) return null;

        const reviews = course.reviews?.map(review => ({
          id: review.id,
          studentName: profileMap.get(review.user_id) || 'Usuario',
          semester: review.semester,
          year: review.year,
          personalRating: review.personal_rating,
          teachingRating: review.teaching_rating,
          comment: review.comment,
          date: review.created_at.split('T')[0]
        })) || [];

        const avgPersonalRating = reviews.length > 0 
          ? reviews.reduce((sum, r) => sum + r.personalRating, 0) / reviews.length 
          : 0;
        const avgTeachingRating = reviews.length > 0 
          ? reviews.reduce((sum, r) => sum + r.teachingRating, 0) / reviews.length 
          : 0;

        return {
          id: course.id,
          code: mostVotedCourseVersion.code,
          name: mostVotedCourseVersion.name,
          description: mostVotedCourseVersion.description,
          semester: mostVotedCourseVersion.semester,
          year: mostVotedCourseVersion.year,
          credits: mostVotedCourseVersion.credits,
          reviews,
          avgPersonalRating,
          avgTeachingRating,
          authorName: profileMap.get(mostVotedCourseVersion.author_id) || 'Usuario desconocido'
        };
      }).filter(Boolean) || [];

      const allReviews = courses.flatMap(course => course.reviews);
      const totalPersonalRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.personalRating, 0) / allReviews.length 
        : 0;
      const totalTeachingRating = allReviews.length > 0 
        ? allReviews.reduce((sum, r) => sum + r.teachingRating, 0) / allReviews.length 
        : 0;

      return {
        id: professor.id,
        name: mostVotedVersion.name,
        department: mostVotedVersion.department,
        email: mostVotedVersion.email,
        phone: mostVotedVersion.phone,
        office: mostVotedVersion.office,
        bio: mostVotedVersion.bio,
        image: mostVotedVersion.image_url,
        personalRating: totalPersonalRating,
        teachingRating: totalTeachingRating,
        totalReviews: allReviews.length,
        authorName: profileMap.get(mostVotedVersion.author_id) || 'Usuario desconocido',
        courses
      };
    }).filter(Boolean);

  } catch (error) {
    console.error('Error in getProfessors:', error);
    return [];
  }
};


export const getProfessorVersions = async (professorId: string): Promise<ProfessorVersion[]> => {
  try {
    // Primero, obtener las versiones sin intentar unir con profiles
    const { data, error } = await supabaseTyped
      .from('professor_versions')
      .select(`
        id,
        professor_id,
        author_id,
        name,
        department,
        email,
        phone,
        office,
        bio,
        image_url,
        version,
        vote_count,
        created_at,
        updated_at
      `)
      .eq('professor_id', professorId)
      .order('vote_count', { ascending: false });

    if (error) {
      console.error('Error fetching professor versions:', error);
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
    console.error('Error in getProfessorVersions:', error);
    return [];
  }
};

export const voteForProfessorVersion = async (
  versionId: string, 
  voteType: 'toggle'
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    // ✅ CORREGIR: No usar .single(), usar array
    const { data: existingVotes, error: fetchError } = await supabaseTyped
      .from('version_votes')
      .select('id, vote_value')
      .eq('professor_version_id', versionId)
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
          professor_version_id: versionId,
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

export const getUserVotesForProfessor = async (professorId: string): Promise<Set<string>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Set();

    // Obtener todas las versiones del profesor
    const { data: versions } = await supabaseTyped
      .from('professor_versions')
      .select('id')
      .eq('professor_id', professorId);

    if (!versions || versions.length === 0) return new Set();

    const versionIds = versions.map(v => v.id);

    // ✅ CORREGIR: Usar .select() sin .single() para evitar error 406
    const { data: votes } = await supabaseTyped
      .from('version_votes')
      .select('professor_version_id')
      .eq('user_id', user.id)
      .eq('vote_value', 1) // Solo votos positivos
      .in('professor_version_id', versionIds);

    // Crear Set de IDs de versiones que el usuario ha votado
    return new Set(votes?.map(vote => vote.professor_version_id) || []);
  } catch (error) {
    console.error('Error fetching user votes:', error);
    return new Set();
  }
};

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

export const updateUserProfessorVersion = async (
  versionId: string,
  data: CreateProfessorData
): Promise<{ error?: string }> => {
  try {
    const { error } = await supabaseTyped
      .from('professor_versions')
      .update(data)
      .eq('id', versionId);

    if (error) return { error: error.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al actualizar versión' };
  }
};
