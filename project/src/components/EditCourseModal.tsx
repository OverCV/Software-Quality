import { useState, useEffect } from 'react';
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
import { Course } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createNewCourse, createNewCourseVersion, checkUserVersion, updateUserCourseVersion } from '@/services/courses';
import { CreateCourseData } from '@/types/courses';

interface EditCourseModalProps {
  course: Course | null;
  professorId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditCourseModal({ course, professorId, isOpen, onClose, onSuccess }: EditCourseModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<CreateCourseData>({
    code: '',
    name: '',
    description: '',
    semester: '',
    year: new Date().getFullYear(),
    credits: 3,
  });

  // Fill form with course data when modal opens
  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        code: course.code,
        name: course.name,
        description: course.description,
        semester: course.semester,
        year: course.year,
        credits: course.credits,
      });
    } else if (!course && isOpen) {
      setFormData({
        code: '',
        name: '',
        description: '',
        semester: '',
        year: new Date().getFullYear(),
        credits: 3,
      });
    }
  }, [course, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let result;
      
      if (course) {
        // Check if user already has a version for this course
        const userVersionResult = await checkUserVersion(course.id, user.id, 'course');
        
        if (userVersionResult.hasVersion) {
          // Update existing user version
          result = await updateUserCourseVersion(userVersionResult.versionId!, formData);
        } else {
          // Create new version
          result = await createNewCourseVersion(course.id, formData);
        }
      } else if (professorId) {
        // Create new course
        result = await createNewCourse(professorId, formData);
      } else {
        toast({
          title: "Error",
          description: "No se pudo determinar el profesor para este curso",
          variant: "destructive",
        });
        return;
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
        title: course ? "Versión creada" : "Curso creado",
        description: course ? "Nueva versión del curso creada exitosamente" : "Curso creado exitosamente",
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
            {course ? 'Editar Información del Curso' : 'Crear Nuevo Curso'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código del Curso</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="ej. CS101"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credits">Créditos</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="10"
                value={formData.credits}
                onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Curso</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ej. Introducción a la Programación"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semestre</Label>
              <Input
                id="semester"
                value={formData.semester}
                onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                placeholder="ej. Primer Semestre"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                type="number"
                min="2020"
                max="2030"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Describe el contenido y objetivos del curso..."
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