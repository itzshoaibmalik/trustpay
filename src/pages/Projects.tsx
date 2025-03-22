
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Upload, ArrowRight, MessageSquare, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  due_date: string;
  submission?: string;
  feedback?: string;
}

interface Project {
  id: string;
  title: string;
  client: {
    name: string;
    email: string;
  };
  description: string;
  status: 'active' | 'completed' | 'disputed';
  total_value: number;
  start_date: string;
  end_date: string;
  milestones: Milestone[];
}

const Projects = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch project details
    setTimeout(() => {
      // Mock data
      const mockProject: Project = {
        id: '1',
        title: 'Website Redesign',
        client: {
          name: 'Acme Corp',
          email: 'contact@acmecorp.com'
        },
        description: 'Complete redesign of corporate website with focus on improved user experience, modern design, and mobile responsiveness.',
        status: 'active',
        total_value: 4500,
        start_date: '2023-09-15',
        end_date: '2023-12-15',
        milestones: [
          {
            id: 'm1',
            title: 'Research & Strategy',
            description: 'Conduct user research, competitive analysis, and develop site architecture.',
            amount: 900,
            status: 'approved',
            due_date: '2023-09-30',
            submission: 'research_document.pdf',
            feedback: 'Excellent work! The research is thorough and provides great insights.'
          },
          {
            id: 'm2',
            title: 'Wireframes & Prototypes',
            description: 'Create wireframes and interactive prototypes for key pages.',
            amount: 1100,
            status: 'approved',
            due_date: '2023-10-20',
            submission: 'wireframes_v2.fig',
            feedback: 'Approved with minor revisions. Please implement feedback in the next phase.'
          },
          {
            id: 'm3',
            title: 'Visual Design',
            description: 'Develop visual design mockups based on approved wireframes.',
            amount: 1200,
            status: 'submitted',
            due_date: '2023-11-10',
            submission: 'design_mockups_v1.fig'
          },
          {
            id: 'm4',
            title: 'Development',
            description: 'Front-end development and CMS integration.',
            amount: 1300,
            status: 'pending',
            due_date: '2023-12-05'
          }
        ]
      };
      
      setProject(mockProject);
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

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate project stats
  const completedMilestones = project.milestones.filter(m => m.status === 'approved').length;
  const pendingAmount = project.milestones
    .filter(m => m.status !== 'approved')
    .reduce((sum, milestone) => sum + milestone.amount, 0);
  const paidAmount = project.milestones
    .filter(m => m.status === 'approved')
    .reduce((sum, milestone) => sum + milestone.amount, 0);
  const progressPercentage = (completedMilestones / project.milestones.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6 md:px-12 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 animate-fade-in">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary mr-2">
                  Dashboard
                </Link>
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-sm font-medium">Project Details</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">{project.title}</h1>
              <div className="flex items-center">
                <p className="text-muted-foreground">Client: {project.client.name}</p>
                <Badge className="ml-3" variant={
                  project.status === 'active' ? 'default' :
                  project.status === 'completed' ? 'outline' : 'destructive'
                }>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" /> Message Client
              </Button>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" /> Submit Work
              </Button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Project Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
                  <div className="text-2xl font-bold">${project.total_value.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Paid Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-success mr-1" />
                  <div className="text-2xl font-bold">${paidAmount.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
                  <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{Math.round(progressPercentage)}%</div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Details and Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Description</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Start Date</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">End Date</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Client</h3>
                    <p className="text-sm text-muted-foreground">{project.client.name}</p>
                    <p className="text-sm text-muted-foreground">{project.client.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Timeline</h3>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                            milestone.status === 'approved' ? 'bg-success' : 
                            milestone.status === 'submitted' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {milestone.status === 'approved' && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className={`ml-2 h-8 w-0.5 ${
                            index === project.milestones.length - 1 ? 'hidden' : 
                            milestone.status === 'approved' ? 'bg-success' : 'bg-secondary'
                          }`}></div>
                          {index === project.milestones.length - 1 ? null : (
                            <div className="absolute ml-2 mt-10 h-8 w-0.5 bg-secondary"></div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium">{milestone.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Due: {new Date(milestone.due_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>Track milestone progress and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Milestones</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className={`border rounded-lg p-4 ${
                          milestone.status === 'submitted' ? 'border-primary/50 bg-primary/5' :
                          milestone.status === 'approved' ? 'border-success/50 bg-success/5' :
                          milestone.status === 'rejected' ? 'border-destructive/50 bg-destructive/5' :
                          'border-border'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{milestone.title}</h3>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${milestone.amount.toLocaleString()}</div>
                              <Badge variant={
                                milestone.status === 'approved' ? 'outline' :
                                milestone.status === 'submitted' ? 'default' :
                                milestone.status === 'rejected' ? 'destructive' : 'secondary'
                              }>
                                {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          {(milestone.status === 'approved' || milestone.status === 'submitted') && (
                            <div className="mt-3 flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">Submission:</span>
                              <span className="bg-secondary/50 px-2 py-1 rounded">{milestone.submission}</span>
                            </div>
                          )}
                          
                          {milestone.status === 'approved' && milestone.feedback && (
                            <div className="mt-2 p-2 bg-success/10 rounded-md text-sm">
                              <p className="font-medium text-xs">Feedback:</p>
                              <p className="text-xs">{milestone.feedback}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            {milestone.status === 'pending' && (
                              <Button size="sm">
                                <Upload className="mr-2 h-3 w-3" /> Submit Work
                              </Button>
                            )}
                            {milestone.status === 'submitted' && (
                              <Button variant="outline" size="sm" disabled>
                                Awaiting Approval
                              </Button>
                            )}
                            {milestone.status === 'approved' && (
                              <Button variant="ghost" size="sm" className="text-success">
                                <Check className="mr-2 h-3 w-3" /> Approved
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="pending" className="space-y-4">
                      {project.milestones.filter(m => m.status !== 'approved').map((milestone) => (
                        <div key={milestone.id} className={`border rounded-lg p-4 ${
                          milestone.status === 'submitted' ? 'border-primary/50 bg-primary/5' :
                          milestone.status === 'rejected' ? 'border-destructive/50 bg-destructive/5' :
                          'border-border'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{milestone.title}</h3>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${milestone.amount.toLocaleString()}</div>
                              <Badge variant={
                                milestone.status === 'submitted' ? 'default' :
                                milestone.status === 'rejected' ? 'destructive' : 'secondary'
                              }>
                                {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          {milestone.status === 'submitted' && (
                            <div className="mt-3 flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">Submission:</span>
                              <span className="bg-secondary/50 px-2 py-1 rounded">{milestone.submission}</span>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            {milestone.status === 'pending' && (
                              <Button size="sm">
                                <Upload className="mr-2 h-3 w-3" /> Submit Work
                              </Button>
                            )}
                            {milestone.status === 'submitted' && (
                              <Button variant="outline" size="sm" disabled>
                                Awaiting Approval
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {project.milestones.filter(m => m.status !== 'approved').length === 0 && (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">All milestones are completed!</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed" className="space-y-4">
                      {project.milestones.filter(m => m.status === 'approved').map((milestone) => (
                        <div key={milestone.id} className="border border-success/50 bg-success/5 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{milestone.title}</h3>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${milestone.amount.toLocaleString()}</div>
                              <Badge variant="outline">Approved</Badge>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Submission:</span>
                            <span className="bg-secondary/50 px-2 py-1 rounded">{milestone.submission}</span>
                          </div>
                          
                          {milestone.feedback && (
                            <div className="mt-2 p-2 bg-success/10 rounded-md text-sm">
                              <p className="font-medium text-xs">Feedback:</p>
                              <p className="text-xs">{milestone.feedback}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="ghost" size="sm" className="text-success">
                              <Check className="mr-2 h-3 w-3" /> Approved
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {project.milestones.filter(m => m.status === 'approved').length === 0 && (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">No completed milestones yet</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
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

export default Projects;
