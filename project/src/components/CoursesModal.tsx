
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Professor, Course } from '../types';
import { Star, Users, BookOpen, Plus, Edit, Vote } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AddReviewModal } from './AddReviewModal';

interface CoursesModalProps {
  professor: Professor | null;
  isOpen: boolean;
  onClose: () => void;
  onViewReviews: (course: Course) => void;
  onAddReview: (courseId: string, review: {
    personalRating: number;
    teachingRating: number;
    comment: string;
  }) => void;
  onEditCourse?: (course: Course) => void;
  onCreateCourse?: (professorId: string) => void;
  onViewCourseVersions?: (courseId: string) => void;
}

export function CoursesModal({ 
  professor, 
  isOpen, 
  onClose, 
  onViewReviews, 
  onAddReview,
  onEditCourse,
  onCreateCourse,
  onViewCourseVersions
}: CoursesModalProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!professor) return null;

  const renderHearts = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'heart-filled' : 'text-gray-300'}`}>
        {i < Math.floor(rating) ? '❤️' : '💔'}
      </span>
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'star-filled fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleAddReview = (course: Course) => {
    setSelectedCourse(course);
    setShowAddReview(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">
                Cursos de {professor.name}
              </DialogTitle>
              {onCreateCourse && (
                <Button onClick={() => onCreateCourse(professor.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Curso
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {professor.courses.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay cursos disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professor.courses.map((course) => (
                  <Card key={course.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {course.code}
                          </Badge>
                        </div>
                        <Badge variant="secondary">
                          {course.credits} créditos
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="text-sm text-muted-foreground">
                        {course.semester} {course.year}
                      </div>
                      
                      {course.authorName && (
                        <div className="text-xs text-muted-foreground">
                          Mejorado por: {course.authorName}
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Como Persona:</span>
                          <div className="flex items-center gap-1">
                            {renderHearts(course.avgPersonalRating)}
                            <span>{course.avgPersonalRating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Como Docente:</span>
                          <div className="flex items-center gap-1">
                            {renderStars(course.avgTeachingRating)}
                            <span>{course.avgTeachingRating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{course.reviews.length} reseñas</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          {onViewCourseVersions && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onViewCourseVersions(course.id)}
                              className="flex-1"
                            >
                              <Vote className="h-4 w-4 mr-2" />
                              Versiones
                            </Button>
                          )}
                          {onEditCourse && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onEditCourse(course)}
                              className="flex-1"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => onViewReviews(course)}
                            disabled={course.reviews.length === 0}
                          >
                            Ver Reseñas
                          </Button>
                          {isAuthenticated && (
                            <Button 
                              size="sm"
                              onClick={() => handleAddReview(course)}
                              className="gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Reseñar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AddReviewModal
        course={selectedCourse}
        isOpen={showAddReview}
        onClose={() => {
          setShowAddReview(false);
          setSelectedCourse(null);
        }}
        onAddReview={onAddReview}
      />
    </>
  );
}
