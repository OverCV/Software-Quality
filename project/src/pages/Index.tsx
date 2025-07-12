
import { useState, useEffect } from 'react';
import { ProfessorCard } from '@/components/ProfessorCard';
import { ProfessorModal } from '@/components/ProfessorModal';
import { ProfessorVersionsModal } from '@/components/ProfessorVersionsModal';
import { CoursesModal } from '@/components/CoursesModal';
import { CourseVersionsModal } from '@/components/CourseVersionsModal';
import { ReviewsModal } from '@/components/ReviewsModal';
import { LoginModal } from '@/components/LoginModal';
import { EditProfessorModal } from '@/components/EditProfessorModal';
import { EditCourseModal } from '@/components/EditCourseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Professor, Course } from '@/types';
import { Search, LogIn, LogOut, User, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfessors } from '@/services/professors';
import { addReview } from '@/services/courses';
import { seedDatabase } from '@/services/seedData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProfessorId, setSelectedProfessorId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showEditProfessor, setShowEditProfessor] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showProfessorVersions, setShowProfessorVersions] = useState(false);
  const [showCourseVersions, setShowCourseVersions] = useState(false);
  const [professorsLoading, setProfessorsLoading] = useState(true);
  
  const { user, logout, isAuthenticated, loading } = useAuth();

  const { toast } = useToast();

  // Load professors from database
  useEffect(() => {
    loadProfessors();
  }, []);

  const loadProfessors = async () => {
    setProfessorsLoading(true);
    try {
      // Try to seed database first if authenticated
      if (isAuthenticated) {
        await seedDatabase();
      }
      
      const data = await getProfessors();
      setProfessors(data);
    } catch (error) {
      console.error('Error loading professors:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los profesores",
        variant: "destructive",
      });
    } finally {
      setProfessorsLoading(false);
    }
  };

  const filteredProfessors = professors.filter(professor =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (professor: Professor) => {
    setSelectedProfessor(professor);
    setShowProfile(true);
  };

  const handleViewCourses = (professor: Professor) => {
    setSelectedProfessor(professor);
    setShowCourses(true);
  };

  const handleViewReviews = (course: Course) => {
    setSelectedCourse(course);
    setShowReviews(true);
  };

  const handleAddReview = async (courseId: string, reviewData: {
    personalRating: number;
    teachingRating: number;
    comment: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await addReview(courseId, reviewData);
      
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "¡Reseña añadida!",
        description: "Tu reseña ha sido guardada correctamente",
      });

      // Reload professors to show updated data
      loadProfessors();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la reseña",
        variant: "destructive",
      });
    }
  };

  const handleEditProfessor = (professor: Professor) => {
    setSelectedProfessor(professor);
    setShowEditProfessor(true);
    setShowProfile(false); // Cerrar modal del perfil
    setShowProfessorVersions(false); // Cerrar modal de versiones
  };

  const handleCreateCourse = (professorId: string) => {
    setSelectedProfessorId(professorId);
    setSelectedCourse(null);
    setShowEditCourse(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedProfessorId(null);
    setShowEditCourse(true);
    setShowCourses(false); // Cerrar modal de cursos
    setShowCourseVersions(false); // Cerrar modal de versiones
  };

  const handleViewProfessorVersions = (professorId: string) => {
    setSelectedProfessorId(professorId);
    setShowProfessorVersions(true);
  };

  const handleViewCourseVersions = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowCourseVersions(true);
  };

  if (loading || professorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Sistema de Evaluación de Profesores
          </h1>
          <p className="text-muted-foreground">
            Descubre y evalúa a los profesores de tu universidad
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button onClick={() => setShowEditProfessor(true)} className="mr-2">
              <Plus className="h-4 w-4 mr-2" />
              Añadir Profesor
            </Button>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.user_metadata?.display_name || user?.email}</span>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowLogin(true)}>
              <LogIn className="h-4 w-4 mr-2" />
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="bg-muted/50 p-4 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Inicia sesión</strong> para poder agregar reseñas y calificaciones a los profesores
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar profesores por nombre o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProfessors.map((professor) => (
          <ProfessorCard
            key={professor.id}
            professor={professor}
            onViewProfile={handleViewProfile}
            onViewCourses={handleViewCourses}
          />
        ))}
      </div>

      {filteredProfessors.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron profesores</h3>
          <p className="text-muted-foreground">
            No hay profesores que coincidan con tu búsqueda
          </p>
        </div>
      )}

      <ProfessorModal
        professor={selectedProfessor}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onEditProfessor={handleEditProfessor}
        onViewVersions={handleViewProfessorVersions}
      />

      <ProfessorVersionsModal
        professorId={selectedProfessorId}
        isOpen={showProfessorVersions}
        onClose={() => setShowProfessorVersions(false)}
        onEditVersion={(professorId) => {
          const professor = professors.find(p => p.id === professorId);
          if (professor) {
            setSelectedProfessor(professor);
            setShowEditProfessor(true);
            setShowProfessorVersions(false); // Cerrar modal de versiones
          }
        }}
        onVersionChange={() => {
          // Solo recargar si es necesario - mejorar UX
          loadProfessors();
        }}
      />

      <CoursesModal
        professor={selectedProfessor}
        isOpen={showCourses}
        onClose={() => setShowCourses(false)}
        onViewReviews={handleViewReviews}
        onAddReview={handleAddReview}
        onEditCourse={handleEditCourse}
        onCreateCourse={handleCreateCourse}
        onViewCourseVersions={handleViewCourseVersions}
      />

      <CourseVersionsModal
        courseId={selectedCourseId}
        isOpen={showCourseVersions}
        onClose={() => setShowCourseVersions(false)}
        onEditVersion={(courseId) => {
          const course = selectedProfessor?.courses.find(c => c.id === courseId);
          if (course) {
            setSelectedCourse(course);
            setShowEditCourse(true);
            setShowCourseVersions(false); // Cerrar modal de versiones
          }
        }}
        onVersionChange={() => {
          // Solo recargar si es necesario - mejorar UX
          loadProfessors();
        }}
      />

      <ReviewsModal
        course={selectedCourse}
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <EditProfessorModal
        professor={selectedProfessor}
        isOpen={showEditProfessor}
        onClose={() => {
          setShowEditProfessor(false);
          setSelectedProfessor(null);
        }}
        onSuccess={() => {
          loadProfessors();
          setShowEditProfessor(false);
          setSelectedProfessor(null);
        }}
      />

      <EditCourseModal
        course={selectedCourse}
        professorId={selectedProfessorId}
        isOpen={showEditCourse}
        onClose={() => {
          setShowEditCourse(false);
          setSelectedCourse(null);
          setSelectedProfessorId(null);
        }}
        onSuccess={() => {
          loadProfessors();
          setShowEditCourse(false);
          setSelectedCourse(null);
          setSelectedProfessorId(null);
        }}
      />
    </div>
  );
};

export default Index;
