import { useState } from "react";
import { Button } from "@agent-native/dispatch/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@agent-native/dispatch/components/ui/card";
import { Input } from "@agent-native/dispatch/components/ui/input";
import { ScrollArea } from "@agent-native/dispatch/components/ui/scroll-area";
import { IconBrain, IconSend, IconShieldCheck } from "@tabler/icons-react";

export default function BrainPage() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant', content: string, citations?: string[] }>>([]);

  const handleSend = () => {
    if (!query.trim()) return;

    // Optimistic update
    const newChat = [...chat, { role: 'user' as const, content: query }];
    setChat(newChat);
    setQuery("");

    // Mock Response
    setTimeout(() => {
      setChat([...newChat, {
        role: 'assistant',
        content: "Based on the recent engineering sync, we decided to move to Neon Postgres for all primary state.",
        citations: ["Engineering Sync - 2024-05-15", "Architecture Decision Record #42"]
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background p-6 gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconBrain className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Brain</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
          <IconShieldCheck className="h-3 w-3 text-emerald-500" />
          Review-Gate Active
        </div>
      </header>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/50 bg-card/50">
        <CardHeader className="border-b border-border/30 pb-4">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Institutional Memory</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {chat.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-sm">Ask about company decisions, meeting notes, or process history.</p>
                </div>
              )}
              {chat.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/80 text-foreground border border-border/50'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.citations && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.citations.map((c, j) => (
                        <span key={j} className="text-[10px] bg-accent/50 text-accent-foreground px-2 py-0.5 rounded border border-border/30">
                          [{j + 1}] {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/30 bg-muted/20">
            <div className="relative">
              <Input
                placeholder="Search institutional memory..."
                className="pr-12 bg-background/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={handleSend}
              >
                <IconSend className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
