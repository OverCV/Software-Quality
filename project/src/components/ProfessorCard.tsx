
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Professor } from '../types';
import { Star, Users } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor;
  onViewProfile: (professor: Professor) => void;
  onViewCourses: (professor: Professor) => void;
}

export function ProfessorCard({ professor, onViewProfile, onViewCourses }: ProfessorCardProps) {
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
    <Card className="card-hover h-full">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4">
          <img
            src={professor.image}
            alt={professor.name}
            className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
          />
        </div>
        <CardTitle className="text-xl">{professor.name}</CardTitle>
        <Badge variant="secondary" className="w-fit mx-auto">
          {professor.department}
        </Badge>
        <p className="text-xs text-muted-foreground mt-1">
          Mejorado por: {professor.authorName}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Como Persona:</span>
            <div className="flex items-center gap-1">
              {renderHearts(professor.personalRating)}
              <span className="ml-1 text-sm text-muted-foreground">
                {professor.personalRating.toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Como Docente:</span>
            <div className="flex items-center gap-1">
              {renderStars(professor.teachingRating)}
              <span className="ml-1 text-sm text-muted-foreground">
                {professor.teachingRating.toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{professor.totalReviews} reseñas</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => onViewProfile(professor)} className="w-full">
            Ver Perfil
          </Button>
          <Button onClick={() => onViewCourses(professor)} className="w-full">
            Ver Cursos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
