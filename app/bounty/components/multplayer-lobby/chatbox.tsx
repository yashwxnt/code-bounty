'use client';
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatProps {
  roomName: string;
}

const Chat: React.FC<ChatProps> = ({ roomName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
  const [socketId, setSocketId] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4500", {
      withCredentials: true,
    });

    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      console.log("connected", newSocket.id);
      setSocketId(String(newSocket?.id));
    });

    newSocket.on("welcome", (welcome) => {
      console.log(welcome);
    });

    newSocket.on("receive_message", (message) => {
      console.log("data message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    if (roomName) {
      newSocket.emit("join_room", roomName);
      setJoinedRoom(roomName);
    }

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (message.trim() !== "" && socketRef.current && joinedRoom) {
      const newMessage = { sender: 'User 1', text: message };
      socketRef.current.emit("send_message", { message: newMessage, room: joinedRoom });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  return (

      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Lobby Chatbox</CardTitle>
          {joinedRoom && (
            <div className="text-sm text-gray-900">Room: {joinedRoom}</div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />

          <ScrollArea className="h-64 overflow-y-auto p-4 rounded-lg bg-gray-800">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={`User ${index + 1}`} />
                    <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{msg.sender}</span>
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">No messages yet</div>
            )}
          </ScrollArea>

        </CardContent>
        <CardFooter className="flex items-center space-x-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Type a message"
            className="flex-grow"
          />
          <Button onClick={sendMessage}>Send</Button>
        </CardFooter>
      </Card>

  );
};

export default Chat;
