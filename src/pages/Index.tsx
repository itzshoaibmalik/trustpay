
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined workflow makes freelance payments safe and transparent for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Project & Milestones",
                  description: "Client sets up the project, defines clear milestones, and deposits funds into escrow."
                },
                {
                  step: "02",
                  title: "Complete & Submit Work",
                  description: "Freelancer works on milestones and submits deliverables through the platform."
                },
                {
                  step: "03",
                  title: "Review & Payment Release",
                  description: "Client reviews work and approves payment, which is automatically released to the freelancer."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center animate-slide-in-right"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-accent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Ready to Transform Your Freelance Payments?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
              Join thousands of freelancers and clients who've already discovered a better way to work together.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <a 
                href="/signup" 
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started For Free
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
