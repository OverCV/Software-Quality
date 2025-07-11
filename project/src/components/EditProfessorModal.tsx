import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Professor } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createProfessor, createProfessorVersion, checkUserVersion, updateUserProfessorVersion } from '@/services/professors';

interface EditProfessorModalProps {
  professor: Professor | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditProfessorModal({ professor, isOpen, onClose, onSuccess }: EditProfessorModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    phone: '',
    office: '',
    bio: '',
    image_url: '',
  });

  // Fill form with professor data when modal opens
  useEffect(() => {
    if (professor && isOpen) {
      setFormData({
        name: professor.name,
        department: professor.department,
        email: professor.email,
        phone: professor.phone,
        office: professor.office,
        bio: professor.bio,
        image_url: professor.image,
      });
    } else if (!professor && isOpen) {
      setFormData({
        name: '',
        department: '',
        email: '',
        phone: '',
        office: '',
        bio: '',
        image_url: '',
      });
    }
  }, [professor, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let result;
      
      if (professor) {
        // Check if user already has a version for this professor
        const userVersionResult = await checkUserVersion(professor.id, user.id, 'professor');
        
        if (userVersionResult.hasVersion) {
          // Update existing user version
          result = await updateUserProfessorVersion(userVersionResult.versionId!, formData);
        } else {
          // Create new version
          result = await createProfessorVersion(professor.id, formData);
        }
      } else {
        // Create new professor
        result = await createProfessor(formData);
      }
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: professor ? "Versión creada" : "Profesor creado",
        description: professor ? "Nueva versión del profesor creada exitosamente" : "Profesor creado exitosamente",
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar los cambios",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            {professor ? 'Editar Información del Profesor' : 'Crear Nuevo Profesor'}
          </DialogTitle>
          <DialogDescription>
            {professor 
              ? 'Crea una nueva versión con información actualizada del profesor.'
              : 'Completa la información para agregar un nuevo profesor al sistema.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="office">Oficina</Label>
            <Input
              id="office"
              value={formData.office}
              onChange={(e) => setFormData(prev => ({ ...prev, office: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_url">URL de la Foto</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://ejemplo.com/foto.jpg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}