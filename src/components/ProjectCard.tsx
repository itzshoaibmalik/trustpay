
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  client: string;
  description: string;
  amount: number;
  deadline: string;
  status: 'active' | 'completed' | 'disputed';
  progress: number;
}

const ProjectCard = ({
  id,
  title,
  client,
  description,
  amount,
  deadline,
  status,
  progress
}: ProjectCardProps) => {
  // Calculate days remaining until deadline
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-in">
      <div className={`h-2 w-full ${
        status === 'active' ? 'bg-primary' :
        status === 'completed' ? 'bg-success' : 'bg-destructive'
      }`}></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">Client: {client}</p>
          </div>
          <Badge variant={
            status === 'active' ? 'default' :
            status === 'completed' ? 'outline' : 'destructive'
          }>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Budget</p>
            <p className="font-medium">${amount.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">
              {status === 'completed' ? 'Completed' : status === 'disputed' ? 'Disputed' : 'Deadline'}
            </p>
            <div className="flex items-center">
              {status === 'active' && daysRemaining > 0 && (
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              )}
              <p className={`text-sm ${
                status === 'active' && daysRemaining <= 3 ? 'text-destructive font-medium' : ''
              }`}>
                {status === 'completed' 
                  ? new Date(deadline).toLocaleDateString() 
                  : status === 'disputed'
                    ? 'Under review'
                    : daysRemaining > 0
                      ? `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left`
                      : 'Overdue'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                status === 'active' ? 'bg-primary' :
                status === 'completed' ? 'bg-success' : 'bg-destructive'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <Link to={`/projects/${id}`}>
          <Button variant="outline" className="w-full">
            View Project <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
