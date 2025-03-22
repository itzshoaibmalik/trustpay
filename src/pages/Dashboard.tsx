
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, DollarSign, Check, X, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Project {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'completed' | 'disputed';
  value: number;
  deadline: string;
  completedMilestones: number;
  totalMilestones: number;
}

const Dashboard = () => {
  // Sample data - would come from API in real implementation
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Website Redesign',
      client: 'Acme Corp',
      status: 'active',
      value: 4500,
      deadline: '2023-12-15',
      completedMilestones: 2,
      totalMilestones: 5
    },
    {
      id: '2',
      title: 'Mobile App Development',
      client: 'TechStart Inc',
      status: 'active',
      value: 8000,
      deadline: '2024-01-30',
      completedMilestones: 1,
      totalMilestones: 6
    },
    {
      id: '3',
      title: 'Brand Identity Design',
      client: 'Green Ventures',
      status: 'completed',
      value: 3000,
      deadline: '2023-11-10',
      completedMilestones: 3,
      totalMilestones: 3
    },
    {
      id: '4',
      title: 'Marketing Campaign',
      client: 'Fashion Forward',
      status: 'disputed',
      value: 2500,
      deadline: '2023-10-25',
      completedMilestones: 1,
      totalMilestones: 3
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New milestone approved for Website Redesign', read: false, time: '2 hours ago' },
    { id: 2, message: 'Client commented on your submission', read: false, time: '1 day ago' },
    { id: 3, message: 'Payment of $1,200 released to your account', read: true, time: '3 days ago' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects by status
  const activeProjects = projects.filter(project => project.status === 'active');
  const completedProjects = projects.filter(project => project.status === 'completed');
  const disputedProjects = projects.filter(project => project.status === 'disputed');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6 md:px-12 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Manage your projects and payments</p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">$12,400</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects.length}</div>
                <p className="text-xs text-muted-foreground mt-1">With {activeProjects.reduce((total, project) => total + project.totalMilestones - project.completedMilestones, 0)} pending milestones</p>
              </CardContent>
            </Card>
            
            <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">$5,750</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across {activeProjects.length} active projects</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Section */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Manage your ongoing and completed projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="active">
                    <TabsList className="mb-4">
                      <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
                      <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
                      <TabsTrigger value="disputed">Disputed ({disputedProjects.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="active" className="space-y-4">
                      {activeProjects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4 hover:border-primary/50 transition-all duration-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${project.value.toLocaleString()}</div>
                              <p className="text-xs text-muted-foreground">Due: {new Date(project.deadline).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Milestone Progress</span>
                              <span>{project.completedMilestones}/{project.totalMilestones}</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(project.completedMilestones / project.totalMilestones) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link to={`/projects/${project.id}`}>
                              <Button variant="ghost" size="sm">
                                View Details <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                      {activeProjects.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">You don't have any active projects</p>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" /> Start a New Project
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed" className="space-y-4">
                      {completedProjects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4 hover:border-primary/50 transition-all duration-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${project.value.toLocaleString()}</div>
                              <p className="text-xs text-muted-foreground">Completed: {new Date(project.deadline).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Milestone Progress</span>
                              <span>{project.completedMilestones}/{project.totalMilestones}</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-success h-2 rounded-full"
                                style={{ width: '100%' }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link to={`/projects/${project.id}`}>
                              <Button variant="ghost" size="sm">
                                View Details <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                      {completedProjects.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No completed projects yet</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="disputed" className="space-y-4">
                      {disputedProjects.map((project) => (
                        <div key={project.id} className="border border-destructive/30 rounded-lg p-4 bg-destructive/5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${project.value.toLocaleString()}</div>
                              <p className="text-xs text-muted-foreground">Disputed on: {new Date(project.deadline).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 px-3 py-2 bg-destructive/10 rounded text-sm">
                            <p className="text-destructive-foreground">
                              <MessageSquare className="inline h-4 w-4 mr-1 -mt-0.5" />
                              This project has an active dispute that needs resolution
                            </p>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link to={`/disputes/${project.id}`}>
                              <Button variant="outline" size="sm" className="mr-2 text-destructive border-destructive/30 hover:bg-destructive/10">
                                Resolve Dispute
                              </Button>
                            </Link>
                            <Link to={`/projects/${project.id}`}>
                              <Button variant="ghost" size="sm">
                                View Details <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                      {disputedProjects.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No disputed projects</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Notifications & Activity */}
            <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Recent activity and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border rounded-lg ${!notification.read ? 'bg-info/30 border-info' : 'border-border'}`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2 text-sm">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <div>
                          <p>Milestone 2 completed for Website Redesign</p>
                          <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-sm">
                        <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p>Payment of $1,500 received from Acme Corp</p>
                          <p className="text-xs text-muted-foreground">Yesterday at 2:45 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-sm">
                        <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p>Revision requested for Marketing Campaign</p>
                          <p className="text-xs text-muted-foreground">Oct 23, 2023</p>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
