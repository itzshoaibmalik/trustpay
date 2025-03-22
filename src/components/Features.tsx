
import { CheckCircle, Calendar, Lock, MessageSquare, Upload, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Milestone-Based Payments",
      description: "Break projects into manageable milestones with secure escrow payments released only upon verified completion."
    },
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Work Verification",
      description: "Submit deliverables directly through our platform for transparent review and feedback from clients."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Dispute Resolution",
      description: "Resolve disagreements through our structured dispute system with fair and transparent mediation."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Timeline Tracking",
      description: "Keep projects on schedule with integrated timeline management and deadline notifications."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure Transactions",
      description: "Rest easy with bank-level encryption and security protocols protecting your payment information."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Time Tracking",
      description: "Accurately track and bill for hourly work with our integrated time tracking system."
    }
  ];

  return (
    <div className="py-20 px-6 md:px-12 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How TrustPay Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines freelance payments through a secure, transparent system built on trust and verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
