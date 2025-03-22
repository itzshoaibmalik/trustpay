
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Check, AlertTriangle, Clock } from 'lucide-react';

interface MilestoneCardProps {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  dueDate: string;
  submission?: string;
  feedback?: string;
  onSubmit?: () => void;
}

const MilestoneCard = ({
  id,
  title,
  description,
  amount,
  status,
  dueDate,
  submission,
  feedback,
  onSubmit
}: MilestoneCardProps) => {
  // Format due date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Calculate if milestone is overdue
  const isOverdue = () => {
    if (status === 'approved' || status === 'submitted') return false;
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };
  
  // Get status icon
  const getStatusIcon = () => {
    switch(status) {
      case 'approved':
        return <Check className="h-4 w-4 text-success" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return isOverdue() 
          ? <AlertTriangle className="h-4 w-4 text-warning" /> 
          : <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-sm animate-scale-in ${
      status === 'submitted' ? 'border-primary/50 bg-primary/5' :
      status === 'approved' ? 'border-success/50 bg-success/5' :
      status === 'rejected' ? 'border-destructive/50 bg-destructive/5' :
      isOverdue() ? 'border-warning/50 bg-warning/5' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium mb-1">${amount.toLocaleString()}</div>
            <Badge variant={
              status === 'approved' ? 'outline' :
              status === 'submitted' ? 'default' :
              status === 'rejected' ? 'destructive' :
              isOverdue() ? 'secondary' : 'secondary'
            }>
              <div className="flex items-center">
                {getStatusIcon()}
                <span className="ml-1">
                  {status === 'pending' && isOverdue() ? 'Overdue' : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </Badge>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          <span>Due Date: {formatDate(dueDate)}</span>
          {status === 'approved' && <span>Completed</span>}
        </div>
        
        {(status === 'approved' || status === 'submitted') && submission && (
          <div className="mt-3 mb-4 flex items-center text-xs text-muted-foreground">
            <span className="mr-2">Submission:</span>
            <span className="bg-secondary/50 px-2 py-1 rounded">{submission}</span>
          </div>
        )}
        
        {status === 'approved' && feedback && (
          <div className="mt-2 mb-4 p-2 bg-success/10 rounded-md text-sm">
            <p className="font-medium text-xs">Feedback:</p>
            <p className="text-xs">{feedback}</p>
          </div>
        )}
        
        {status === 'rejected' && feedback && (
          <div className="mt-2 mb-4 p-2 bg-destructive/10 rounded-md text-sm">
            <p className="font-medium text-xs">Feedback:</p>
            <p className="text-xs">{feedback}</p>
          </div>
        )}
        
        <div className="flex justify-end">
          {status === 'pending' && (
            <Button size="sm" onClick={onSubmit}>
              <Upload className="mr-2 h-3 w-3" /> Submit Work
            </Button>
          )}
          {status === 'submitted' && (
            <Button variant="outline" size="sm" disabled>
              Awaiting Approval
            </Button>
          )}
          {status === 'rejected' && (
            <Button size="sm">
              <Upload className="mr-2 h-3 w-3" /> Resubmit Work
            </Button>
          )}
          {status === 'approved' && (
            <Button variant="ghost" size="sm" className="text-success">
              <Check className="mr-2 h-3 w-3" /> Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
