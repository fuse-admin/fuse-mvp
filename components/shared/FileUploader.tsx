import { UploadButton } from "@/lib/utils/uploadthing";
 
type FileUploaderProps = {
  onFileUploadComplete: (url: string, name:string) => void;
};

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUploadComplete }) => (
  <UploadButton 
    endpoint="fileuploader"
    onClientUploadComplete={(res) => {
      //alert("Upload Completed");
      const fileUrl = res[0].url;
      const fileName = res[0].name;
      onFileUploadComplete(fileUrl, fileName);
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      console.log(`Uploading: ${name}`);
    }}
  />
);