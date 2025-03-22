
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquare, Send, Clock, AlertTriangle, FileCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  sender: 'freelancer' | 'client' | 'system';
  content: string;
  timestamp: string;
  attachment?: string;
}

interface Dispute {
  id: string;
  project_id: string;
  project_title: string;
  reason: string;
  status: 'open' | 'in_mediation' | 'resolved';
  created_at: string;
  updated_at: string;
  resolution?: string;
  client: {
    name: string;
    email: string;
  };
  milestone: {
    id: string;
    title: string;
    amount: number;
    submission?: string;
  };
  messages: Message[];
}

const Disputes = () => {
  const { id } = useParams();
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate API call to fetch dispute details
    setTimeout(() => {
      // Mock data
      const mockDispute: Dispute = {
        id: 'd1',
        project_id: '4',
        project_title: 'Marketing Campaign',
        reason: 'Deliverables do not meet the agreed specifications.',
        status: 'in_mediation',
        created_at: '2023-10-26T09:30:00Z',
        updated_at: '2023-10-30T14:15:00Z',
        client: {
          name: 'Fashion Forward',
          email: 'contact@fashionforward.com'
        },
        milestone: {
          id: 'm1',
          title: 'Social Media Graphics',
          amount: 800,
          submission: 'marketing_assets.zip'
        },
        messages: [
          {
            id: 'msg1',
            sender: 'system',
            content: 'Dispute opened by Fashion Forward.',
            timestamp: '2023-10-26T09:30:00Z'
          },
          {
            id: 'msg2',
            sender: 'client',
            content: 'The graphics delivered don\'t match our brand guidelines. The colors are incorrect and the layouts don\'t follow the specifications we provided.',
            timestamp: '2023-10-26T09:32:00Z'
          },
          {
            id: 'msg3',
            sender: 'freelancer',
            content: 'I followed the brand guidelines document that was provided at the start of the project. Could you please specify exactly which colors are incorrect?',
            timestamp: '2023-10-26T10:15:00Z'
          },
          {
            id: 'msg4',
            sender: 'client',
            content: 'The blues used in the Instagram posts are too bright. Our brand uses a more muted navy (hex #1A365D). Also, the font weight is too light in several places.',
            timestamp: '2023-10-26T11:05:00Z',
            attachment: 'brand_guidelines.pdf'
          },
          {
            id: 'msg5',
            sender: 'system',
            content: 'A mediator has been assigned to this dispute. Any resolution will be binding for both parties.',
            timestamp: '2023-10-28T14:15:00Z'
          },
          {
            id: 'msg6',
            sender: 'system',
            content: 'Mediator: After reviewing the materials, I suggest the freelancer makes the color corrections as specified by the client. The deliverables otherwise meet the project requirements.',
            timestamp: '2023-10-30T14:15:00Z'
          }
        ]
      };
      
      setDispute(mockDispute);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 px-6 md:px-12 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-muted rounded mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!dispute) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Dispute Not Found</h2>
            <p className="text-muted-foreground mb-6">The dispute you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message to an API
    const newMessage: Message = {
      id: `msg${dispute.messages.length + 1}`,
      sender: 'freelancer',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setDispute({
      ...dispute,
      messages: [...dispute.messages, newMessage],
      updated_at: new Date().toISOString()
    });
    
    setMessage('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6 md:px-12 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          {/* Dispute Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 animate-fade-in">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary mr-2">
                  Dashboard
                </Link>
                <span className="text-muted-foreground mx-2">/</span>
                <Link to={`/projects/${dispute.project_id}`} className="text-sm text-muted-foreground hover:text-primary mr-2">
                  Project
                </Link>
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-sm font-medium">Dispute</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">Dispute Resolution</h1>
              <div className="flex items-center">
                <p className="text-muted-foreground">Project: {dispute.project_title}</p>
                <Badge className="ml-3" variant={
                  dispute.status === 'open' ? 'default' :
                  dispute.status === 'in_mediation' ? 'secondary' : 'outline'
                }>
                  {dispute.status === 'open' ? 'Open' : 
                   dispute.status === 'in_mediation' ? 'In Mediation' : 'Resolved'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dispute Details */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="space-y-6">
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle>Dispute Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Status</h3>
                      <div className="flex items-center">
                        {dispute.status === 'open' && <AlertTriangle className="h-4 w-4 text-warning mr-2" />}
                        {dispute.status === 'in_mediation' && <Clock className="h-4 w-4 text-primary mr-2" />}
                        {dispute.status === 'resolved' && <FileCheck className="h-4 w-4 text-success mr-2" />}
                        <span className="text-sm">{
                          dispute.status === 'open' ? 'Open - Awaiting Response' : 
                          dispute.status === 'in_mediation' ? 'In Mediation' : 'Resolved'
                        }</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Opened On</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(dispute.created_at)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-1">Last Updated</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(dispute.updated_at)}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Client</h3>
                      <p className="text-sm text-muted-foreground">{dispute.client.name}</p>
                      <p className="text-sm text-muted-foreground">{dispute.client.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Milestone in Dispute</h3>
                      <p className="text-sm font-medium">{dispute.milestone.title}</p>
                      <p className="text-sm text-muted-foreground">Amount: ${dispute.milestone.amount}</p>
                      {dispute.milestone.submission && (
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">Submission:</span>
                          <span className="bg-secondary/50 px-2 py-1 rounded">{dispute.milestone.submission}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Dispute Reason</h3>
                      <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                    </div>
                    
                    {dispute.resolution && (
                      <div>
                        <h3 className="text-sm font-medium mb-1">Resolution</h3>
                        <p className="text-sm text-muted-foreground">{dispute.resolution}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
                  <CardHeader>
                    <CardTitle>Resolution Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" /> Accept Suggested Resolution
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Clock className="mr-2 h-4 w-4" /> Request Extension
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" /> Request Mediation Call
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Dispute Messages */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="animate-fade-in h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Discussion</CardTitle>
                  <CardDescription>
                    All messages related to this dispute are visible to both parties and mediators
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden flex flex-col">
                  <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4" style={{ maxHeight: '500px' }}>
                    {dispute.messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-lg p-4 max-w-[80%] ${
                            msg.sender === 'freelancer' 
                              ? 'bg-primary text-primary-foreground' 
                              : msg.sender === 'client'
                                ? 'bg-secondary'
                                : 'bg-muted text-muted-foreground text-sm'
                          } ${msg.sender === 'system' ? 'w-full text-center italic' : ''}`}
                        >
                          {msg.sender !== 'system' && (
                            <p className="text-xs opacity-70 mb-1">
                              {msg.sender === 'freelancer' ? 'You' : 'Client'} • {formatDate(msg.timestamp)}
                            </p>
                          )}
                          <p className={`${msg.sender === 'system' ? 'text-sm' : ''}`}>{msg.content}</p>
                          {msg.attachment && (
                            <div className={`mt-2 flex items-center text-xs ${
                              msg.sender === 'freelancer' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              <span className="mr-2">Attachment:</span>
                              <span className={`${
                                msg.sender === 'freelancer' 
                                  ? 'bg-white/10' 
                                  : 'bg-secondary/80'
                              } px-2 py-1 rounded`}>{msg.attachment}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-end gap-2">
                      <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow resize-none"
                        rows={3}
                      />
                      <Button onClick={handleSendMessage} size="icon" className="h-10 w-10">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      All communications are logged and may be used in the dispute resolution process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disputes;
