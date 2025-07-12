
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Professor } from '../types';
import { Mail, Phone, MapPin, Star, Edit, Vote } from 'lucide-react';

interface ProfessorModalProps {
  professor: Professor | null;
  isOpen: boolean;
  onClose: () => void;
  onEditProfessor?: (professor: Professor) => void;
  onViewVersions?: (professorId: string) => void;
}

export function ProfessorModal({ professor, isOpen, onClose, onEditProfessor, onViewVersions }: ProfessorModalProps) {
  if (!professor) return null;

  const renderHearts = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'heart-filled' : 'text-gray-300'}`}>
        {i < Math.floor(rating) ? '❤️' : '💔'}
      </span>
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'star-filled fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Perfil del Profesor</DialogTitle>
            <div className="flex gap-2">
              {onViewVersions && (
                <Button variant="outline" size="sm" onClick={() => onViewVersions(professor.id)}>
                  <Vote className="h-4 w-4 mr-2" />
                  Ver Versiones
                </Button>
              )}
              {onEditProfessor && (
                <Button variant="outline" size="sm" onClick={() => onEditProfessor(professor)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Info
                </Button>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Información más votada por la comunidad • Autor: {professor.authorName}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={professor.image}
                alt={professor.name}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/20"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{professor.name}</h3>
                <Badge variant="secondary" className="mt-2">
                  {professor.department}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{professor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{professor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{professor.office}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Valoración Personal</h4>
              <div className="flex items-center gap-2">
                {renderHearts(professor.personalRating)}
                <span className="font-medium">{professor.personalRating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Valoración Docente</h4>
              <div className="flex items-center gap-2">
                {renderStars(professor.teachingRating)}
                <span className="font-medium">{professor.teachingRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Biografía</h4>
            <p className="text-muted-foreground leading-relaxed">
              {professor.bio}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Estadísticas</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">{professor.courses.length}</div>
                <div className="text-sm text-muted-foreground">Cursos</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">{professor.totalReviews}</div>
                <div className="text-sm text-muted-foreground">Reseñas</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-primary">
                  {((professor.personalRating + professor.teachingRating) / 2).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
