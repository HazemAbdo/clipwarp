import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

interface Clip {
  clips_text: string;
  id: number;
  user_id: number;
}

export default function Collection() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [port, setPort] = useState<number>();
  const [app, setApp] = useState<string>();

  useEffect(() => {
    const savedPort = localStorage.getItem("port");
    const savedName = localStorage.getItem("name");
    if (savedPort) {
      setPort(Number(savedPort));
    }
    if (savedName) {
      setApp(String(savedName));
    }
  }, []);

  async function getClips() {
    if (port) {
      const response = await fetch(`http://192.168.1.13:${port + 1}/`);
      const data = await response.json();
      setClips(data);
    }
  }

  useEffect(() => {
    getClips();
  }, [port]);

  useEffect(() => {
    if (port) {
      const socket = io(`ws://192.168.1.13:${port + 1}`);

      socket.onAny((event) => {
        getClips();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [getClips, port]);

  useEffect(() => {
    if (port) {
      const websocket = new WebSocket(`ws://192.168.1.13:${port}/${app}0`);
      websocket.onmessage = () => {
        getClips();
      };
    }
  }, [port]);

  async function deleteClip(clipId: number) {
    try {
      if (port) {
        const response = await fetch(
          `http://192.168.1.13:${port + 1}/delete/${clipId}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to delete clip");
        }
        getClips();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  }

  const categorizeClips = () => {
    const categorized: { [key: string]: { id: number; content: string }[] } = {
      Text: [],
    };
    clips.forEach((clip) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const match = clip.clips_text.match(urlRegex);
      if (match) {
        const url = new URL(match[0]);
        let domain = url.hostname.replace(/^www\./, "");
        domain = domain.replace(/\.com$/, "");
        if (!categorized[domain]) {
          categorized[domain] = [];
        }
        categorized[domain].push({ id: clip.id, content: match[0] });
      } else {
        categorized.Text.push({ id: clip.id, content: clip.clips_text });
      }
    });

    return categorized;
  };

  const renderTabsTriggers = () => {
    const categorizedClips = categorizeClips();
    return (
      <>
        {Object.keys(categorizedClips).map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </>
    );
  };

  const renderTabsContent = () => {
    const categorizedClips = categorizeClips();
    return (
      <ScrollArea className="w-full rounded-md border p-4 mt-2 h-[calc(100vh-156px)]">
        {Object.entries(categorizedClips).map(([category, clips]) => (
          <TabsContent key={category} value={category} className="w-full">
            {clips.reverse().map((clip, index) => (
              <div key={index}>
                {category === "Text" ? (
                  <div className="flex gap-1 justify-between">
                    <span className="break-all">{clip.content}</span>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => copyToClipboard(clip.content)}
                      >
                        Copy
                      </Button>
                      <Button
                        onClick={() => deleteClip(clip.id)}
                        variant="ghost"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <a
                      href={clip.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all"
                    >
                      {clip.content}
                    </a>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => copyToClipboard(clip.content)}
                      >
                        Copy
                      </Button>
                      <Button
                        onClick={() => deleteClip(clip.id)}
                        variant="ghost"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
                <Separator className="my-2" />
              </div>
            ))}
          </TabsContent>
        ))}
      </ScrollArea>
    );
  };

  const handlePortChange = (event: any) => {
    const newValue = event.target.value;
    setPort(Number(newValue));
    localStorage.setItem("port", newValue);
  };

  const handleNameChange = (event: any) => {
    const newValue = event.target.value;
    const value = newValue.replace(/ /g, "-");
    setApp(value);
    localStorage.setItem("name", value);
  };

  return (
    <Tabs defaultValue="Text" className="text-white flex flex-col items-start">
      <div className="w-full flex gap-3 sm:gap-2 items-center">
        <TabsList className="max-w-[800px] flex-wrap flex flex-col overflow-x-auto overflow-y-clip w-full">
          {renderTabsTriggers()}
        </TabsList>
        <div>
          <Popover>
            <PopoverTrigger>
              <Button>Setting</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-stone-800 flex flex-col gap-4 mt-2 mr-2 sm:mr-0">
              <div className="flex gap-2 items-center">
                <h1 className="text-white w-36">App Name</h1>
                <Input
                  value={app?.replace(/-/g, " ")}
                  placeholder={"Webapp"}
                  className="text-white"
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="text-white w-36">Port</h1>
                <Input
                  value={port}
                  placeholder="42069"
                  className="text-white"
                  onChange={handlePortChange}
                />
              </div>
              <Button
                onClick={() => window.location.reload()}
                variant={"secondary"}
              >
                Refresh Page
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {renderTabsContent()}
    </Tabs>
  );
}
