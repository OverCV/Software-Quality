import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VersionSelectorProps {
  versions?: number;
  currentVersion?: number;
  className?: string;
}

export function VersionSelector({ 
  versions = 1,
  currentVersion = 1,
  className = ""
}: VersionSelectorProps) {
  // Simplified version selector for now
  // Will be enhanced once the full versioning system is implemented
  
  if (versions <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant="secondary" className="text-xs">
        Versión {currentVersion} de {versions}
      </Badge>
    </div>
  );
}