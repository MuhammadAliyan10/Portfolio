import Editor from "@/components/vsCode/Editor";
import StatusBar from "@/components/vsCode/StatusBar";
import Sidebar from "@/components/vsCode/Sidebar";
import FileExplorer from "@/components/vsCode/FileExplorer";
import MacHeader from "@/components/vsCode/MacHeader";

export default function Home() {
    return (
        <div className="w-full h-screen container bg-card flex-col items-center justify-center">
            <div className="text-center my-6">
                <h1 className="text-4xl font-extrabold text-gray-80 mb-2">Hello, I'm Aliyan</h1>
                <h2 className="text-xl font-semibold text-gray-600">I am a Web Developer</h2>
            </div>
            <div className="flex flex-col h-[70vh] ">
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
