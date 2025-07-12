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
import { getProfessorVersions, voteForProfessorVersion, ProfessorVersion, getUserVotesForProfessor } from '@/services/professors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Calendar, Edit } from 'lucide-react'; // ✅ Cambié ThumbsUp/ThumbsDown por Heart

interface ProfessorVersionsModalProps {
  professorId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onEditVersion: (professorId: string) => void;
  onVersionChange: () => void;
}

export function ProfessorVersionsModal({ 
  professorId, 
  isOpen, 
  onClose, 
  onEditVersion,
  onVersionChange 
}: ProfessorVersionsModalProps) {
  const [versions, setVersions] = useState<ProfessorVersion[]>([]);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set()); // ✅ Solo userLikes (Set), eliminé userVotes
  const [loading, setLoading] = useState(false);
  const [votingVersionId, setVotingVersionId] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadVersions = async () => {
    if (!professorId) return;
    
    setLoading(true);
    try {
      const [versionsData, likesData] = await Promise.all([
        getProfessorVersions(professorId),
        isAuthenticated ? getUserVotesForProfessor(professorId) : Promise.resolve(new Set<string>()) // ✅ Cambié a Set
      ]);
      
      setVersions(versionsData);
      setUserLikes(likesData); // ✅ Cambié setUserVotes por setUserLikes
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las versiones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && professorId) {
      loadVersions();
    }
  }, [isOpen, professorId, isAuthenticated]);

  // ✅ Cambié handleVote por handleLike con lógica simplificada
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
      const { error } = await voteForProfessorVersion(versionId, 'toggle'); // ✅ Solo toggle
      
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      // ✅ Lógica simplificada para el mensaje
      const wasLiked = userLikes.has(versionId);
      const message = wasLiked ? 'Like removido' : 'Like registrado';

      toast({
        title: "¡Like actualizado!",
        description: message,
      });

      // Recargar datos
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

  if (!professorId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Versiones del Profesor</DialogTitle>
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
              <Button onClick={() => onEditVersion(professorId)}>
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
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={version.image_url}
                          alt={version.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold">{version.name}</h3>
                              {index === 0 && (
                                <Badge variant="default" className="text-xs">
                                  Más Popular
                                </Badge>
                              )}
                            </div>
                            <Badge variant="secondary">{version.department}</Badge>
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Email:</strong> {version.email}
                          </div>
                          <div>
                            <strong>Teléfono:</strong> {version.phone}
                          </div>
                          <div>
                            <strong>Oficina:</strong> {version.office}
                          </div>
                        </div>
                        
                        <div>
                          <strong className="text-sm">Biografía:</strong>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {version.bio}
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
                Sé el primero en crear una versión de este profesor
              </p>
              {isAuthenticated && (
                <Button onClick={() => onEditVersion(professorId)}>
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
