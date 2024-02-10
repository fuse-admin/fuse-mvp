import { UploadButton } from "@/lib/utils/uploadthing";
 
type FileUploaderProps = {
  onFileUploadComplete: (url: string, name:string) => void;
};

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUploadComplete }) => (
  <UploadButton 
    endpoint="fileuploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("File: ", res);
      alert("Upload Completed");
      const fileUrl = res[0].url;
      const fileName = res[0].name;
      console.log("File URL: ", fileUrl);
      onFileUploadComplete(fileUrl, fileName);
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log(`Uploading: ${name}`);
    }}
  />
);