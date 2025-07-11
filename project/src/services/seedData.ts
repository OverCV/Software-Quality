import { supabase } from '@/integrations/supabase/client';
import { mockProfessors } from '@/data/mockData';

// Type assertion for Supabase client to bypass empty schema
const supabaseTyped = supabase as any;

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // First, check if we already have data
    const { data: existingProfessors } = await supabaseTyped
      .from('professors')
      .select('id')
      .limit(1);

    if (existingProfessors && existingProfessors.length > 0) {
      console.log('📊 Database already has data, skipping seed');
      return { success: true, message: 'Database already seeded' };
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Seed professors and their data
    for (const mockProfessor of mockProfessors) {
      // Create professor
      const { data: professor, error: professorError } = await supabaseTyped
        .from('professors')
        .insert({})
        .select()
        .single();

      if (professorError) {
        console.error('Error creating professor:', professorError);
        continue;
      }

      // Create professor version
      const { error: versionError } = await supabaseTyped
        .from('professor_versions')
        .insert({
          professor_id: professor?.id,
          author_id: user.id,
          name: mockProfessor.name,
          department: mockProfessor.department,
          email: mockProfessor.email,
          phone: mockProfessor.phone,
          office: mockProfessor.office,
          bio: mockProfessor.bio,
          image_url: mockProfessor.image
        });

      if (versionError) {
        console.error('Error creating professor version:', versionError);
        continue;
      }

      // Create courses for this professor
      for (const mockCourse of mockProfessor.courses) {
        // Create course
        const { data: course, error: courseError } = await supabaseTyped
          .from('courses')
          .insert({ professor_id: professor?.id })
          .select()
          .single();

        if (courseError) {
          console.error('Error creating course:', courseError);
          continue;
        }

        // Create course version
        const { error: courseVersionError } = await supabaseTyped
          .from('course_versions')
          .insert({
            course_id: course?.id,
            author_id: user.id,
            code: mockCourse.code,
            name: mockCourse.name,
            description: mockCourse.description,
            semester: mockCourse.semester,
            year: mockCourse.year,
            credits: mockCourse.credits
          });

        if (courseVersionError) {
          console.error('Error creating course version:', courseVersionError);
          continue;
        }

        // Create reviews for this course
        for (const mockReview of mockCourse.reviews) {
          const { error: reviewError } = await supabaseTyped
            .from('reviews')
            .insert({
              course_id: course?.id,
              user_id: user.id,
              semester: mockReview.semester,
              year: mockReview.year,
              personal_rating: mockReview.personalRating,
              teaching_rating: mockReview.teachingRating,
              comment: mockReview.comment
            });

          if (reviewError) {
            console.error('Error creating review:', reviewError);
          }
        }
      }

      console.log(`✅ Seeded professor: ${mockProfessor.name}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    return { success: true, message: 'Database seeded successfully' };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, error: 'Failed to seed database' };
  }
};