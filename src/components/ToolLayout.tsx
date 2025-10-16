import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

const ToolLayout = ({ title, description, icon: Icon, children }: ToolLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in-up">
      <Card className="shadow-elegant border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolLayout;
