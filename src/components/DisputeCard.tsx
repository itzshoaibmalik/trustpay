
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Clock, AlertTriangle, FileCheck } from 'lucide-react';

interface DisputeCardProps {
  id: string;
  projectId: string;
  projectTitle: string;
  client: string;
  milestone: string;
  amount: number;
  status: 'open' | 'in_mediation' | 'resolved';
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
}

const DisputeCard = ({
  id,
  projectId,
  projectTitle,
  client,
  milestone,
  amount,
  status,
  createdAt,
  updatedAt,
  lastMessage
}: DisputeCardProps) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get status details
  const getStatusDetails = () => {
    switch(status) {
      case 'open':
        return {
          label: 'Open',
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          variant: 'default' as const
        };
      case 'in_mediation':
        return {
          label: 'In Mediation',
          icon: <Clock className="h-4 w-4 text-primary" />,
          variant: 'secondary' as const
        };
      case 'resolved':
        return {
          label: 'Resolved',
          icon: <FileCheck className="h-4 w-4 text-success" />,
          variant: 'outline' as const
        };
    }
  };
  
  const statusDetails = getStatusDetails();
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-in ${
      status === 'open' ? 'border-warning/50 bg-warning/5' :
      status === 'in_mediation' ? 'border-primary/50 bg-primary/5' :
      'border-success/50 bg-success/5'
    }`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{projectTitle}</h3>
            <p className="text-sm text-muted-foreground">Client: {client}</p>
          </div>
          <Badge variant={statusDetails.variant}>
            <div className="flex items-center">
              {statusDetails.icon}
              <span className="ml-1">{statusDetails.label}</span>
            </div>
          </Badge>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium">Disputed Milestone: {milestone}</p>
          <p className="text-sm text-muted-foreground">Amount: ${amount.toLocaleString()}</p>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          <span>Opened: {formatDate(createdAt)}</span>
          <span>Last Activity: {formatDate(updatedAt)}</span>
        </div>
        
        {lastMessage && (
          <div className="mb-5 p-3 bg-secondary/50 rounded-lg text-sm">
            <p className="text-xs font-medium mb-1">Latest Message:</p>
            <p className="text-sm line-clamp-2">{lastMessage}</p>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <Link to={`/projects/${projectId}`}>
            <Button variant="outline" size="sm">
              Project Details
            </Button>
          </Link>
          <Link to={`/disputes/${id}`}>
            <Button size="sm">
              <MessageSquare className="mr-2 h-3 w-3" /> Resolve Dispute
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisputeCard;
