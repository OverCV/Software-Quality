
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Course } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AddReviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (courseId: string, review: {
    personalRating: number;
    teachingRating: number;
    comment: string;
  }) => void;
}

export function AddReviewModal({ course, isOpen, onClose, onAddReview }: AddReviewModalProps) {
  const [personalRating, setPersonalRating] = useState(0);
  const [teachingRating, setTeachingRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (personalRating === 0 || teachingRating === 0) {
      toast({
        title: "Error",
        description: "Por favor, proporciona ambas calificaciones.",
        variant: "destructive",
      });
      return;
    }

    onAddReview(course.id, {
      personalRating,
      teachingRating,
      comment,
    });

    toast({
      title: "¡Reseña agregada!",
      description: "Tu reseña ha sido guardada correctamente.",
    });

    // Reset form
    setPersonalRating(0);
    setTeachingRating(0);
    setComment('');
    onClose();
  };

  const renderHeartRating = (rating: number, setRating: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            className={`text-2xl transition-colors ${
              i < rating ? 'text-red-500' : 'text-gray-300 hover:text-red-300'
            }`}
          >
            ❤️
          </button>
        ))}
      </div>
    );
  };

  const renderStarRating = (rating: number, setRating: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            className="transition-colors"
          >
            <Star
              className={`h-6 w-6 ${
                i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Reseña</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {course.name} ({course.code})
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Como Persona ({personalRating}/5)</Label>
            {renderHeartRating(personalRating, setPersonalRating)}
          </div>
          
          <div className="space-y-3">
            <Label>Como Docente ({teachingRating}/5)</Label>
            {renderStarRating(teachingRating, setTeachingRating)}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Comentario (opcional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia con este curso..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar Reseña
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
