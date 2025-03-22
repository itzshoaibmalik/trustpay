
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/50 via-background to-background -z-10"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto pt-24 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero content */}
          <div className="flex-1 max-w-2xl animate-fade-in">
            <div className="inline-block mb-4">
              <div className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                Secure Payments For Freelancers
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Trust Reimagined for Freelance Payments
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
              TrustPay bridges the trust gap between freelancers and clients with milestone-based escrow payments, transparent work verification, and seamless dispute resolution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto text-md h-12 px-8 rounded-lg shadow-md">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" className="w-full sm:w-auto text-md h-12 px-8 rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero image/mockup */}
          <div className="flex-1 max-w-lg lg:max-w-xl animate-scale-in delay-150">
            <div className="glass-container p-0 overflow-hidden">
              <div className="px-4 py-3 bg-secondary border-b border-border flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                <div className="w-3 h-3 rounded-full bg-warning/60"></div>
                <div className="w-3 h-3 rounded-full bg-success/60"></div>
              </div>
              
              {/* Dashboard mockup */}
              <div className="p-6 bg-background">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Project Milestones</h3>
                  <p className="text-sm text-muted-foreground">Track progress and payments</p>
                </div>
                
                {/* Milestones UI representation */}
                <div className="space-y-4">
                  {[
                    { name: 'Research & Planning', status: 'Completed', percent: 100 },
                    { name: 'Design Prototype', status: 'In Progress', percent: 60 },
                    { name: 'Development Phase', status: 'Upcoming', percent: 0 },
                    { name: 'Testing & Revisions', status: 'Upcoming', percent: 0 }
                  ].map((milestone, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{milestone.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          milestone.status === 'Completed' ? 'bg-success/20 text-success-foreground' :
                          milestone.status === 'In Progress' ? 'bg-primary/20 text-primary' :
                          'bg-secondary text-secondary-foreground'
                        }`}>
                          {milestone.status}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${milestone.percent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{milestone.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
