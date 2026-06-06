import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconKey, IconPlus, IconTrash } from "@tabler/icons-react";

export default function SecretsPage() {
  const [secrets] = useState([
    { id: "1", key: "SLACK_API_TOKEN", description: "Slack bot token", createdAt: "2024-06-06" },
    { id: "2", key: "GOOGLE_CLIENT_SECRET", description: "OAuth client secret", createdAt: "2024-06-06" },
  ]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <IconKey size={32} />
          Secrets Manager
        </h1>
        <Button className="flex items-center gap-2">
          <IconPlus size={16} />
          Add Secret
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Secrets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {secrets.map((secret) => (
                <TableRow key={secret.id}>
                  <TableCell className="font-mono">{secret.key}</TableCell>
                  <TableCell>{secret.description}</TableCell>
                  <TableCell>{secret.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <IconTrash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
