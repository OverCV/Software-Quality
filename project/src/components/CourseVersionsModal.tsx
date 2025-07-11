import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCourseVersions, voteForCourseVersion, getUserVotesForCourse } from '@/services/courses';
import { CourseVersion } from '@/types/courses';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Calendar, Edit, BookOpen } from 'lucide-react';

interface CourseVersionsModalProps {
  courseId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onEditVersion: (courseId: string) => void;
  onVersionChange: () => void;
}

export function CourseVersionsModal({ 
  courseId, 
  isOpen, 
  onClose, 
  onEditVersion,
  onVersionChange 
}: CourseVersionsModalProps) {
  const [versions, setVersions] = useState<CourseVersion[]>([]);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [votingVersionId, setVotingVersionId] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadVersions = async () => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const [versionsData, likesData] = await Promise.all([
        getCourseVersions(courseId),
        isAuthenticated ? getUserVotesForCourse(courseId) : Promise.resolve(new Set<string>())
      ]);
      
      setVersions(versionsData);
      setUserLikes(likesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las versiones del curso",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && courseId) {
      loadVersions();
    }
  }, [isOpen, courseId, isAuthenticated]);

  const handleLike = async (versionId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para dar like",
        variant: "destructive",
      });
      return;
    }

    setVotingVersionId(versionId);
    try {
      const { error } = await voteForCourseVersion(versionId, 'toggle');
      
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      const wasLiked = userLikes.has(versionId);
      const message = wasLiked ? 'Like removido' : 'Like registrado';

      toast({
        title: "¡Like actualizado!",
        description: message,
      });

      // Reload versions and notify parent
      await loadVersions();
      onVersionChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el like",
        variant: "destructive",
      });
    } finally {
      setVotingVersionId(null);
    }
  };

  if (!courseId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Versiones del Curso</DialogTitle>
          <p className="text-muted-foreground">
            Da like a la versión más precisa o crea una nueva versión con información actualizada
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-sm">
              {versions.length} versión{versions.length !== 1 ? 'es' : ''} disponible{versions.length !== 1 ? 's' : ''}
            </Badge>
            
            {isAuthenticated && (
              <Button onClick={() => onEditVersion(courseId)}>
                <Edit className="h-4 w-4 mr-2" />
                Nueva Versión
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg">Cargando versiones...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version, index) => (
                <Card key={version.id} className={`${index === 0 ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold">{version.code} - {version.name}</h3>
                            {index === 0 && (
                              <Badge variant="default" className="text-xs">
                                Más Votada
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{version.semester} {version.year}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {version.credits} créditos
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {version.vote_count || 0}
                            </div>
                            <div className="text-xs text-muted-foreground">likes</div>
                          </div>
                          
                          {isAuthenticated && (
                            <Button
                              variant={userLikes.has(version.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleLike(version.id)}
                              disabled={votingVersionId === version.id}
                              className="px-3 py-2"
                            >
                              <Heart 
                                className={`h-4 w-4 mr-1 ${userLikes.has(version.id) ? 'fill-current' : ''}`} 
                              />
                              {userLikes.has(version.id) ? 'Liked' : 'Like'}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <strong className="text-sm">Descripción:</strong>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {version.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>Por: {version.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Creada: {new Date(version.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!loading && versions.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No hay versiones disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Sé el primero en crear una versión de este curso
              </p>
              {isAuthenticated && (
                <Button onClick={() => onEditVersion(courseId)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Crear Primera Versión
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}