
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '../types';
import { Star, Calendar, User } from 'lucide-react';

interface ReviewsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewsModal({ course, isOpen, onClose }: ReviewsModalProps) {
  if (!course) return null;

  const renderHearts = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'heart-filled' : 'text-gray-300'}`}>
        ❤️
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Reseñas de {course.name}
          </DialogTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{course.code}</Badge>
            <Badge variant="secondary">{course.semester} {course.year}</Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {course.reviews.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hay reseñas disponibles</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {course.avgPersonalRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-1">
                    {renderHearts(course.avgPersonalRating)}
                  </div>
                  <div className="text-sm text-muted-foreground">Valoración Personal</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {course.avgTeachingRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-1">
                    {renderStars(course.avgTeachingRating)}
                  </div>
                  <div className="text-sm text-muted-foreground">Valoración Docente</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{review.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{review.semester} {review.year}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Como Persona:</span>
                          <div className="flex items-center gap-1">
                            {renderHearts(review.personalRating)}
                            <span className="text-sm">{review.personalRating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Como Docente:</span>
                          <div className="flex items-center gap-1">
                            {renderStars(review.teachingRating)}
                            <span className="text-sm">{review.teachingRating}</span>
                          </div>
                        </div>
                      </div>
                      
                      {review.comment && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground italic">
                            "{review.comment}"
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
