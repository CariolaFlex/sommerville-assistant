'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowRight } from 'lucide-react';
import type { Option } from '@/types/decision-tree';

interface OptionCardProps {
  option: Option;
  onSelect: () => void;
}

export function OptionCard({ option, onSelect }: OptionCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] hover:border-blue-500 group relative overflow-hidden"
      onClick={onSelect}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/30 group-hover:to-blue-100/20 transition-all duration-300 pointer-events-none" />
      
      <CardHeader className="relative">
        <div className="flex items-start gap-3">
          {option.icon && (
            <span className="text-4xl flex-shrink-0 transition-transform group-hover:scale-110" role="img" aria-label="icon">
              {option.icon}
            </span>
          )}
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors flex items-center gap-2">
              {option.label}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm leading-relaxed">
              {option.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Ejemplos */}
        {option.examples && option.examples.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-muted-foreground mb-1.5">
              📋 Ejemplos:
            </p>
            <ul className="text-sm space-y-1">
              {option.examples.slice(0, 3).map((example, i) => (
                <li key={i} className="text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cuándo elegir */}
        {option.whenToChoose && option.whenToChoose.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-muted-foreground mb-1.5">
              ✅ Cuándo elegir:
            </p>
            <ul className="text-sm space-y-1">
              {option.whenToChoose.slice(0, 2).map((reason, i) => (
                <li key={i} className="text-muted-foreground pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-green-500 before:font-bold">
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warning */}
        {option.warning && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md mt-3 animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">{option.warning}</p>
          </div>
        )}

        {/* Características */}
        {option.characteristics && Object.keys(option.characteristics).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {Object.entries(option.characteristics).slice(0, 4).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {String(value)}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
