
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, File, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface WorkSubmissionProps {
  milestoneId: string;
  milestoneTitle: string;
  onSubmit?: (data: { files: File[], notes: string }) => void;
  onCancel?: () => void;
}

const WorkSubmission = ({
  milestoneId,
  milestoneTitle,
  onSubmit,
  onCancel
}: WorkSubmissionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file for your submission.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit({ files, notes });
      }
      
      toast({
        title: "Work submitted successfully",
        description: "Your work has been submitted for review.",
        variant: "default",
      });
      
      setIsSubmitting(false);
      setFiles([]);
      setNotes('');
      
      if (onCancel) {
        onCancel();
      }
    }, 1500);
  };
  
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>Submit Work</CardTitle>
        <CardDescription>
          Upload your work for milestone: {milestoneTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Files</label>
            <div className="border-2 border-dashed border-input rounded-lg p-8 text-center">
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">
                  Support for images, documents, and compressed files
                </p>
              </label>
            </div>
          </div>
          
          {/* File Preview */}
          {files.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Files</label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between border rounded-lg p-3 bg-muted/30"
                  >
                    <div className="flex items-center">
                      <File className="h-4 w-4 text-primary mr-2" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              placeholder="Add any additional notes or context about your submission..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Work'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkSubmission;
