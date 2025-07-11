import { supabase } from '@/integrations/supabase/client';

const supabaseTyped = supabase as any;

export const addReview = async (
  courseId: string,
  reviewData: {
    personalRating: number;
    teachingRating: number;
    comment: string;
  }
): Promise<{ error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Usuario no autenticado' };

    const { error } = await supabaseTyped
      .from('reviews')
      .insert({
        course_id: courseId,
        user_id: user.id,
        semester: 'Actual',
        year: new Date().getFullYear(),
        personal_rating: reviewData.personalRating,
        teaching_rating: reviewData.teachingRating,
        comment: reviewData.comment
      });

    if (error) return { error: error.message };

    return {};
  } catch (error) {
    return { error: 'Error inesperado al añadir reseña' };
  }
};