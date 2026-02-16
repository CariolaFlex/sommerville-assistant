'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Building2, User, FileText } from 'lucide-react';
import type { PDFCustomization } from '@/types/pdf-customization';

interface PDFCustomizationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (customization: PDFCustomization) => void;
  defaultValues?: PDFCustomization;
}

export function PDFCustomizationForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: PDFCustomizationFormProps) {
  const [customization, setCustomization] = useState<PDFCustomization>(
    defaultValues || {
      includeTimestamp: true,
      includeDiagrams: true,
      includeTemplates: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customization);
    onOpenChange(false);
  };

  const updateField = <K extends keyof PDFCustomization>(
    field: K,
    value: PDFCustomization[K]
  ) => {
    setCustomization((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personalizar PDF
          </DialogTitle>
          <DialogDescription>
            Personaliza el documento PDF con información de tu proyecto u organización
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Proyecto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Información del Proyecto
            </h3>

            <div className="space-y-2">
              <Label htmlFor="projectName">Nombre del Proyecto</Label>
              <Input
                id="projectName"
                placeholder="Ej: Sistema de Gestión Escolar"
                value={customization.projectName || ''}
                onChange={(e) => updateField('projectName', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Aparecerá en la portada y encabezados
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Empresa/Organización</Label>
              <div className="flex gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground mt-2" />
                <Input
                  id="companyName"
                  placeholder="Ej: Universidad Nacional"
                  value={customization.companyName || ''}
                  onChange={(e) => updateField('companyName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorName">Autor(es)</Label>
              <div className="flex gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-2" />
                <Input
                  id="authorName"
                  placeholder="Ej: Juan Pérez, María González"
                  value={customization.authorName || ''}
                  onChange={(e) => updateField('authorName', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Opciones de Contenido */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contenido del PDF</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="includeDiagrams">Incluir Diagramas</Label>
                <p className="text-xs text-muted-foreground">
                  Diagramas de decisión, proceso, arquitectura y timeline
                </p>
              </div>
              <Switch
                id="includeDiagrams"
                checked={customization.includeDiagrams ?? true}
                onCheckedChange={(checked) => updateField('includeDiagrams', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="includeTemplates">Incluir Plantillas</Label>
                <p className="text-xs text-muted-foreground">
                  Plantillas y recursos recomendados
                </p>
              </div>
              <Switch
                id="includeTemplates"
                checked={customization.includeTemplates ?? true}
                onCheckedChange={(checked) => updateField('includeTemplates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="includeTimestamp">Incluir Fecha de Generación</Label>
                <p className="text-xs text-muted-foreground">
                  Muestra cuándo se generó el documento
                </p>
              </div>
              <Switch
                id="includeTimestamp"
                checked={customization.includeTimestamp ?? true}
                onCheckedChange={(checked) => updateField('includeTimestamp', checked)}
              />
            </div>
          </div>

          {/* Personalización Visual */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Personalización Visual</h3>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Color Principal</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  className="w-20 h-10"
                  value={customization.primaryColor || '#3b82f6'}
                  onChange={(e) => updateField('primaryColor', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="#3b82f6"
                  value={customization.primaryColor || ''}
                  onChange={(e) => updateField('primaryColor', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Se aplicará a títulos y elementos destacados
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customFooter">Texto del Pie de Página</Label>
              <Textarea
                id="customFooter"
                placeholder="Ej: Documento confidencial - Solo para uso interno"
                value={customization.customFooter || ''}
                onChange={(e) => updateField('customFooter', e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Aplicar y Exportar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
