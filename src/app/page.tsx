import Editor from "@/components/vsCode/Editor";
import StatusBar from "@/components/vsCode/StatusBar";
import Sidebar from "@/components/vsCode/Sidebar";
import FileExplorer from "@/components/vsCode/FileExplorer";
import MacHeader from "@/components/vsCode/MacHeader";

export default function Home() {
  return (
    <div className="w-full h-screen container bg-card flex-col items-center justify-center">
      <div className="text-center my-6">
        <h2 className="text-3xl font-800">Hello, I'm Aliyan</h2>
        <h2>I am Web Developer</h2>
      </div>
      <div className="flex flex-col ">
      <MacHeader />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1">
          <FileExplorer />
          <Editor />
        </div>
      </div>
      <StatusBar />
    </div>
    </div>
  );
}
