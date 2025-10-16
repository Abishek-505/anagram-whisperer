import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const FeatureCard = ({ title, description, icon: Icon, path }: FeatureCardProps) => {
  return (
    <Link to={path} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
              <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
